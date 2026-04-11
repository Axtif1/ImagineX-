import React, { useState } from 'react';
import { UserPlus, UserCheck } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';

export const FollowButton = ({ initialIsFollowing = false, className, size = 'sm' }) => {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleFollow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    // console.log("TODO: call default API to follow/unfollow");
  };

  return (
    <Button
      variant={isFollowing ? 'secondary' : 'primary'}
      size={size}
      onClick={handleFollow}
      className={cn("gap-2", className)}
    >
      {isFollowing ? (
        <>
          <UserCheck className="h-4 w-4 text-violet-400" />
          Following
        </>
      ) : (
        <>
          <UserPlus className="h-4 w-4" />
          Follow
        </>
      )}
    </Button>
  );
};
