import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionsAdded } from './postsSlice'


const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({post}) => {
    const dispatch = useDispatch();
  
    
    
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    const buttonClick = () => {
        dispatch(reactionsAdded({ postId: post.id, reaction: name }));
   
    };
    
        return (
            <button key={name}
                    type='button'
                    className='reactionButton'
                    onClick={buttonClick}
            >
                {emoji}{post.reactions[name]}
            </button>
        );
    });

    return (
     <div>
       {reactionButtons}
     </div>
          
    
    );
};

export default ReactionButtons;
