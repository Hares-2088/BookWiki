import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import _ from 'lodash'

export default function AddBook({ addBook, authorList }) {
    const [show, setShow] = useState(false);
    const [authorOptions, setAuthorOptions] = useState(authorList);

    const [title, setTitle] = useState(null)
    const [genre, setGenre] = useState("Fantasy")
    const [isbn, setisbn] = useState(null)
    const [coverImageLink, setCoverImageLink] = useState(null)
    const [description, setDescription] = useState(null)
    const [authorName, setAuthorName] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //to get today's date
    const today = new Date();
    const todayMonth = today.getMonth()+1;
    const todayYear = today.getFullYear();
    const todayDate = today. getDate();

    const [year, setYear] = useState(todayYear);
    const [month, setMonth] = useState(todayMonth);
    const [day, setDay] = useState(todayDate);


    //form selection options for date and genre
    var years = _.range(1500, new Date().getFullYear() + 1).reverse()
    var months = _.range(1, 13);
    var days = _.range(1, 32);
    var genreList = ["Fantasy", "Romance", "Non-Fiction", "Young Adult", "Thriller"]



    //Creating an event to put in my form that will return the addBook function 
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event);
  
        // a cover if the user doesn't provide one
        if (coverImageLink == null) {
            setCoverImageLink("https://i.pinimg.com/564x/fd/97/85/fd9785e129342a73b146eebc161b0a04.jpg")
        }

        // Creating a Date object
        const releaseDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
 
        //get authorId
        var author = authorOptions.find(author => author.name === authorName)
        var authorId = author.authorId

        //using the props to call the method
        addBook(title, coverImageLink, releaseDate, genre, isbn, description, authorId)
        handleClose();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="45" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>            
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form id="addmodal" onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formGridTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            placeholder="Your Book"
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formGridAuthor">
                                <Form.Label>Author</Form.Label>
                                <Form.Select
                                    required
                                    defaultValue="Choose..."
                                    onChange={(e) => setAuthorName(e.target.value)}
                                >
                                    <option value="">Choose...</option>
                                    {authorOptions &&
                                        authorOptions.map((author, i) => (
                                            <option key={i} value={author.name}>
                                                {author.name}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formGridisbn">
                                <Form.Label>ISBN</Form.Label>
                                <Form.Control
                                    placeholder="isbn.."
                                    type="text"
                                    onChange={(e) => setisbn(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            placeholder="Summarize..."
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridCoverURL">
                        <Form.Label>Cover image address</Form.Label>
                        <Form.Control
                            placeholder="https://"
                            type="url"
                            onChange={(e) => setCoverImageLink(e.target.value)}
                        />
                    </Form.Group>

                    <Row className="mb-3">
                        <Col md={4}>
                            <Form.Group controlId="formGridGenre">
                                <Form.Label>Genre</Form.Label>
                                <Form.Select
                                    required
                                    defaultValue="Fantasy"
                                    onChange={(e) => setGenre(e.target.value)}
                                >
                                    <option value="">Choose</option>
                                    {genreList &&
                                        genreList.map((selectedGenre, i) => (
                                            <option key={i} value={selectedGenre}>
                                                {selectedGenre}
                                            </option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={8}>
                            <Row className="mb-3">
                                <Col>
                                    <Form.Label>Release Date</Form.Label>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={4}>
                                    <Form.Group controlId="formGridYear">
                                        <Form.Select
                                            required
                                            value={year || todayYear}
                                            onChange={(e) => setYear(e.target.value)}
                                        >
                                            <option value="">{years[0]}</option>
                                            {years.map((year, i) => (
                                                <option key={i} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col md={4}>
                                    <Form.Group controlId="formGridMonth">
                                        <Form.Select
                                            required
                                            value={month || todayMonth}
                                            onChange={(e) => setMonth(e.target.value)}
                                        >
                                            <option value="">{months[0]}</option>
                                            {months.map((month, i) => (
                                                <option key={i} value={month}>
                                                    {month}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col md={4}>
                                    <Form.Group controlId="formGridDay">
                                        <Form.Select
                                            required
                                            value={day || todayDate}
                                            onChange={(e) => setDay(e.target.value)}
                                        >
                                            <option value="">{days[0]}</option>
                                            {days.map((day, i) => (
                                                <option key={i} value={day}>
                                                    {day}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
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

