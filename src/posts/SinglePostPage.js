import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice'

const SinglePostPage = () => {
    const {postId} = useParams()
    const post = useSelector((state) =>selectPostById(state,Number(postId)))

    if(!post){
        return <h2>Posts not Found</h2>
    }
  return (
    <article key={post.id}>
    <h3>{post.title}</h3>
    <p>{post.body}</p>
    <p className='postCredit'>
    <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
      <PostAuthor userId={post.userId} />
      <TimeAgo timeStamp={post.date} />
      
    </p>
    <ReactionButtons post={post} />
  </article>
  )
}

export default SinglePostPage