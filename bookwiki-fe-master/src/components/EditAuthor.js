import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import _ from 'lodash'

export default function EditAuthor({author, updateAuthor}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState(author.name)
    const [pictureURL, setpictureURL] = useState(author.pictureURL)
    const [description, setDescription] = useState(author.description)


    //regroup all the data and call the update author function when the button save is clicked
    const handleSubmit = () => {

        updateAuthor({
            name: name, 
            pictureURL: pictureURL, 
            description: description,
            authorId: author.authorId
        })
        handleClose();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit Author
            </Button>

            <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Edit Author</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form id="addmodal" onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formGridTitle">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            value={name}
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridCoverURL">
                        <Form.Label>Picture</Form.Label>
                        <Form.Control
                            value={pictureURL}
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

