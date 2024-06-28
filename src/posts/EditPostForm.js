import React,{useState} from 'react'
import { selectAllUsers } from './users/usersSlice'
import { deletePost, selectPostById, updatePost } from './postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
const EditPostForm = () => {
    const {postId} = useParams()
    const navigate = useNavigate()
    const post = useSelector((state) =>selectPostById(state,Number(postId)))
    const users = useSelector(selectAllUsers)

    const [title,setTitle] = useState(post?.title)
    const [content,setContent] = useState(post?.body)
    const [userId,setUserId] = useState(post?.userId)
    const [apiRequest,setApiRequest] = useState('idle')

    const dispatch = useDispatch()

    if(!post){
        return (
            <section>
                <h2>Posts not Found</h2>
            </section>
        )
    }
    const OntitleChange = e =>setTitle(e.target.value)
    const OncontentChange = e =>setContent(e.target.value)
    const onChangeUsers = e => setUserId(e.target.value)

    const canSave = [title,content,userId].every(Boolean) && apiRequest==='idle'

    const savePostClicked = () => {
        if(canSave){
            try{
                setApiRequest('pending')
                dispatch(updatePost({id:post.id,title,body:content,userId,reactions:post.reactions})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${post.id}`)
            }
                catch(err){
                    console.error('failed to update post',err)
                }
                finally{
                    setApiRequest('idle')
                }
            
        }
    }

    const onDeletePostClicked = () => {
        try{
            setApiRequest('pending')
            dispatch(deletePost({id:post.id})).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
        }
        catch(err){
            console.error('failed to delete post',err)
        }
        finally{
            setApiRequest('idle')
        }
    
    }

   
    const usersOption = users.map((user) =>(
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))
    
   
  return (
    <section>
        <h3>Edit post</h3>
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
            <button className="deleteButton"
                type="button"
                onClick={onDeletePostClicked}
            >
                Delete Post
            </button>

        </form>

    </section>
  )
}

export default EditPostForm