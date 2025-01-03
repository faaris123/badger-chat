import React, { useEffect, useState, useContext } from "react"
import BadgerMessage from "./BadgerMessage";
import { Row, Col, Pagination, Container, Form, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1); 

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // Got help from Office Hours to better understande the useContext 
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const loadMessages = () => {
        fetch(`https://cs571api.cs.wisc.edu/rest/f24/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        }).then(res => res.json()).then(json => {
            setMessages(json.messages)
        })
    };

   
    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, page]);

    function post(e) {
        e?.preventDefault();

        if (!title || !content) {
            alert("You must provide both a title and content!")
            return
        }

        // Fetched the apropriate API based on the project description
        fetch(`https://cs571api.cs.wisc.edu/rest/f24/hw6/messages?chatroom=${props.name}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                content: content
            }),
        })
        .then(res => {
            // Checked the return codes to handle the appropriate response
            if (res.status === 200) {
                alert("Successfully posted!")
                setTitle("")
                setContent("")
                loadMessages()
            }
        })
    }

    // Fetched the apropriate API based on the project description
    function deletePost(id) {
        fetch(`https://cs571api.cs.wisc.edu/rest/f24/hw6/messages?id=${id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
            }
        })
        // Checked the return codes to handle the appropriate response
        .then(res => {
            if (res.status === 200) {
                alert("Successfully deleted the post!")
                loadMessages()
            }
        })
    }

    function handleTitle(e) {
        setTitle(e.target.value)
    }

    function handleContent(e) {
        setContent(e.target.value)
    }

    // I used this resource to understand how to use a state variable with conditional rendering: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    // I got the initial idea from ChatGPT and used the source to further my knowledge 
    // Also used previous homeworks to navigate this portion
    // Used this resource to review pages: https://react-bootstrap.netlify.app/docs/components/pagination/
    return <>
        <h1>{props.name} Chatroom</h1>
        {loginStatus?.loggedIn && <Form onSubmit={post}>
            <Form.Label htmlFor = "titleInput">Post Title</Form.Label>
            <Form.Control id = "titleInput" onChange = {handleTitle}></Form.Control>
            <Form.Label htmlFor = "contentInput">Post Content</Form.Label>
            <Form.Control id = "contentInput" onChange = {handleContent}></Form.Control>
            <br></br>
            <Button type="submit" onClick={post}>Create Post</Button>
        </Form>}
        {!loginStatus?.loggedIn && <p>You must be logged in to post!</p>}
        {
            /* TODO: Allow an authenticated user to create a post. */
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        /* TODO: Complete displaying of messages. */
                        <Container fluid>
                            <Row>
                                {messages.map((message, idx) => 
                                    <Col xs = {12} sm = {12} md = {6} lg = {4} xl = {3} key = {idx}>
                                        <BadgerMessage
                                            title = {message.title}
                                            poster = {message.poster}
                                            content = {message.content}
                                            created = {message.created} 
                                            id = {message.id}
                                            owner = {message.poster === loginStatus?.username}
                                            deletePost = {deletePost}
                                        ></BadgerMessage>
                                    </Col>
                                )}
                            </Row>
                        </Container>
                    }
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        <Row>
            <Pagination>
                <Pagination.Item onClick={() => setPage(1)} active={page === 1}>1</Pagination.Item>
                <Pagination.Item onClick={() => setPage(2)} active={page === 2}>2</Pagination.Item>
                <Pagination.Item onClick={() => setPage(3)} active={page === 3}>3</Pagination.Item>
                <Pagination.Item onClick={() => setPage(4)} active={page === 4}>4</Pagination.Item>
            </Pagination>
        </Row>
    </>
}
