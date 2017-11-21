import React, { Component } from "react";

class PostsList extends Component {
  render() {
    return (
      <div className="post-list">
        <div className="post-item">
          <div>"id": "8xf0y6ziyjabvozdd253nd"</div>
          <div>"timestamp": 1467166872634</div>
          <div>"title": "Udacity is the best place to learn React"</div>
          <div>"body": "Everyone says so after all."</div>
          <div>"author": "thingtwo"</div>
          <div>"category": "react"</div>
          <div>"voteScore": 6</div>
          <div>"deleted": false</div>
          <div>"commentCount": 2</div>
        </div>
        <div className="post-item">
          <div>"id": "6ni6ok3ym7mf1p33lnez"</div>
          <div>"timestamp": 1468479767190</div>
          <div>"title": "Learn Redux in 10 minutes!"</div>
          <div>
            "body": "Just kidding. It takes more than 10 minutes to learn
            technology."
          </div>
          <div>"author": "thingone"</div>
          <div>"category": "redux"</div>
          <div>"voteScore": -5</div>
          <div>"deleted": false</div>
          <div>"commentCount": 0</div>
        </div>
      </div>
    );
  }
}

export default PostsList;
