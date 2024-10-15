import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import _ from 'lodash'

export default function AddAuthor({ addAuthor }) {
    const [show, setShow] = useState(false);

    const [name, setName] = useState(null)
    const [pictureURL, setpictureURL] = useState(null)
    const [description, setDescription] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event);

        // a cover if the user doesn't provide one
        if (pictureURL == null) {
            setpictureURL("https://www.shareicon.net/download/2015/12/19/689608_camera.svg")
        }

        //using the props to call the method
        addAuthor(name, pictureURL, description)
        handleClose();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="45" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Add Author</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="addmodal" onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="formGridTitle">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridCoverURL">
                            <Form.Label>Picture</Form.Label>
                            <Form.Control
                                type="url"
                                onChange={(e) => setpictureURL(e.target.value)}
                            />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button form="addmodal" variant="primary" type="submit">Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

