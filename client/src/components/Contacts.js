import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from "../store/ContactsProvider";


function Contacts() {

    const { contacts } = useContacts();

    return (
        <ListGroup variant="flush">
            {contacts.map((contact, index) => (
                <ListGroup.Item key={index}>
                    {contact.name}
                </ListGroup.Item>
            ))}
            
        </ListGroup>
    )
}

export default Contacts
