import {useSelector} from "react-redux";
import { selectAllUsers } from "../users/usersSlice.js";

export const PostAuthor = ({userId}) => {
  const users=useSelector(selectAllUsers)
  const author=users.find(user=>user.id===userId)
  
  return (
    <span className="font-medium">
    by {author ? author.name : 'Unknown author'}
    </span>
  )
}