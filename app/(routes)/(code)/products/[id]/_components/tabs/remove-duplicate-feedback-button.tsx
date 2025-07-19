"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, CheckCircle, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";
import { useAllFeedback } from "@/contexts/all-feedback-context";

// Enhanced FeedbackItem component using custom Tailwind config
function FeedbackItem({ feedback, isOriginal = false }) {
  return (
    <div className={`p-4 border rounded-lg transition-all duration-300 ${
      isOriginal 
        ? 'border-primary bg-primary/5 shadow-sm hover:shadow-md' 
        : 'border-destructive/30 bg-destructive/5 hover:bg-destructive/10'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-sm text-foreground">{feedback.title}</h4>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
          {feedback.date}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        {feedback.content}
      </p>
      <div className="flex gap-2 flex-wrap">
        <span className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
          {feedback.category}
        </span>
        <span className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium">
          Score: {feedback.score}
        </span>
        {isOriginal ? (
          <span className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Will be kept
          </span>
        ) : (
          <span className="text-xs px-3 py-1 rounded-full bg-destructive text-destructive-foreground font-medium flex items-center gap-1">
            <Trash2 className="h-3 w-3" />
            Will be deleted
          </span>
        )}
      </div>
    </div>
  );
}

export default function RemoveDuplicateFeedbackButton({ productId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [similarityThreshold, setSimilarityThreshold] = useState(85);
  const [isLoading, setIsLoading] = useState(false);
  const [duplicateClusters, setDuplicateClusters] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletionComplete, setDeletionComplete] = useState(false);
  const [deletedCount, setDeletedCount] = useState(0);
  const [errorOne, setErrorOne] = useState(null);
  const {refetchFeedbacks} = useAllFeedback();

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (option === "identical") {
      handleFindIdenticalDuplicates();
    } else {
      setStep(2);
    }
  };

  const handleFindIdenticalDuplicates = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_LINK}/api/products/${productId}/feedbacks/duplicated`
      );
      const data = await response.json();
      
      if (data.clusters && data.clusters.length > 0) {
        setDuplicateClusters(data.clusters);
        setStep(3);
      } else {
        setErrorOne("No identical duplicate feedback found!");
        toast.error("No identical duplicate feedback found!");
        resetModal();
      }
    } catch (error) {
      console.error('Error fetching duplicate feedback:', error);
      setErrorOne("Error finding duplicates. Please try again.");
      toast.error("Error finding duplicates. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimilaritySubmit = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_LINK}/api/products/${productId}/feedbacks/duplicated?similarity=${similarityThreshold}`
      );
      const data = await response.json();
      
      if (data.clusters && data.clusters.length > 0) {
        setDuplicateClusters(data.clusters);
        setStep(3);
      } else {
        toast.error(`No similar feedback found with ${similarityThreshold}% similarity threshold.`);
        setStep(1);
      }
    } catch (error) {
      console.error('Error fetching similar feedback:', error);
      toast.error("Error finding similar feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDeletion = async () => {
    setIsDeleting(true);
    
    try {
      const clustersToDelete = duplicateClusters.map(cluster => 
        cluster.slice(1).map(item => item.id)
      ).filter(cluster => cluster.length > 0);
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_LINK}/api/products/${productId}/feedbacks/duplicated`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clusters: clustersToDelete })
        }
      );
      
      const result = await response.json();
      
      if (result.deleted) {
        setDeletedCount(result.deleted.length);
        setDeletionComplete(true);
        setStep(4);
        refetchFeedbacks();
      } else {
        throw new Error(result.error || 'Deletion failed');
      }
      
    } catch (error) {
      console.error('Error deleting duplicates:', error);
      toast.error("Error deleting duplicates. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const resetModal = () => {
    setStep(1);
    setSelectedOption("");
    setSimilarityThreshold(85);
    setDuplicateClusters([]);
    setIsLoading(false);
    setIsDeleting(false);
    setDeletionComplete(false);
    setDeletedCount(0);
    setErrorOne(null);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) {
      resetModal();
    }
  };

  const getTotalDuplicatesCount = () => {
    return duplicateClusters.reduce((total, cluster) => total + (cluster.length - 1), 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="hover:border-primary transition-colors">
          <Copy className="mr-2 h-4 w-4" />
          Remove Duplicate Feedback
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[750px] max-h-[85vh] overflow-y-auto bg-background border-border">
        {/* Step 1: Choose deletion method */}
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl text-foreground">
                How do you want to delete duplicated feedback?
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                Choose your preferred method for identifying and removing duplicate feedback
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-6">
              <Card 
                className="cursor-pointer hover:border-primary hover:shadow-md transition-all duration-300 group"
                onClick={() => handleOptionSelect("identical")}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    <Copy className="h-5 w-5" />
                    Delete Identical Feedback
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    Remove feedback entries that are exactly the same in content. 
                    This will only delete perfect matches with identical text, keeping one copy of each.
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* <Card 
                className="cursor-pointer hover:border-primary hover:shadow-md transition-all duration-300 group"
                onClick={() => handleOptionSelect("similar")}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Delete Similar Feedback
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    Remove feedback entries that have similar content based on semantic analysis. 
                    You can set a similarity threshold to control how similar items need to be.
                  </CardDescription>
                </CardHeader>
              </Card> */}
            </div>
            
            {isLoading && (
              <div className="flex items-center justify-center p-6 bg-muted/30 rounded-lg">
                <Loader2 className="h-5 w-5 animate-spin mr-3 text-primary" />
                <span className="text-muted-foreground">Finding duplicate feedback...</span>
              </div>
            )}
            
            {errorOne && !isLoading && (
              <div className="flex items-center justify-center p-4 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 mr-3 text-destructive" />
                <span className="text-destructive font-medium">{errorOne}</span>
              </div>
            )}
          </>
        )}

        {/* Step 2: Similarity threshold input */}
        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl text-foreground">
                Set Similarity Threshold
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                Choose how similar feedback needs to be to be considered duplicates
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-6">
              <div className="space-y-3">
                <Label htmlFor="threshold" className="text-foreground font-medium">
                  Similarity Threshold (Percentage)
                </Label>
                <Input
                  id="threshold"
                  type="number"
                  min="50"
                  max="100"
                  value={similarityThreshold}
                  onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
                  className="text-center text-lg font-semibold border-border focus:border-primary focus:ring-primary"
                />
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong>Higher values (90-100%):</strong> Only match very similar feedback<br/>
                    <strong>Lower values (50-80%):</strong> Match more loosely related feedback
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)} 
                  className="flex-1 border-border hover:border-primary"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleSimilaritySubmit} 
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Find Similar Feedback
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Step 3: Review duplicates before deletion */}
        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl text-foreground">
                Review Duplicate Feedback
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                Found <span className="font-semibold text-primary">{duplicateClusters.length}</span> groups of duplicates. 
                <span className="font-semibold text-destructive"> {getTotalDuplicatesCount()}</span> items will be deleted, keeping 1 from each group.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-6">
              <Accordion type="multiple" className="w-full space-y-2">
                {duplicateClusters.map((cluster, clusterIndex) => (
                  <AccordionItem 
                    key={clusterIndex} 
                    value={`cluster-${clusterIndex}`}
                    className="border border-border rounded-lg px-1"
                  >
                    <AccordionTrigger className="text-left hover:no-underline px-3 py-4 hover:bg-muted/30 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground">
                          Duplicate Group {clusterIndex + 1}
                        </span>
                        <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full font-medium">
                          {cluster.length} items
                        </span>
                        <span className="text-xs bg-destructive/20 text-destructive px-3 py-1 rounded-full font-medium">
                          {cluster.length - 1} to delete
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-3 pb-4">
                      <div className="space-y-4">
                        {cluster.map((feedback, index) => (
                          <div key={feedback.id}>
                            <div className="mb-2">
                              <span className={`text-xs font-medium inline-flex items-center gap-1 ${
                                index === 0 
                                  ? 'text-primary' 
                                  : 'text-destructive'
                              }`}>
                                {index === 0 ? (
                                  <>
                                    <CheckCircle className="h-3 w-3" />
                                    Original (will be kept)
                                  </>
                                ) : (
                                  <>
                                    <Trash2 className="h-3 w-3" />
                                    Duplicate {index} (will be deleted)
                                  </>
                                )}
                              </span>
                            </div>
                            <FeedbackItem feedback={feedback.data} isOriginal={index === 0} />
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="bg-warn-background border border-warn-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-warn-foreground flex-shrink-0" />
                  <span className="font-semibold text-warn-foreground">Deletion Summary</span>
                </div>
                <div className="text-sm text-warn-foreground-secondary space-y-1 leading-relaxed">
                  <p>• <strong>{duplicateClusters.length}</strong> groups of duplicates found</p>
                  <p>• <strong>{getTotalDuplicatesCount()}</strong> duplicate items will be deleted</p>
                  <p>• <strong>{duplicateClusters.length}</strong> original items will be kept</p>
                  <p className="text-warn-foreground-accent font-medium">• This action cannot be undone</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)} 
                  className="flex-1 border-border hover:border-primary"
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleConfirmDeletion}
                  disabled={isDeleting}
                  className="flex-1"
                >
                  {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isDeleting ? "Deleting..." : `Delete ${getTotalDuplicatesCount()} Duplicates`}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Step 4: Deletion complete */}
        {step === 4 && deletionComplete && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl text-primary flex items-center justify-center gap-2">
                <CheckCircle className="h-6 w-6" />
                Deletion Complete
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 mt-6 text-center">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-8">
                <div className="animate-float mb-4">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-3">
                  Successfully Deleted Duplicates
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{deletedCount}</strong> duplicate feedback items have been removed.
                  <br />Original items have been preserved for your records.
                </p>
              </div>

              <Button 
                onClick={() => setIsOpen(false)} 
                className="w-full"
                size="lg"
              >
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}