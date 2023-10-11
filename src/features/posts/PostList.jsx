import { useSelector , useDispatch } from 'react-redux'
import { useEffect } from "react";

import { selectAllPosts , getPostsStatus , getPostsError , fetchPosts } from './postsSlice'
import { PostAuthor } from './PostAuthor.jsx'
import { TimeAgo } from "./TimeAgo.jsx";
import { ReactionButtons } from "./ReactionButtons.jsx";
import { PostExcerpt } from "./PostExcerpt.jsx";


export const PostList = () => {
  const dispatch = useDispatch ()
  const posts = useSelector ( selectAllPosts )
  const postsStatus = useSelector ( getPostsStatus )
  const error = useSelector ( getPostsError )
  useEffect ( () => {
    if ( postsStatus === 'idle' ) {
      dispatch ( fetchPosts () );
    }
  } , [ postsStatus , dispatch ] )
  
  let content;
  
  if ( postsStatus === 'loading' ) {
    content = <div className="loader">Loading...</div>
  } else if ( postsStatus === 'succeeded' ) {
    const orderedPosts = posts.slice ().sort ( ( a , b ) => b.date.localeCompare ( a.date ) )
    content = orderedPosts.map ( post => <PostExcerpt key={ post.id } post={ post }/> )
  } else if ( postsStatus === 'failed' ) {
    content = <div>{ error }</div>
  }
  
  
  return ( <section className="bg-white">
    <div className="py-8 px-4 mx-auto max-w-screen-2xl lg:py-16">
      
      <div className="flex items-center mb-4 justify-between ">
        <h2 className=" text-2xl font-bold text-gray-900">Posts</h2>
      
      </div>
      <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-y-0 w-full">
        { content }
      </div>
    </div>
  </section> )
}