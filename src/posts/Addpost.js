
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postsSlice'
import { selectAllUsers } from './users/usersSlice'
import { useNavigate } from 'react-router-dom'

const Addpost = () => {
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [userId,setUserId] = useState('')
    const [apiRequest,setApiRequest] = useState('idle')
    const navigate = useNavigate()
   
    
    const OntitleChange = e =>setTitle(e.target.value)
    const OncontentChange = e =>setContent(e.target.value)
    const onChangeUsers = e => setUserId(e.target.value)

    const canSave = [title,content,userId].every(Boolean) && apiRequest==='idle'

    const dispatch = useDispatch()
    
    const savePostClicked = () => {
        if(canSave){
            try{
                setApiRequest('pending')
                dispatch(addNewPost({title,body:content,userId})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')

            }
                catch(err){
                    console.error('failed to save post',err)
                }
                finally{
                    setApiRequest('idle')
                }
            
        }
    }


   
    const users = useSelector(selectAllUsers)
    const usersOption = users.map((user) =>(
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))
    
   return (
    <section>
        <h3>Add post</h3>
        <form>
            <label htmlFor="PostTitle">Post Title:</label>
            <input type="text"
                value={title}
                onChange={OntitleChange}
                placeholder='Enter post Title'
            />
            <label htmlFor="author">Author</label>
            <select name="author" id="author" value={userId} onChange={onChangeUsers}>
                <option value=""></option>
                {usersOption}
            </select>
            <label htmlFor="postContent">Post Content:</label>
            <input type="text"
                value={content}
                onChange={OncontentChange}
                placeholder='Enter post Title'
            />
            <button onClick={savePostClicked} disabled={!canSave}>Save Post</button>
        </form>

    </section>
  )
}

export default Addpost