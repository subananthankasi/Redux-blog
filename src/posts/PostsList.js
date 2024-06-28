import React from 'react'
import { useSelector } from 'react-redux'
import {getPostsError, getPostStatus, selectAllPosts } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'

const Posts = () => {

  const posts = useSelector(selectAllPosts);  
  const postStatus = useSelector(getPostStatus)
  const error = useSelector(getPostsError)


  let content ;
  if(postStatus==='loading'){
     content = <p>loading...</p>
  }
  else if(postStatus==='succeeded'){
    const orderedPost = posts.slice().sort((a, b) => b.date.localeCompare(a.date));        
      content = orderedPost.map((post) => (
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p className='excerpt'>{post.body.substring(0,75)}.....</p>
        <p className='postCredit'>
          <Link to={`post/${post.id}`}>ViewPost</Link>
          <PostAuthor userId={post.userId} />
          <TimeAgo timeStamp={post.date} />
          <ReactionButtons post={post} />
        </p>
      </article>
    ));   
  }
  else if(postStatus === 'error'){
    content = <p>{error}</p>
  }
 

  return (
  <>
  <section>
    {content}
  </section>
  
  </>
  )
}

export default Posts