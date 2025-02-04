import React, { useState } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import API from "../utils/api";

function CreatePost() {
  const [state, setState] = useState({
    postName: "",
    postDescription: "",
    image: "",
    type: "give",
    status: "open",
  });
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);

  // modal states and functions
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    // set selectedFile and selectedFileName for upload
    setSelectedFile(file);
    setSelectedFileName(file.name);
    // set previewFile for image preview in PostPage
    previewFile(file);
  };

  // show preview of file to be uploaded in page
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // submit image file and post data from form
  const handleSubmit = (e) => {
    e.preventDefault();
    let message = [];

    // check for inputs and add error messages
    if (!state.postDescription) {
      message.push("Please add item description.");
    }
    if (!state.postName) {
      message.push("Please add item name.");
    }
    if (!selectedFile) {
      message.push("Please add image file.");
    }
    if (!selectedFile || !state.postName || !state.postDescription) {
      console.log("Post not posted. Error:");
      console.log(message);
      setErrorMessage(message);
      handleShow();
      return;
    }

    // create FormData
    let fd = new FormData();
    fd.append("name", state.postName);
    fd.append("description", state.postDescription);
    fd.append("image", selectedFile, selectedFileName);
    fd.append("type", "give");
    fd.append("status", "open");

    API.createPost(fd)
      .then((dbPost) => {
        // change this to Link to my posts?
        window.location.href = "/feed";
      })
      .catch((err) => console.log("Post creation error: " + err));
  };

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        <h3
          className="postOwnerName"
          style={{
            fontFamily: "'Lobster', cursive",
            color: "rgba(95, 158, 160, 0.95)",
          }}
        >
          Give something away...
        </h3>

        <Form.Control
          type="text"
          name="postName"
          value={state.postName}
          onChange={handleInputChange}
          placeholder="Item Name"
        />
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            rows={3}
            name="postDescription"
            value={state.postDescription}
            onChange={handleInputChange}
            placeholder="Description"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Upload a Photo</Form.Label>
          <Form.File
            id="exampleFormControlFile1"
            accept=".jpg, .png, .jpeg"
            onChange={handleFileInputChange}
          />
        </Form.Group>
        <Button variant="outline-primary" type="submit">
          Post
        </Button>
      </Form>
      {previewSource && (
        <div>
          <h2>Image Preview:</h2>
          <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
        </div>
      )}

      {errorMessage && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>You're not quite finished...</Modal.Title>
          </Modal.Header>
          <Modal.Body><ul>{errorMessage.map((msg, index) =>
                <li key={msg.index}>{msg}</li>)
              }
              </ul></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}

export default CreatePost;
