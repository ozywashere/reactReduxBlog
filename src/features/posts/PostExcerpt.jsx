import { PostAuthor } from "./PostAuthor.jsx";
import { TimeAgo } from "./TimeAgo.jsx";
import { ReactionButtons } from "./ReactionButtons.jsx";
export const PostExcerpt = ({post}) => {
  return (
    <>
      <article className="border border-gray-900 rounded-2xl shadow-md p-6 h-full flex flex-col" key={ post.id }>
        <h3 className="font-medium text-2xl mb-3 capitalize">{ post.title }</h3>
        <p className="text-lg text-gray-500 capitalize my-4">
          { post.body.substring ( 0 , 100 ) }
        </p>
        <div className="flex justify-between items-center mt-auto">
          <PostAuthor userId={ post.userId }/>
          <TimeAgo timeStamp={ post.date }/>
        
        </div>
        <ReactionButtons post={post}/>
      </article>
    </>
  )
}