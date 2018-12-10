import React, {Component} from 'react';

class Comment extends Component{

    render(){

        return(

            <div className={'comment-item'}>
                <span className={'avatar-ph'} />
                <p>{this.props.commentText}</p>
            </div>
        )
    }
}

export default Comment;