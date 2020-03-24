import React, { Component } from "react";
import "../css/userInfo.css";

export class UserInfo extends Component {
  render() {
    return (
      <div className="userInfo">
        <div className="userProfilePicture">
          <img
            src="http://www.azyrusthemes.com/forum2/fonts/icons/avatars/J.svg"
            alt="Avatar"
            style={{ position: "relative", width: "100%", height: "100%" }}
          />
          <h4 style={{ width: "100%", textAlign: "center" }}>Jake</h4>
        </div>
        <div className="userStats">
          <p>Likes: 50</p>
          <p>Posts: 241</p>
        </div>
      </div>
    );
  }
}

export default UserInfo;
