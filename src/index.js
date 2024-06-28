import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './App/Store';
import { fetchUsers } from './posts/users/usersSlice';
import { BrowserRouter } from 'react-router-dom';
import { fetchPosts } from './posts/postsSlice';

store.dispatch(fetchUsers())
store.dispatch(fetchPosts())
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
<BrowserRouter>
 
        <App />
    
         
I  
 </BrowserRouter>

 </Provider>
      
       /* <Router>
    
        <ul>
          <li><Link to="/update">Update</Link></li>
          <li><Link to="/read">Read</Link></li>
          <li><Link to="/create">Create</Link></li>
        </ul>
        <Routes>
          <Route path="/update" element={<Update />} />
          <Route path="/read" element={<Read />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      
        </Router> */
     
   

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

