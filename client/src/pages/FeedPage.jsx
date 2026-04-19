import React, { useEffect } from 'react';
import { MasonryGrid } from '../components/MasonryGrid';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../features/post/postSlice';


export const FeedPage = () => {
  const dispatch = useDispatch() 
  const {posts ,postLoading , postSuccess , postError , postErrorMessage} = useSelector(state => state.post)

  


  useEffect(() => {
    dispatch(getPosts())
  }, [])

   if (postError) return <p className="text-red-400 p-8">{postErrorMessage}</p>

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6 animate-fadeIn">For You</h1>
            <MasonryGrid posts={posts || []} loading={postLoading} />
          </div>
        </main>
      </div>
    </div>
  );
};
