import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageSkeleton } from './Loader';
import { LikeButton } from './LikeButton';

export const PostCard = ({ post }) => {


  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="mb-6 break-inside-avoid relative group cursor-pointer animate-fadeIn" onClick={() => navigate(`/post/${post._id}`)}>
      <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 transition-transform duration-300 group-hover:scale-[1.02]">
        
        {!imageLoaded && (
          <div className="absolute inset-0 z-0">
            <ImageSkeleton className="h-full w-full rounded-none" />
          </div>
        )}
        
        {/* Placeholder sizing based on random logic or API data normally, here just loading the image */}
        <img 
          src={post?.imageLink} 
          alt={post?.caption || post?.prompt}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-auto object-cover relative z-10 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 pointer-events-none">
          <div className="flex justify-end pointer-events-auto">
            <div className="bg-zinc-950/60 backdrop-blur-md px-3 py-1.5 rounded-full">
              <LikeButton initialLikes={post?.likes?.length || 0} />
            </div>
          </div>
          
          <div className="pointer-events-auto flex items-end justify-between">
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="text-lg font-bold text-white truncate mb-1">{post?.prompt || post?.caption}</h3>
              <Link 
                to={`/profile/${post?.user?.name}`} 
                className="flex items-center gap-2 group/creator inline-flex"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={post?.user?.avatar} alt={post?.user?.name} className="h-6 w-6 rounded-full border border-zinc-500" />
                <span className="text-sm font-medium text-zinc-300 group-hover/creator:text-white transition-colors truncate">
                  {post?.user?.name}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
