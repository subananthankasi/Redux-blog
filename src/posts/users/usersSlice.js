import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'
const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers',async () => {
    const response = await axios.get(USERS_URL)
    return response.data
})
const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            return action.payload
        })
    }
})
export const selectAllUsers = (state) => state.usersinfo

export const selectUserById = (state,userId) => {
    state.usersinfo.find(user => user.id === userId)
    // state.postsinfo.posts.find((post)=>post.id===postId)
}
export default usersSlice.reducer