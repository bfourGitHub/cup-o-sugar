// NOT BEING USED - TO BE DELETED
import React, { useState, useEffect } from "react";
import {Button} from "react-bootstrap";

const GetBtn = props => {

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [buttonMessage, setButtonMessage] = useState("Get");

    // disable button once the post item is claimed
    const handleButtonClick = (e) => {
        setButtonDisabled(true);
        setButtonMessage("It's yours!"); 
        props.onClick(e);
    }

    useEffect(() => {
        if (props.status === "claimed") {
            setButtonDisabled(true);
            setButtonMessage("Already Claimed!")
        }
    }, [])

    return (
        <Button className="get-btn rounded" {...props} 
                onClick = { handleButtonClick } 
                tabIndex="0" 
                disabled = { buttonDisabled }
                style={{backgroundColor:"rgba(95, 158, 160, 0.65)", color: "white", minWidth:"20rem" }}>
            {buttonMessage}
        </Button>
    );
};

export default GetBtn;