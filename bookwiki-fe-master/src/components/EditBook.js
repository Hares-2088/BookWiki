import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import _ from 'lodash'

export default function EditBook({book, updateBook, authorOptions}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState(book.bookTitle)
    const [genre, setGenre] = useState(book.genre)
    const [isbn, setisbn] = useState(book.isbn)
    const [coverImageLink, setCoverImageLink] = useState(book.coverImageLink)
    const [description, setDescription] = useState(book.description)
    const [authorName, setAuthorName] = useState(book.author.name)
    const [releaseDate, setReleaseDate] = useState(new Date(book.releaseDate));

    const [year, setYear] = useState(releaseDate.getFullYear());
    const [month, setMonth] = useState(releaseDate.getMonth() + 1);
    const [day, setDay] = useState(releaseDate.getDate());

    //form selection options for date and genre
    var years = _.range(1500, new Date().getFullYear() + 1).reverse()
    var months = _.range(1, 13);
    var days = _.range(1, 32);
    var genreList = ["Fantasy", "Romance", "Non-Fiction", "Young Adult"]


    //regroup all the data and call the update book function when the button save is clicked
    const handleSubmit = () => {
        var author = authorOptions.find(author => author.name === authorName)
        var authorId = author.authorId

        const releaseDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

        updateBook({
            bookId: book.bookId, 
            title: title, 
            genre: genre,
            coverImageLink: coverImageLink, 
            releaseDate: releaseDate,
            isbn: isbn, 
            description: description,
            authorId: authorId
        })
        
        handleClose();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit Book
            </Button>

            <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>

                <Modal.Header closeButton>
                    <Modal.Title>Edit Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form id="addmodal" onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formGridTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            required
                            value={title}
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
                                    value={authorName}
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
                                    value={isbn}
                                    type="text"
                                    onChange={(e) => setisbn(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            type="text"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGridCoverURL">
                        <Form.Label>Cover image address</Form.Label>
                        <Form.Control
                            value={coverImageLink}
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
                                    value={genre}
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
                                            value={year}
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
                                            value={month}
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
                                            value={day}
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

