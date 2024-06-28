import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../posts/postsSlice";
import usersReducer from "../posts/users/usersSlice";
// import MyPostReducer from "../Mypost/MyPostSlice";
// import MyAuthorReducer from "../Mypost/myUser/MyAuthorSlice";



const store = configureStore({
    reducer : {
        postsinfo:postsReducer,
        usersinfo:usersReducer,
        // myPostInfo:MyPostReducer,
        // myUserInfo:MyAuthorReducer
     
    }
})

export default store
  
