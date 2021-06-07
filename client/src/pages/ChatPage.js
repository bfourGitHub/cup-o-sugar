import React, { useRef, useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import SideBar from '../components/SideBar';
import API from '../utils/api'

function ChatPage() {
    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    
    useEffect(() => {
        // get id of logged in user 
        // get id of user we are chatting with
        // get any stored messages from db
        API.getUserInfo()
        .then(({ data }) => {
            // console.log(data)
            console.log(data[0].name)
            setUserName(data[0].name);
            console.log(data[0]._id)
            setUserId(data[0]._id)
            // console.log(userInfo.data)


        })
        .catch(( err ) => console.log("Get user info error: " + err))
    }, []);

    // const handleSubmit

    return (
        <div className="d-flex" style={{ height: '100vh'}}>
            <SideBar userId={userId} userName={userName}/>
        </div>
    )
}

export default ChatPage
