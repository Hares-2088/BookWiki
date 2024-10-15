import { LinkContainer } from 'react-router-bootstrap'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import EditAuthor from './EditAuthor';

export default function AuthorCard({ author, deleteAuthorHandler, updateAuthor }) {

    const navigate = useNavigate();


    function onDelete() {
        deleteAuthorHandler(author);
        navigate('/');
    }
    return (

        <Card style={{ width: '20rem', borderRadius: '2rem', background: '#2a1760' }} text="light" className="mx-1 my-3">
            <LinkContainer to={"/authorbooks"}
                state={author}
                style={{ height: '100%', marginTop: '1rem' }}
                className="rounded-5">
                <Card.Img
                    variant="top"
                    src={author.pictureURL}
                />
            </LinkContainer>
            <Card.Body>
                <Card.Title className="fs-2">{author.name}</Card.Title>
            </Card.Body>

            <Card.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                <EditAuthor author={author} updateAuthor={updateAuthor} />
                <Button variant="danger" onClick={onDelete} style={{ marginRight: '20px' }}>Delete</Button>
            </Card.Footer>

        </Card>


    )
}