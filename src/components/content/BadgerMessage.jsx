import React from "react"
import { Button, Card } from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);

    // Used the previous homework to undertand how to do this section
    return <Card style={{margin: "0.5rem", padding: "0.5rem"}}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {props.owner && <Button onClick = {() => props.deletePost(props.id)}>Delete</Button>}
    </Card>
}

export default BadgerMessage;