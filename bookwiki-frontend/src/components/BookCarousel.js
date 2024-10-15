import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { LinkContainer } from 'react-router-bootstrap';

export default function BookCarousel(genre) {

    const [books, setBooks] = useState([]);
    const [genreBooks, setGenreBooks] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    //Create a function to fetch all the books instead of reloading the page
    function getAllBooks() {
        (async () => {
            const response = await fetch("http://localhost:8080/api/v1/books", {
                method: "GET"
            });

            const books = await response.json()

            if (Array.isArray(books)) {
                setBooks(books);
                const genreBookListbooks = books.filter(book => book.genre === genre.genre);
                setGenreBooks(genreBookListbooks);
            } else {
                console.error("Books is not an array:", books);
            }
            
            setIsLoading(false)
        })();
    }
    //getting all the books when opening the page
    useEffect(() => {
        getAllBooks()
    }, [])
    if (isLoading) {
        return <div><h1>Loading...</h1></div>
    }

    return (
        <>
            <h1 className="carousel-title">{genre.genre}</h1>

            <Carousel data-bs-theme="dark">

                {genreBooks.map(book => (

                    <Carousel.Item key={book.bookId} interval={2000} className="carousel-item">
                        <LinkContainer to="/bookdetails"
                            state={book}
                            className="carousel-image"
                        >
                            <img src={book.coverImageLink} alt="bookImage" className="carousel-image" />
                        </LinkContainer>
                        <div className="carousel-description">
                            <h2>{book.bookTitle}</h2>
                            <h5>{book.author.name}</h5>
                        </div>
                    </Carousel.Item>
                ))}

            </Carousel>
        </>
    );
}
