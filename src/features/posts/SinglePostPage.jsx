import { PostAuthor } from "./PostAuthor.jsx";
import { TimeAgo } from "./TimeAgo.jsx";
import { ReactionButtons } from "./ReactionButtons.jsx";
import { Link , useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";


export const SinglePostPage = () => {
  const { postId } = useParams ()
  const post = useSelector ( ( state ) => selectPostById ( state , Number ( postId ) ) )
  
  if ( ! post ) {
    return ( <section>
        <h2>Post not found!</h2>
      </section> )
  }
  
  return (
          <article className="border border-gray-900 rounded-2xl shadow-md p-6 h-full flex flex-col" key={ postId }>
            <h3 className="font-medium text-2xl mb-3 capitalize">{ post.title }</h3>
            <p className="text-lg text-gray-500 capitalize my-4">
              { post.body.substring ( 0 , 100 ) }
            </p>
            <div className="flex  space-x-4 items-center mt-auto">
              <Link to={`/posts/edit/${post.id}`} className="underline underline-offset-4">Edit Post</Link>
              <PostAuthor userId={ post.userId }/>
              <TimeAgo timeStamp={ post.date }/>
            
            </div>
            <ReactionButtons post={ post }/>
          </article>
   )
}
