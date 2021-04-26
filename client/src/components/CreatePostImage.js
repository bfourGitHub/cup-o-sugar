import React from 'react';
import { Container } from 'react-bootstrap';

// import giveStamps from '../assets/giveStamps.jpeg';
import giveStamps from '../assets/tinifiedImages/giveStamps-minCropped.jpg';


function CreatePostImage() {

    return (

        <Container>

            <div style={{ display: "flex", justifyContent: "center" }}>

                <img src={giveStamps} alt="Box Wooden Stamps" style={{ width: "100%", justifyContent: "center", marginBottom: "1rem", borderRadius: "8px" }} />

            </div>
        </Container>

    );
};

export default CreatePostImage;