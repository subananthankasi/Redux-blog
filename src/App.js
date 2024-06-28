import './App.css';
import PostsList from './posts/PostsList'
import Addpost from './posts/Addpost';
import { Navigate, Route, Routes } from 'react-router-dom';
import SinglePostPage from './posts/SinglePostPage';
import Layout from './components/Layout';
import EditPostForm from './posts/EditPostForm';
import UsersList from './posts/users/UsersList';
import UserPage from './posts/users/UserPage';



function App() {
return(
  <>

  <Routes>
    <Route path='/' element ={<Layout/>} >
      <Route index element={<PostsList/>} />
        <Route path='post'>
          <Route index element ={<Addpost/>} />
          <Route path=':postId' element = {<SinglePostPage/>} />
          <Route path='edit/:postId' element = {<EditPostForm/>} />
        </Route>
        <Route path='user'>
          <Route index element ={<UsersList/>} />
          <Route path=':userId' element = {<UserPage/>} />
          <Route path='*' element = {<Navigate to= "/" replace />} />
        </Route>
      </Route>
  </Routes>
  
  </>
)
}

export default App;
