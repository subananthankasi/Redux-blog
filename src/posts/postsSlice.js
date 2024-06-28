import { createAsyncThunk,  createSelector, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";


const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'


    const initialState= {
    posts:[],  
    status:'idle',
    error:null,
    count:0
}


 export const fetchPosts = createAsyncThunk('posts/fetchpost',
                    async  () => {
                    const response = await axios.get(POSTS_URL)                 
                    return response.data
                    }
)
export const addNewPost = createAsyncThunk('posts/addNewPost',  
                    async (initialPost) => {
                    const response =await axios.post(POSTS_URL,initialPost)
                    return response.data
                    }
)

export const updatePost = createAsyncThunk('posts/updatePost',
    async (initialPost) => {
        const {id} = initialPost
        try{
            const response = await axios.put(`${POSTS_URL}/${id}`,initialPost)
            return response.data
        }
        catch(err){
         return initialPost
        }
        

    }
)
export const deletePost = createAsyncThunk('posts/deletePost',
    async (initialState) => {
        const {id} = initialState
        try{
            const response = await axios.delete(`${POSTS_URL}/${id}`)
           if(response?.status === 200) return initialState
           return `${response?.status} : ${response?.statusText}`
        }
        catch(err){
            return err.message
        }
        
    }
)

const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        addedpost: {
            reducer(state,action){
            state.posts.push(action.payload)
            },
            prepare(title,content,userId){
                return {
                    payload:{
                            id:nanoid(),
                            title,
                            content,
                            date:new Date().toISOString(),
                            userId,
                            reactions:{
                                    thumbsUp:0,
                                    wow:0,
                                    heart:0,
                                    rocket:0,
                                    coffee:0
                                    }
                    }
                }
            }
        },



        reactionsAdded(state,action){
            const {postId,reaction} = action.payload
            const existingPost = state.posts.find(post => post.id === postId)  
           
            if(existingPost){
                existingPost.reactions[reaction]++
            }
    
        },
  
        increaseCount(state,action){
            state.count = state.count+1

        }

    },
    extraReducers(builder){
        builder
        .addCase(fetchPosts.pending , (state,action)=>{
               state.status='loading'
        })
        .addCase(fetchPosts.fulfilled,(state,action) => {
            state.status='succeeded'
            let min =1
            const loadedPosts = action.payload.map(post =>{
                post.date = sub(new Date(),{minutes:min++}).toISOString()
                post.reactions = { 
                    thumbsUp:0,
                    wow:0,
                    heart:0,
                    rocket:0,
                    coffee:0
                    }
                return post
            })

            state.posts = state.posts.concat(loadedPosts)  
           
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
             
        })
        .addCase(addNewPost.fulfilled,(state,action)=>{
            const sortedPosts = state.posts.sort((a,b)=>{
                if(a.id > b.id) return 1
                if(a.id < b.id) return -1
                return 0
            })
            action.payload.id = sortedPosts[sortedPosts.length -1].id+1
            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString()
            action.payload.reactions = { 
                thumbsUp:0,
                wow:0,
                heart:0,
                rocket:0,
                coffee:0
                }
                console.log(action.payload);
                state.posts.push(action.payload) 
             
        })
        .addCase(updatePost.fulfilled,(state,action) => {
            if(!action.payload?.id){
                console.log("Update couldn't complete");
                console.log( action.payload);
                return
            }
            const {id} = action.payload
            action.payload.date = new Date().toISOString()
            const posts = state.posts.filter((post)=>post.id!==id)
            state.posts = [...posts,action.payload]                 
          
        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            if(!action.payload?.id){
                console.log('not complete delete');
                console.log(action.payload);
            }
            const {id} = action.payload
            const posts = state.posts.filter((post)=>post.id !== id)
            state.posts = posts

           
        })

    }
})


export const selectAllPosts = (state) => state.postsinfo.posts;  
export const getPostStatus = (state) => state.postsinfo.status
export const getPostsError = (state) => state.postsinfo.error
export const getCount = (state) => state.postsinfo.count

export const selectPostById =(state,postId) => state.postsinfo.posts.find((post)=>post.id===postId)

export const selectPostByUser = createSelector(
    [selectAllPosts,(state,userId) => userId],
    (posts,userId)=>posts.filter(post=>post.userId === userId )
    )
export const {increaseCount,reactionsAdded} = postsSlice.actions
export default postsSlice.reducer