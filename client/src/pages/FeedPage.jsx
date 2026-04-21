import React, { useEffect } from 'react';
import { MasonryGrid } from '../components/MasonryGrid';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../features/post/postSlice';
import { getProfile } from '../features/profile/profileSlice';
import { toast } from 'react-toastify';


export const FeedPage = () => {
  const dispatch = useDispatch() 
  const {posts ,postLoading , postSuccess , postError , postErrorMessage} = useSelector(state => state.post)
  const { user ,  isSuccess , isError , isLoading , message } = useSelector(state => state.auth)
  const {profile} = useSelector(state => state.profile)
  
  // const myFeed = posts.filter((post) => post.user._id === profile.followings[0]._id)
  // console.log(profile)

  // useEffect(() => {
  //   // Fetch Post
  //   dispatch(getPosts())
  //   // Fetch Profile
  //   dispatch(getProfile(user.name))


  //   if (postError && postErrorMessage || isError && message){
  //     toast.error(postErrorMessage || message , {position : "top-center"})
  //   } 
  // }, [postError , postErrorMessage , isError , message])
   // ✅ Sirf mount pe fetch karo
  useEffect(() => {
    dispatch(getPosts())
    if (user?.name) dispatch(getProfile(user.name))
  }, [])

  // ✅ Errors alag useEffect mein handle karo
  useEffect(() => {
    if (postError && postErrorMessage) toast.error(postErrorMessage, { position: 'top-center' })
    if (isError && message) toast.error(message, { position: 'top-center' })
  }, [postError, postErrorMessage, isError, message])

  // ✅ profile load hone ke baad hi myFeed banao
  const myFeed = profile?.followings?.length > 0
    ? posts.filter(post => 
        profile.followings.some(f => f._id === post.user._id)
      )
    : posts // ✅ followings nahi hain toh sab posts dikhao



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
