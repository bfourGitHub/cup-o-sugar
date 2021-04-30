import React from "react";
import API from "../utils/api";
import { Image } from "cloudinary-react";
import { Card, Container, Button } from "react-bootstrap";
// import GetBtn from "./GetBtn";

function PostCard({ postData, setPostData }) {
  // postData and setPostData come in as props
  const cloudName = "dl7nnmiar";

  // update post as claimed
  const handleButtonClick = (e) => {
    const clickedId = e.target.value;

    //call API updatePost and send postID and status. back end will use auth ID
    API.updatePost(clickedId, { status: "claimed" })
      .then((data) => {
        // check data for error message "already claimed" message
        // if "already claimed" -> message = "sorry already claimed"
        if (data.data === "alreadyClaimed") {
          let tempPost = postData.map((post) => {
            if (post._id === clickedId) {
              post = { ...post, status: "alreadyClaimed" };
            }
            return post;
          });
          setPostData(tempPost);
        }
        // logged in user claimed post
        else {
          let tempPost = postData.map((post) => {
            if (post._id === clickedId) {
              post = {
                ...post,
                status: "claimed",
                postOwnerEmail: data.data.owner.email,
              };
            }
            return post;
          });
          setPostData(tempPost);
        }
      })
      .catch((err) => console.log(err));
  };

  return postData.map((postData) => (
            <Card className="card landingCard" key={postData._id} style={{ fontFamily: "'Montserrat', sans-serif", margin: "1rem", backgroundColor:"rgba(95, 158, 160, 0.10)", minWidth:"22rem"}} >
                <Card.Body style={{ display:"flex", justifyContent:"center"}} >
                    <Image radius="20" cloudName={cloudName} publicId={postData.cloudinary_id} crop="fill" style={{maxWidth: "20rem", minWidth:"20rem" }}  />
                </Card.Body>
    

      <Card.Body>
        <Card.Title>{postData.name}</Card.Title>
        <Card.Text style={{ minWidth: "20rem" }}>
          {postData.description}
        </Card.Text>
        <div className="postCardFooter">
          {postData.status === "open" && (
            <Button
              className="get-btn rounded"
              tabIndex="0"
              style={{
                backgroundColor: "rgba(95, 158, 160, 0.65)",
                color: "white",
                minWidth: "20rem",
              }}
              value={postData._id}
              status={postData.status}
              onClick={handleButtonClick}
            >
              Get
            </Button>
          )}
          {postData.status === "claimed" && (
            <Button
              variant="outline-primary"
              type="submit"
              style={{ minWidth: "20rem", maxWidth: "20rem" }}
            >
              It's yours! Contact owner at {postData.postOwnerEmail}
            </Button>
          )}
          {postData.status === "alreadyClaimed" && (
            <Button
              variant="outline-primary"
              type="submit"
              style={{ minWidth: "20rem", maxWidth: "20rem" }}
            >
              Too late! Someone already got it!
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  ));
}

export default PostCard;
