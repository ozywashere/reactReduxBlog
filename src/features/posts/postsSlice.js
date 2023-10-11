import { createSlice , nanoid , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { sub } from "date-fns";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'


//State is an array of objects
const initialState = {
  posts : [] , status : 'idle' , error : null ,
}


//Fetch Posts
export const fetchPosts = createAsyncThunk ( 'posts/fetchPosts' , async () => {
  try {
    const response = await axios.get ( POSTS_URL )
    return [ ... response.data ]
  } catch ( error ) {
    console.error ( error )
    return error.message
  }
} )


//Create Post
export const addNewPost = createAsyncThunk ( 'posts/addNewPost' , async ( initialPost ) => {
  try {
    const response = await axios.post ( POSTS_URL , initialPost )
    return response.data
  } catch ( error ) {
    console.error ( error )
    return error.message
  }
} )


//Update Post
export const updatePost = createAsyncThunk ( 'posts/updatePost' , async ( initialPost ) => {
  const { id } = initialPost
  try {
    const response = await axios.put ( `${ POSTS_URL }/${ id }` , initialPost )
    return response.data
  } catch ( error ) {
    console.error ( error )
    return error.message
  }
} )

//delete Post
export const deletePost = createAsyncThunk ( 'posts/deletePost' , async ( initialPost ) => {
    const{id}=initialPost
    try {
      const response = await axios.delete ( `${ POSTS_URL }/${ id }` )
      if(response?.status===200) return initialPost;
      return `${response?.status} ${response?.statusText}`;
    }catch ( error ){
      console.error ( error )
      return error.message
    }
})

const postsSlice = createSlice ( {
  //name of the slice
  name : 'posts' , //state of the slice
  initialState , //actions of the slice
  reducers : {
    postAdded : {
      reducer ( state , action ) {
        state.push ( action.payload )
      },
      prepare ( title , content , userId ) {
        return {
          payload : {
            id : nanoid () , title , content , date : new Date ().toISOString () , userId , reactions : {
              thumbsUp : 0 , hooray : 0 , heart : 0 , rocket : 0 , eyes : 0 ,
            } ,
          } ,
          
        }
      }
    },
    reactionAdded ( state , action ) {
      const { postId , reaction } = action.payload
      const existingPost = state.posts.find ( post => post.id === postId )
      if ( existingPost ) {
        existingPost.reactions[ reaction ] ++
      }
    }
  },
  extraReducers ( builder ) {
    builder.addCase ( fetchPosts.pending , ( state , action ) => {
      state.status = 'loading'
    } ).addCase ( fetchPosts.fulfilled , ( state , action ) => {
      state.status = 'succeeded'
      //adding date and reactions to the posts
      let min = 1;
      const loadedPosts = action.payload.map ( post => {
        post.date = sub ( new Date () , { minutes : min ++ } ).toISOString (), post.reactions = {
          thumbsUp : 0 , hooray : 0 , heart : 0 , rocket : 0 , eyes : 0 ,
        }
        return post
      } )
      
      state.posts = state.posts.concat ( loadedPosts )
    } ).addCase ( fetchPosts.rejected , ( state , action ) => {
      state.status = 'failed'
      state.error = action.error.message
    } ).addCase ( addNewPost.fulfilled , ( state , action ) => {
      action.payload.userId = parseInt ( action.payload.userId )
      action.payload.date = new Date ().toISOString ();
      action.payload.reactions = {
        thumbsUp : 0 , hooray : 0 , heart : 0 , rocket : 0 , eyes : 0
      }
      console.log ( action.payload )
      state.posts.push ( action.payload )
    } ).addCase(updatePost.fulfilled , ( state , action ) => {
      if(!action.payload.id){
        console.log("Update Failed")
        console.log(action.payload)
        return;
      }
      const { id } = action.payload
      action.payload.date= new Date ().toISOString ();
      const posts=state.posts.filter(post=>post.id!==id)
      state.posts=[...posts,action.payload]
    }).addCase(deletePost.fulfilled , ( state , action ) => {
      if(!action.payload.id){
        console.log("Delete Failed")
        console.log(action.payload)
        return;
      }
      const { id } = action.payload
      const posts=state.posts.filter(post=>post.id!==id)
      state.posts=[...posts]
    })
    
  }
  
} )

export const selectAllPosts = state => state.posts.posts
export const selectPostById = ( state , postId ) => state.posts.posts.find ( post => post.id === postId )
export const getPostsStatus = state => state.posts.status
export const getPostsError = state => state.posts.error


export const { postAdded , reactionAdded } = postsSlice.actions
export default postsSlice.reducer