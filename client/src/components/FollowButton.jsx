import React, { useState } from 'react';
import { UserPlus, UserCheck } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../lib/utils';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../features/follow/followSlice';
import { toast } from 'react-toastify';

export const FollowButton = ({ userId, initialIsFollowing = false, className, size = 'sm' }) => {
  const dispatch = useDispatch()
  const { followLoading } = useSelector(state => state.follow)

  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const handleFollow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) return;

    if (isFollowing) {
      // Optimistic update
      setIsFollowing(false)
      dispatch(unfollowUser(userId)).unwrap().catch((err) => {
        // Revert on failure
        setIsFollowing(true)
        toast.error(err || "Failed to unfollow", { position: "top-center", theme: "dark" })
      })
    } else {
      // Optimistic update
      setIsFollowing(true)
      dispatch(followUser(userId)).unwrap().catch((err) => {
        // Revert on failure
        setIsFollowing(false)
        toast.error(err || "Failed to follow", { position: "top-center", theme: "dark" })
      })
    }
  };

  return (
    <Button
      variant={isFollowing ? 'secondary' : 'primary'}
      size={size}
      onClick={handleFollow}
      disabled={followLoading}
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
