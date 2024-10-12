import { Card, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import EditBook from './EditBook'
import { useNavigate } from 'react-router-dom';


export default function BookCard(props) {

    const { book, updateBook, authorOptions, deleteBookHandler } = props;
    const navigate = useNavigate();

    function onDelete() {
        deleteBookHandler(book);
        navigate('/');
    }
    return (

        <Card style={{ width: '25rem', borderRadius: '2rem', background: '#2a1760' }} text="light" className="mx-1 my-3">
            <LinkContainer to="/bookdetails"
                state={book}
                style={{ marginTop: '1rem', height: '100%' }}>

                <Card.Img
                    variant="top"
                    src={book.coverImageLink}
                    className="rounded-5"
                />
            </LinkContainer>
            <Card.Body>

                <Card.Title className="fs-2">{book.bookTitle}</Card.Title>

                <Card.Text>
                    <strong>Release Year: </strong>
                    {book.releaseDate.substring(0, 10)}

                    <br />

                    <strong>Genre: </strong>
                    {book.genre}

                    <br />

                    <strong>ISBN: </strong>
                    {book.isbn}
                </Card.Text>
            </Card.Body>
            <Card.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                <EditBook book={book} updateBook={updateBook} authorOptions={authorOptions}/>
                <Button variant="danger" onClick={onDelete} style={{ marginRight: '20px' }}>Delete</Button>
            </Card.Footer>
        </Card>


    )
}