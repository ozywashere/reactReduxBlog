import { useDispatch ,useSelector} from 'react-redux'
import { reactionAdded } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍' ,
  hooray: '🎉' ,
  heart: '❤️' ,
  rocket: '🚀' ,
  eyes: '👀' ,
}
export const ReactionButtons = ({post}) => {
  const dispatch = useDispatch ()
  const reactionButtons=Object.entries(reactionEmoji).map(([name,emoji])=>{
    return (
      <button
        key={name}
        type="button"
        className="muted-button inline-flex items-center gap-2"
     
      >
        <span
          onClick={() => dispatch(reactionAdded({postId: post.id, reaction: name}))}
          className="inline-block hover:scale-[200%] hover:drop-shadow-2xl  mr-1 duration-300 " role="img" aria-label={name}>
          {emoji}
        </span>
       <span>{post.reactions[name]}</span>
      </button>
    )
  })
  return (
    <div className="flex gap-4 items-center mt-4">
      {reactionButtons}
    </div>
  )
}