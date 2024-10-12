import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { errorToast, successToast } from '../utils/toasts';
import EditBook from './EditBook';
import { useNavigate } from 'react-router-dom';
import EditAuthor from './EditAuthor';


export default function BookDetails() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [authorOptions, setAuthorOptions] = useState(null);

    useEffect(() => {
        (async () => {
            const authorResponse = await fetch("http://localhost:8080/api/v1/authors", {
                method: "GET"
            });

            const authors = await authorResponse.json();
            setAuthorOptions(authors);
        })();
    }, []);

    const author = authorOptions ? authorOptions.find(author => author.name === state.author.name) : null;

    function updateAuthor(updatedAuthor) {

        var authorRequestDTO = {
            name: updatedAuthor.name,
            description: updatedAuthor.description,
            pictureURL: updatedAuthor.pictureURL
        }

        fetch(`http://localhost:8080/api/v1/authors/${updatedAuthor.authorId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authorRequestDTO)
        })
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log("data is: " + data.title)

                //check for error
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    console.log("post error occured");
                    return Promise.reject(error);
                }
            })
            navigate('/');

    }

    function updateBook(updatedBook) {

        var bookRequestDTO = {
            bookTitle: updatedBook.title,
            releaseDate: updatedBook.releaseDate,
            genre: updatedBook.genre,
            isbn: updatedBook.isbn,
            coverImageLink: updatedBook.coverImageLink,
            description: updatedBook.description,
            authorId: updatedBook.authorId
        }

        fetch(`http://localhost:8080/api/v1/books/${updatedBook.bookId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookRequestDTO)
        })
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                console.log("data is: " + data.title)
                //check for error
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    console.log("post error occured");
                    return Promise.reject(error);
                }
            })
            navigate('/');
    }

    async function deleteBookHandler() {
        await fetch(`http://localhost:8080/api/v1/books/${state.bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                successToast("Delete Successful")
            })
            .catch(function (error) {
                console.log("an unknown error occured")
                return Promise.reject(error)
            })
    }

    async function deleteAuthorHandler() {
        await fetch(`http://localhost:8080/api/v1/authors/${state.author.authorId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');

                if (response.status === 204) {
                    successToast("Delete Successful")
                }
                if (response.status === 422) {
                    errorToast("You can't delete an authors that has books")
                }
            })
            .catch(function (error) {
                console.log("an unknown error occured")
                return Promise.reject(error)
            })
    }

    function onDeleteBook() {
        deleteBookHandler();
        navigate('/');
    }

    function onDeleteAuthor() {
        deleteAuthorHandler();
        navigate('/');
    }

    return (
        <Container>
          <Row className="">
            <Col className='detail-image-container mt-4 mx-3'>
              {state && state.coverImageLink && state.bookTitle && (
                <Image src={state.coverImageLink} alt={state.bookTitle} fluid className='detail-image' />
              )}
            </Col>
      
            <Col xs={7} className="mt-3 mt-md-0 paragraph ms-1">
              <h1 className="mb-4 subtitle">{state && state.bookTitle}</h1>
              <p className="mb-2">
                <strong>Release Date:</strong>{state && state.releaseDate && state.releaseDate.substring(0, 10)}
              </p>
              <p className="mb-2"><strong>Genre:</strong> {state && state.genre}</p>
              <p className="mb-2"><strong>ISBN:</strong> {state && state.isbn}</p>
      
              <div className="d-flex flex-column">
                <Button variant="danger" onClick={onDeleteBook} style={{ marginTop: '13rem', marginBottom: '1rem' }} className='paragraph'>Delete</Button>
                <EditBook book={state} updateBook={updateBook} authorOptions={authorOptions} className='paragraph' />
              </div>
            </Col>
          </Row>
      
          <Row className="mt-5 ms-1">
            <Col>
              <div className="mb-2 paragraph">
                <h3>Description</h3>
                <p className='paragraph'>{state && state.description}</p>
              </div>
            </Col>
          </Row>
      
          <hr />
      
          <Row className="mt-5">
            <Col className="detail-image-container mx-4">
              {state && state.author && (
                <LinkContainer to="/authorbooks" state={state.author }>
                  <Image src={state.author.pictureURL} alt={state.author.name} roundedCircle fluid />
                </LinkContainer>
              )}
            </Col>
      
            <Col className="mt-3 mt-md-0">
              {state && state.author && (
                <>
                  <h1 className="mb-4 subtitle">{state.author.name}</h1>
                  <div className="mb-2 paragraph">
                    <h3>Description</h3>
                    <p className="mt-2">{state.author.description}</p>
      
                    <LinkContainer to="/authorbooks" state={{ author: state.author }}>
                      <p className='hoverable-link'>More of {state.author.name}'s books</p>
                    </LinkContainer>
      
                    <div className="d-flex flex-column">
                      <Button variant="danger" onClick={onDeleteAuthor} style={{ marginTop: '13rem', marginBottom: '1rem' }} className='paragraph'>Delete</Button>
                      <EditAuthor author={state.author} updateAuthor={updateAuthor} className='paragraph' />
                    </div>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Container>
      );
}
