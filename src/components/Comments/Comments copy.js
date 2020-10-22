import React, { Component } from 'react';
import Comment from './Comment';

const comments = [
  {
    content: 'comment-1comment-1comment-1comment-1comment-1comment-1comment-1comment-1comment-1comment-1comment-1comment-1comment-1comment-1comment-1comment-1comment-1comment-1',
    show: false,
    comments: [
      {
        content: 'comment-1-1',
        show: false,
        comments: []
      },
      {
        content: 'comment-1-2',
        show: false,
        comments: [
          {
            content: 'comment-1-2-1comment-1-2-1comment-1-2-1comment-1-2-1comment-1-2-1comment-1-2-1comment-1-2-1comment-1-2-1comment-1-2-1comment-1-2-1comment-1-2-1comment-1-2-1comment-1-2-1comment-1-2-1comment-1-2-1comment-1-2-1',
            show: false,
            comments: []
          }
        ]
      },
    ]
  },
  {
    content: 'comment-2',
    show: false,
    comments: []
  },
  {
    content: 'comment-3',
    show: false,
    comments: [
      {
        content: 'comment-3-1',
        show: false,
        comments: []
      },
      {
        content: 'comment-3-2',
        show: false,
        comments: []
      }
    ]
  },
];

function mapComments(comments, toggleShow) {
  return comments.map(comment => (
    <Comment
      key={comment.content}
      content={comment.content}
      show={comment.show}
      toggleShow={toggleShow}>
      {comment.comments.length === 0 ? null : mapComments(comment.comments, toggleShow)}
    </Comment>
  ));
}

class Comments extends Component {
  state = { comments: comments };

  traverseComments = (comments, content) => {
    let updatedComments = [...comments];
    for (let comment of updatedComments) {
      if (comment.content === content) {
        comment.show = !comment.show;
        return updatedComments;
      }
    }
    return updatedComments.map(comment => {
      if (comment.comments.length) {
        comment.comments = this.traverseComments(comment.comments, content);
      }
      return comment;
    });
  }

  toggleShow = (content) => {
    let updatedComments = this.traverseComments(this.state.comments, content);
    this.setState({ comments: updatedComments });
  }

  render() {
    return (
      mapComments(this.state.comments, this.toggleShow)
    );
  }
}

export default Comments;