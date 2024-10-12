import { useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'
import { Container, Row } from "react-bootstrap"
import BookCard from "./BookCard";
import { successToast } from '../utils/toasts';

export default function AuthorBooksList() {

    const { state } = useLocation(); // Author object

    const [books, setBooks] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [authorOptions, setAuthorOptions] = useState(null);

    //get all the authors to put them in my authors options for the update
    useEffect(() => {
        (async () => {
            const authorResponse = await fetch("http://localhost:8080/api/v1/authors", {
                method: "GET"
            });

            const authors = await authorResponse.json()
            console.log(authors)
            setAuthorOptions(authors)
        })();
    }, []);

    //get the books of this author
    function getTheBooks() {
        (async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/authors/${state.authorId}/books`, {
                    method: "GET"
                });

                if (!response.ok) {
                    console.error("Failed to fetch books:", response.statusText);
                    return;
                }

                const result = await response.json()
                const books = result.books
                setBooks(books)
                setIsLoading(false)
            }
            catch (error) {
                console.error("Error fetching books:", error);
            }
        })();
    }

    //Get the books when opening the page
    useEffect(() => {
        getTheBooks();
    }, []);
    if (isLoading) {
        return <div><p>Loading...</p></div>
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
    }

    async function deleteBookHandler(book) {
        await fetch(`http://localhost:8080/api/v1/books/${book.bookId}`, {
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


    return (
        <Container fluid className="bookAuthor background">
            <h1 className="title">{state.name}'s Books</h1>
            <Row className='justify-content-evenly'>

                {books && books.map((book) =>
                    <BookCard key={book.bookId}
                        book={book}
                        updateBook={updateBook}
                        authorOptions={authorOptions}
                        deleteBookHandler={deleteBookHandler} />
                )}

            </Row>
        </Container>
    )
}