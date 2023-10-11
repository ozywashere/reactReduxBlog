import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter , Routes , Route } from "react-router-dom";
import { PostList } from "./features/posts/PostList.jsx";
import { AddPostForm } from "./features/posts/AddPostForm.jsx";
import { AppLayout } from "./ui/AppLayout.jsx";
import { SinglePostPage } from "./features/posts/SinglePostPage.jsx";
import { EditPost } from "./features/posts/EditPost.jsx";

function App () {
  
  
  return ( <BrowserRouter>
    <Routes>
      <Route path="/" element={ <AppLayout/> }>
        <Route index element={ <PostList/> }/>
        <Route path="/posts" element={ <AddPostForm/> }/>
        <Route path="/posts/edit/:postId" element={ <EditPost/> }/>
        <Route path="/posts/:postId" element={ <SinglePostPage/> }/>
      </Route>
    </Routes>
  </BrowserRouter> )
}

export default App
