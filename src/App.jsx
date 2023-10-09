import { useState } from 'react'
import reactLogo from './assets/react.svg'

import { PostList } from "./features/posts/PostList.jsx";
import { AddPostForm } from "./features/posts/AddPostForm.jsx";

function App () {

  
  return ( <main className="max-w-screen-2xl mx-auto">

      <AddPostForm/>
      <PostList/>

  </main> )
}

export default App
