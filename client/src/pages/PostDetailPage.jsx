import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Share2, MessageCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { LikeButton } from '../components/LikeButton';
import { FollowButton } from '../components/FollowButton';
import { ImageSkeleton } from '../components/Loader';
import { mockComments } from '../mockData';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../features/post/postSlice';

export const PostDetailPage = () => {
  const { id } = useParams()
  const { profile ,  profileSuccess , profileError , profileLoading , profileErrorMessage } = useSelector(state => state.profile)
  const {post ,postLoading , postSuccess , postError , postErrorMessage} = useSelector(state => state.post)
  const dispatch = useDispatch() 
  const [loading, setLoading] = useState(false);
  // // const [post, setPost] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // PostDetailPage.jsx ke useEffect mein add karo
useEffect(() => {
  dispatch(getPost(id))
}, [id])

// // Aur post aane ke baad log karo
// useEffect(() => {
//   if (post) console.log('POST DATA:', post)
// }, [post])


  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {loading ? (
          <div className="max-w-[1200px] mx-auto bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[600px] animate-pulse">
            <div className="md:w-3/5 bg-zinc-800" />
            <div className="p-8 md:w-2/5" />
          </div>
        ) : post && (
          <div className="max-w-[1200px] mx-auto bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fadeIn">
            
            {/* Image Section */}
            <div className="md:w-[55%] lg:w-3/5 relative bg-zinc-950 flex items-center justify-center overflow-hidden">
               {!imageLoaded && (
                  <div className="absolute inset-0 z-0">
                    <ImageSkeleton className="h-full w-full rounded-none" />
                  </div>
                )}
                <img 
                  src={post.imageLink} 
                  alt={post.prompt} 
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full max-h-[85vh] object-contain relative z-10 transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
                />
            </div>

            {/* Info Section */}
            <div className="md:w-[45%] lg:w-2/5 flex flex-col bg-zinc-900 border-l border-zinc-800 max-h-[85vh] overflow-y-auto text-zinc-100">
              
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2">
                     <LikeButton initialLikes={post?.likes?.length || 0} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-base font-semibold" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="rounded-full">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <h1 className="text-3xl font-extrabold text-white mb-6 leading-tight">{post.prompt}</h1>

                <div className="flex items-center justify-between p-4 bg-zinc-950/50 rounded-2xl mb-8">
                  <Link to={`/profile/${post.user.name}`} className="flex items-center gap-3 group">
              <div className="h-12 w-12 rounded-full border border-zinc-700 group-hover:border-violet-500 transition-colors flex justify-center items-center text-2xl">{profile?.name?.charAt(0).toUpperCase()} </div>

                    <div>
                      <p className="font-semibold text-zinc-100 group-hover:text-violet-400 transition-colors">{post.user.name}</p>
                      <p className="text-sm text-zinc-500">{post.user?.followers?.length || 0}</p>
                    </div>
                  </Link>
                  <FollowButton initialIsFollowing={false} />
                </div>

                <div className="mb-6 flex-1">
                  <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" /> Comments
                  </h3>
                  <div className="space-y-6">
                    {mockComments.map(comment => (
                      <div key={comment.id} className="flex gap-3 text-sm">
                        <img src={comment.avatar} alt={comment.user.name} className="h-8 w-8 rounded-full border border-zinc-800" />
                        <div>
                          <p><strong className="text-zinc-200 cursor-pointer hover:underline">{comment.user}</strong> <span className="text-zinc-300">{comment.text}</span></p>
                          <p className="text-xs text-zinc-500 mt-1">{comment.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Comment Input */}
              <div className="p-6 border-t border-zinc-800 bg-zinc-950/30">
                <div className="flex gap-3">
                  <img src="https://i.pravatar.cc/40?img=1" alt="You" className="h-10 w-10 rounded-full border border-zinc-800" />
                  <input 
                    type="text" 
                    placeholder="Add a comment..."
                    className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-4 text-sm text-zinc-100 focus:outline-none focus:border-violet-500 transition-colors"
                  />
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
};
