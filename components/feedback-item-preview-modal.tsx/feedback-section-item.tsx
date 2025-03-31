import { Heart, Image as ImageIcon, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from 'react';

interface FeedbackItemProps {
  idea: {
    id: string;
    username: string;
    title: string;
    date: string;
    text: string;
    likes: number;
    userProfilePic?: string;
  };
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ idea }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [likes, setLikes] = useState(idea.likes);
    const [isLiked, setIsLiked] = useState(false);
  
    const toggleLike = () => {
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
    };
  
    return (
      <div className="bg-background p-4 rounded-md space-y-3 border border-border">
        {/* Idea Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage 
                src={idea.userProfilePic || undefined} 
                alt={`${idea.username}'s profile`} 
              />
              <AvatarFallback>{idea.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{idea.username}</p>
              <p className="text-mutedForeground text-sm">{idea.date}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleLike}>
            <Heart 
              className={`w-5 h-5 ${isLiked ? 'text-destructive fill-destructive' : 'text-mutedForeground'}`} 
            />
            <span className="ml-1 text-sm">{likes}</span>
          </Button>
        </div>
  
        {/* Idea Content */}
        <div>
          <h3 className="font-semibold text-foreground mb-2">{idea.title}</h3>
          <p className="text-foreground text-wrap wrap max-w-full" style={{wordBreak: `break-word`}}>
            {isExpanded ? idea.text : `${idea.text.slice(0, 200)}...`}
          </p>
          {idea.text.length > 200 && (
            <Button 
              variant="link" 
              className="p-0 mt-2 text-primary"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
          )}
        </div>
  
        {/* Comments Section */}
        <div className="border-t border-border pt-3">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground">Comments</h4>
            {/* <Button variant="ghost" size="sm" className="text-mutedForeground">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button> */}
          </div>
  
          {/* Comment Input */}
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-grow relative">
              <input 
                type="text" 
                placeholder="Add a comment..." 
                className="w-full p-2 pl-10 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-2 top-1/2 -translate-y-1/2 text-mutedForeground"
              >
                <ImageIcon className="w-5 h-5" />
              </Button>
            </div>
            <Button variant="default">Send</Button>
          </div>
        </div>
      </div>
    );
  };


  export default FeedbackItem;