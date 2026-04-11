import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MasonryGrid } from '../components/MasonryGrid';
import { FollowButton } from '../components/FollowButton';
import { useSelector } from 'react-redux';
import { Loader } from 'lucide-react';

export const ProfilePage = () => {
 
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const { user ,  isSuccess , isError , isLoading , message } = useSelector(state => state.auth)
  


  useEffect(() => {
    setLoading(false)            
  }, [username])

  if(isLoading){
    return(
      <Loader/>
    )
  }

  return (
        <main className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 animate-pulse space-y-8">
              <div className="h-32 w-32 bg-zinc-800 rounded-full mb-4" />
              <div className="h-8 w-48 bg-zinc-800 rounded" />
            </div>
          ) : user && (
            <div className="animate-fadeIn">
              {/* Profile Header */}
              <div className="px-6 py-12 border-b border-zinc-800/50 flex flex-col items-center justify-center text-center bg-zinc-900/20">
              <div className="h-32 w-32 rounded-full border-4 border-zinc-800 mb-4 shadow-xl flex justify-center items-center text-5xl">{user?.name?.charAt(0).toUpperCase()} </div>

                <h1 className="text-3xl font-extrabold text-white mb-2">{user.name}</h1>
                <p className="text-zinc-500 mb-4">@{user.name}</p>
                <p className="text-zinc-300 max-w-lg mb-6 leading-relaxed">{user.bio}</p>
                
                <div className="flex items-center gap-6 mb-8 text-sm">
                  <div className="flex flex-col"><span className="font-bold text-white text-lg">{user.posts}</span><span className="text-zinc-500">Posts</span></div>
                  <div className="flex flex-col"><span className="font-bold text-white text-lg">{user.followers}</span><span className="text-zinc-500">Followers</span></div>
                  <div className="flex flex-col"><span className="font-bold text-white text-lg">{user.following}</span><span className="text-zinc-500">Following</span></div>
                </div>

                <div className="flex gap-3">
                  <FollowButton initialIsFollowing={user.isFollowing} size="md" className="px-8" />
                </div>
              </div>

              {/* Profile Grid */}
              <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
                <h2 className="text-xl font-bold text-white mb-8">Creations</h2>
                <MasonryGrid posts={posts} loading={false} />
              </div>
            </div>
          )}
        </main>

  );
};
