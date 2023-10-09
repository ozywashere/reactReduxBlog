import { useState } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { selectAllUsers } from "../users/usersSlice.js";
import { postAdded , addNewPost } from './postsSlice'

export const AddPostForm = () => {
  const dispatch = useDispatch ();
  
  const [ title , setTitle ] = useState ( '' )
  const [ content , setContent ] = useState ( '' )
  const [ userId , setUserId ] = useState ( '' )
  const [ addRequestStatus , setAddRequestStatus ] = useState ( 'idle' )
  
  const users = useSelector ( selectAllUsers );
  const onTitleChanged = e => setTitle ( e.target.value )
  const onContentChanged = e => setContent ( e.target.value )
  
  const onAuthorChanged = e => setUserId ( e.target.value )
  
  const canSave = Boolean ( title ) && Boolean ( content ) && Boolean ( userId ) && addRequestStatus === 'idle'
  const onSavePostClicked = () => {
    if ( canSave ) {
      try {
        setAddRequestStatus ( 'pending' )
        dispatch ( addNewPost ( { title , content , user : userId } ) ).unwrap()
        setAddRequestStatus ( 'success' )
        setTitle ( '' )
        setContent ( '' )
        setUserId ( '' )
      } catch ( error ) {
        console.error ( 'Failed to save the post: ' , error )
      }finally {
        setAddRequestStatus ( 'idle' )
      }
    }
  }
  
  const useOptions = users.map ( user => <option key={ user.id } value={ user.id }>{ user.name }</option> )
  
  
  return ( <section className="bg-white">
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Add a New Post</h2>
      <form onSubmit={ onSavePostClicked }>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="md:col-span-1 col-span-2">
            <label htmlFor="postTitle" className="block mb-2 text-sm font-medium text-gray-900">Post Title:</label>
            <input type="text" id="postTitle" name="postTitle" value={ title }
                   onChange={ onTitleChanged }
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="postAuthor" className="block mb-2 text-sm font-medium text-gray-900">Author:</label>
            <select id="postAuthor"
                    name="postAuthor"
                    value={ userId }
                    onChange={ onAuthorChanged }
                    className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select an author</option>
              { useOptions }
            </select>
          
          </div>
          <div className="col-span-2">
            <label htmlFor="postContent" className="block mb-2 text-sm font-medium text-gray-900">Content:</label>
            <textarea id="postContent"
                      rows="8"
                      name="postContent"
                      value={ content }
                      onChange={ onContentChanged }
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button type="submit"
                  disabled={ ! canSave }
                  className="inline-flex justify-center items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800
          focus:outline-none focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed
                  ">
            Save Post
          </button>
        </div>
      </form>
    </div>
  </section> )
}
