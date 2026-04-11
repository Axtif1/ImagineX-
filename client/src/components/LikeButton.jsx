import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '../lib/utils';

export const LikeButton = ({ initialLikes = 0, isLiked = false, className }) => {
  const [liked, setLiked] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (liked) {
      setLiked(false);
      setLikesCount(p => p - 1);
    } else {
      setLiked(true);
      setLikesCount(p => p + 1);
    }
    // console.log("TODO: call API to like/unlike");
  };

  return (
    <button
      onClick={toggleLike}
      className={cn(
        "flex items-center gap-1.5 transition-all duration-200 active:scale-90",
        liked ? "text-red-500" : "text-white hover:text-red-400",
        className
      )}
    >
      <Heart className={cn("h-5 w-5 transition-colors duration-200", liked && "fill-current")} />
      <span className="text-sm font-medium">{likesCount}</span>
    </button>
  );
};
