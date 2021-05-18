import React, { useRef, useState } from "react";
import { useLogin, useIsAuthenticated } from "../utils/auth";
import API from "../utils/api";
import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import { Card } from "react-bootstrap";
import HowItWorks from "./HowItWorks";
import Guidelines from "./Guidelines";

function LoginRegDrop() {
  const isAuthenticated = useIsAuthenticated();
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState("");

  // ----- LOGIN - hooks and functions -----//
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();
  const login = useLogin();

  const loginHandleSubmit = async (e) => {
    e.preventDefault();
    const email = loginEmailRef.current.value;
    const password = loginPasswordRef.current.value;

    try {
      const loginData = await login({ email, password });
      // userData contains user _Id
      console.log(loginData.id);
      // User has been successfully logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.
      window.location.href = "/feed";
    } catch (err) {
      // Handle error responses from the API
      if (err.response && err.response.data) {
        console.log(err.response.data);
        let message = "Login Error. ";
        if (err.response.data.email) message += err.response.data.email;
        if (err.response.data.password) message += err.response.data.password;
        setLoginErrorMessage(message);
      } else {
        console.log(err.response.data);
        setLoginErrorMessage("Login Error.");

      }
    }
  };
  // ----- END OF LOGIN -----//

  // ---- REGISTER USER - hooks and functions ----//
  const registerEmailRef = useRef();
  const registerPasswordRef = useRef();
  const registerNameRef = useRef();
  const registerNeighborhoodRef = useRef();

  //  Get the helper login function from the `useLogin` hook.
  //   we already have this above so if we separate login and register, we will need to uncomment const login=useLogin()
  //   const login = useLogin();

  const registerHandleSubmit = async (e) => {
    e.preventDefault();

    const email = registerEmailRef.current.value;
    const password = registerPasswordRef.current.value;
    const name = registerNameRef.current.value;
    const neighborhood = registerNeighborhoodRef.current.value;

    try {
      // Register the user.
      await API.register({ name, email, password, neighborhood });

      // User has been successfully registered, now log them in with the same information.
      await login({ email, password });

      // User has been successfully registered, logged in and added to state. Perform any additional actions you need here such as redirecting to a new page.
      window.location.href = "/feed";
    } catch (err) {
      // Handle error responses from the API. This will include
      if (err.response && err.response.data) {
        console.log(err.response.data);
        let message = "Registration Error. ";
        if (err.response.data.email) message += err.response.data.email;
        if (err.response.data.password) message += err.response.data.password;
        setRegistrationErrorMessage(message);
      } else {
        console.log(err.response.data);
        setRegistrationErrorMessage("Registration Error.")
      }
    }
  };
  // ---- END OF REGISTER USER ----//

  return (

    <Container >

      <Accordion >
        {!isAuthenticated &&
        <Card className="loginDrop">
          <Card.Header className="loginAccBtn" style={{ backgroundColor: "rgba(95, 158, 160, 0.45)" }} >
            <Accordion.Toggle as={Button} variant="link" eventKey="0" style={{ color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight:"300" }}>
              Login
          </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Form className="regDropMenu" onSubmit={loginHandleSubmit} style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {loginErrorMessage && <p style={{ color: "red", fontFamily: "'Montserrat', sans-serif" }}  >{loginErrorMessage}</p>}
              <Form.Group controlId="loginEmail">
                <Form.Control
                  type="text"
                  ref={loginEmailRef}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group controlId="loginPassword">
                <Form.Control
                  type="password"
                  ref={loginPasswordRef}
                  placeholder="Password"
                />
              </Form.Group>

              <Button variant="outline-primary" type="submit" >
                Submit
            </Button>
            </Form>
          </Accordion.Collapse>
        </Card>
        }
        {!isAuthenticated &&

        <Card>
          <Card.Header className="regAccBtn" style={{ backgroundColor: "rgba(95, 158, 160, 0.45)" }} >
            <Accordion.Toggle as={Button} variant="link" eventKey="1" style={{ color: "white", fontFamily: "'Montserrat', sans-serif" }}>
              Register
          </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Form className="regDropMenu" onSubmit={registerHandleSubmit} style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {registrationErrorMessage && <p style={{ color: "red", fontFamily: "'Montserrat', sans-serif" }} >{registrationErrorMessage}</p>}

              <Form.Group controlId="registerName">
                <Form.Control type="text" ref={registerNameRef} placeholder="What's your name?" />
              </Form.Group>
              <Form.Group controlId="registerEmail">
                <Form.Control type="email" ref={registerEmailRef} placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="registerPassword">
                <Form.Control type="password" ref={registerPasswordRef} placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="registerNeighborhood">
                <Form.Label>Select Your Neighorhood</Form.Label>
                <Form.Control as="select" ref={registerNeighborhoodRef} style={{ fontFamily: "'Montserrat', sans-serif" }}>
                 
                  <option>Select A Zipcode</option>
                  <option>98121</option>
                  <option>98101</option>
                  <option>98102</option>
                  <option>98104</option>
                  <option>98106</option>
                  <option>98109</option>
                  <option>98112</option>
                  <option>98116</option>
                  <option>98119</option>
                  <option>98122</option>
                  <option>98126</option>
                  <option>98134</option>
                  <option>98136</option>
                  <option>98144</option>
                  <option>98154</option>
                  <option>98199</option>
                </Form.Control>
                <Form.Label style={{ color: "rgba(95, 158, 160)", fontFamily: "'Montserrat', sans-serif", marginTop: "0.6rem" }} >More Locations Coming Soon...</Form.Label>
              </Form.Group>

              <Button variant="outline-primary" type="submit">
                Submit
            </Button>
            </Form>
          </Accordion.Collapse>
        </Card>
}
        <Card className="loginDrop">
          <Card.Header className="loginAccBtn" style={{ backgroundColor: "rgba(95, 158, 160, 0.45)" }} >
            <Accordion.Toggle as={Button} variant="link" eventKey="2" style={{ color: "white", fontFamily: "'Montserrat', sans-serif" }}>
              How it Works
          </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2" style={{ margin: "1.5rem" }}>
            <HowItWorks />
          </Accordion.Collapse>
        </Card>
        <Card className="loginDrop">
          <Card.Header className="loginAccBtn" style={{ backgroundColor: "rgba(95, 158, 160, 0.45)" }} >
            <Accordion.Toggle as={Button} variant="link" eventKey="3" style={{ color: "white", fontFamily: "'Montserrat', sans-serif" }}>
              Guidelines
          </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3" style={{ margin: "1.5rem" }}>
            <Guidelines />
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>

  );
}

export default LoginRegDrop;
