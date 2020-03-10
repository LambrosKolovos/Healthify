import React from "react";
import "../css/postView.css";
import UserInfo from "../components/UserInfo";

const PostView = ({ title, date, content }) => {
<<<<<<< HEAD
  return (
    <div className="postContainer">
      <UserInfo />
      <div className="postInfo">
        <div className="postHeader">
          <div className="postTitle">
            <h3>{title}</h3>
          </div>
          <div className="postDate">
            <h5>{date}</h5>
          </div>
        </div>
        <div className="postBody">
          <p>{content}</p>
          <div className="likebar">
            <p>
              (1)
              <a href="#heart"> 🤍</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
=======
	return (
		<div className="postContainer">
			<UserInfo />
			<div className="postInfo">
				<div className="postHeader">
					<div className="postTitle">
						<h3>{title}</h3>
					</div>
					<div className="postDate">
						<h5>{date}</h5>
					</div>
				</div>
				<div className="postBody">
					<p>{content}</p>
					<div className="likebar">
						<p>
							(1)
							<a> 🤍</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
>>>>>>> 8b1a7d2fba4050db26cc4e2859304b874113bf59
};

export default PostView;