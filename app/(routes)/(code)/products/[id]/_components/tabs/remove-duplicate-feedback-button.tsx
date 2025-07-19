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
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// Mock FeedbackItem component
function FeedbackItem({ feedback, isOriginal = false }) {
  return (
    <div className={`p-4 border rounded-lg ${isOriginal ? 'border-green-500 bg-green-50' : 'border-red-300 bg-red-50'}`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-sm">{feedback.title}</h4>
        <span className="text-xs text-muted-foreground">{feedback.date}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-2">{feedback.content}</p>
      <div className="flex gap-2">
        <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
          {feedback.category}
        </span>
        <span className="text-xs px-2 py-1 rounded bg-accent text-accent-foreground">
          Score: {feedback.score}
        </span>
        {isOriginal && (
          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
            ✓ Will be kept
          </span>
        )}
        {!isOriginal && (
          <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800">
            ✗ Will be deleted
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

  const handleOptionSelect = (option: string) => {
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
        // No duplicates found
        setErrorOne("No identical duplicate feedback found!");
        toast.error("No identical duplicate feedback found!");
        // setIsOpen(false);
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
        alert(`No similar feedback found with ${similarityThreshold}% similarity threshold.`);
        setStep(1);
      }
    } catch (error) {
      console.error('Error fetching similar feedback:', error);
      alert("Error finding similar feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmDeletion = async () => {
    setIsDeleting(true);
    
    try {
      // Prepare clusters data for deletion (only the IDs to be deleted)
      const clustersToDelete = duplicateClusters.map(cluster => 
        cluster.slice(1).map(item => item.id) // Remove first item (keep it), get IDs of rest
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
      } else {
        throw new Error(result.error || 'Deletion failed');
      }
      
    } catch (error) {
      console.error('Error deleting duplicates:', error);
      alert("Error deleting duplicates. Please try again.");
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
        <Button variant="outline" size="sm">
          Remove Duplicate Feedback
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        {/* Step 1: Choose deletion method */}
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                How do you want to delete duplicated feedback?
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-6">
              <Card 
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleOptionSelect("identical")}
              >
                <CardHeader>
                  <CardTitle className="text-lg">Delete Identical Feedback</CardTitle>
                  <CardDescription>
                    Remove feedback entries that are exactly the same in content. 
                    This will only delete perfect matches with identical text, keeping one copy of each.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card 
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleOptionSelect("similar")}
              >
                <CardHeader>
                  <CardTitle className="text-lg">Delete Similar Feedback</CardTitle>
                  <CardDescription>
                    Remove feedback entries that have similar content based on semantic analysis. 
                    You can set a similarity threshold to control how similar items need to be.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span>Finding duplicate feedback...</span>
              </div>
            )}
            {errorOne && !isLoading && (
              <div className="flex text-destructive items-center justify-center p-4">
                <AlertTriangle className="h-6 w-6 mr-2" />
                <span>Error: {errorOne}</span>
              </div>
            )}
          </>
        )}

        {/* Step 2: Similarity threshold input */}
        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl">
                Set Similarity Threshold
              </DialogTitle>
              <DialogDescription className="text-center">
                Choose how similar feedback needs to be to be considered duplicates
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="threshold">Similarity Threshold (By percentage)</Label>
                <Input
                  id="threshold"
                  type="number"
                  min="50"
                  max="100"
                  value={similarityThreshold}
                  onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
                  className="text-center text-lg"
                />
                <p className="text-sm text-muted-foreground">
                  Higher values (90-100%) will only match very similar feedback. 
                  Lower values (50-80%) will match more loosely related feedback.
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
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
              <DialogTitle className="text-center text-xl">
                Review Duplicate Feedback
              </DialogTitle>
              <DialogDescription className="text-center">
                Found {duplicateClusters.length} groups of duplicates. 
                {getTotalDuplicatesCount()} items will be deleted, keeping 1 from each group.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-6">
              <Accordion type="multiple" className="w-full">
                {duplicateClusters.map((cluster, clusterIndex) => (
                  <AccordionItem key={clusterIndex} value={`cluster-${clusterIndex}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <span>Duplicate Group {clusterIndex + 1}</span>
                        <span className="text-xs bg-secondary px-2 py-1 rounded">
                          {cluster.length} items ({cluster.length - 1} to delete)
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {cluster.map((feedback, index) => (
                          <div key={feedback.id} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">
                                {index === 0 ? (
                                  <span className="text-green-600">✓ Original (will be kept)</span>
                                ) : (
                                  <span className="text-red-600">✗ Duplicate {index} (will be deleted)</span>
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

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Deletion Summary</span>
                </div>
                <p className="text-sm text-yellow-700">
                  • {duplicateClusters.length} groups of duplicates found<br/>
                  • {getTotalDuplicatesCount()} duplicate items will be deleted<br/>
                  • {duplicateClusters.length} original items will be kept<br/>
                  • This action cannot be undone
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
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
              <DialogTitle className="text-center text-xl text-green-600">
                <CheckCircle className="inline-block mr-2 h-6 w-6" />
                Deletion Complete
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 mt-6 text-center">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Successfully Deleted Duplicates
                </h3>
                <p className="text-green-700">
                  {deletedCount} duplicate feedback items have been removed.
                  Original items have been preserved.
                </p>
              </div>

              <Button onClick={() => setIsOpen(false)} className="w-full">
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}