import React, { useRef, useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import SideBar from '../components/SideBar'

function ChatPage() {
    // get id of logged in user 
    // get id of user we are chatting with

    useEffect(() => {
        // get any stored messages from db
    }, []);

    // const handleSubmit

    return (
        <div className="d-flex" style={{ height: '100vh'}}>
            <SideBar />
        </div>
    )
}

export default ChatPage
