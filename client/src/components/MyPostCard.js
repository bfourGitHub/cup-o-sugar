import React from 'react';
// import { useStoreContext } from '../utils/GlobalState';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import API from '../utils/api';
import { Image } from 'cloudinary-react';
import { CardImg } from 'react-bootstrap';


function MyPostCard({ myPosts, setMyPosts}) {
    // myPosts and setMyPosts come in as props

    const cloudName = "dl7nnmiar"

    // delete post
    const deleteMyPost = (event) => {
        // console.log(event.target.value);
        let deleteID = event.target.value
        const tempPost = myPosts.filter((post) => post._id !== deleteID);

        // console.log(postID)
        API.deletePost(deleteID)
            .then(results => {
                // console.log(results.data);
                setMyPosts(tempPost);
            })
            .catch((err) => console.log(err));
    };

    return (

        myPosts.map((myPost) => (

            <Card className="card landingCard" key={myPost._id} style={{ fontFamily: "'Montserrat', sans-serif", margin: "1rem", backgroundColor:"rgba(95, 158, 160, 0.10)", minWidth:"22rem"}} >
                <Container>
                <Card.Body style={{ display: "flex", justifyContent: "center" }} >
                    <Image  radius="20" cloudName={cloudName} publicId={myPost.cloudinary_id} crop="fill" style={{maxWidth: "20rem", minWidth:"20rem" }} />
                </Card.Body>
                

                <Card.Body style={{maxWidth:"20rem"}} >
                    <Card.Title>{myPost.name}</Card.Title>
                    <Card.Text style={{minWidth: "20rem" }} >{myPost.description}</Card.Text>
                    <Card.Text>Status: {myPost.status}</Card.Text>

                    <div className="postCardFooter" >                        
                    <Button className="delete-btn" tabIndex="0" value={myPost._id} variant="outline-danger" onClick={deleteMyPost} style={{minWidth: "20rem" }}>Delete</Button>
                    </div>
                </Card.Body>
                </Container>
            </Card>
        ))

    );
};

export default MyPostCard;