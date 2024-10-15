import { Container, Row } from "react-bootstrap"
import BookCard from "./BookCard"
import {useState, useEffect} from 'react';
import AddBook from "./AddBook";
import { successToast } from "../utils/toasts";


export default function BookList(){

    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [authorOptions, setAuthorOptions] = useState(null);

    //Create a function to fetch all the books instead of reloading the page
    function getAllBooks(){
        (async() => {
            const response = await fetch("http://localhost:8080/api/v1/books",{
            method: "GET"
            });  

            const books = await response.json()
            console.log(books)
            setBooks(books)
            setIsLoading(false)
            console.log("Fetched All the books");
        })();
    }

    //getting all the books when opening the page
        //get all the authors to put them in my authors options
    useEffect(() => {
        (async () => {
            const authorResponse = await fetch("http://localhost:8080/api/v1/authors", {
                method: "GET"
            });

            const authors = await authorResponse.json()
            setAuthorOptions(authors)
        })();

        getAllBooks()
    }, [])
    if(isLoading){
        return <div><h1>Loading...</h1></div>
    }


    function addBook(bookTitle, coverImageLink, releaseDate, genre, isbn, description, authorid){

        var bookRequestDTO = {
            bookTitle : bookTitle,
            releaseDate : releaseDate,
            genre : genre,
            isbn : isbn, 
            coverImageLink : coverImageLink,
            description: description,
            authorId : authorid
        }

        fetch(`http://localhost:8080/api/v1/books`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookRequestDTO)
        })
        .then(async response => {
            const isJson = response.headers
            .get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            console.log("The book: " + bookTitle + " has been added");

            //check for error
            if(!response.ok){
                const error = (data && data.message) || response.status;
                console.log("post error occured");
                return Promise.reject(error);
            }
            //instead of refresh the page
            getAllBooks()
        })
    }

    function updateBook(updatedBook){

        var bookRequestDTO = {
            bookTitle: updatedBook.title, 
            releaseDate: updatedBook.releaseDate,
            genre: updatedBook.genre,
            isbn: updatedBook.isbn, 
            coverImageLink: updatedBook.coverImageLink, 
            description: updatedBook.description,
            authorId: updatedBook.authorId
        }

        fetch(`http://localhost:8080/api/v1/books/${updatedBook.bookId}`,{
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookRequestDTO)
        })
        .then(async (response) => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && (await response.json());
    
            // Check for error
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                console.log("Post error occurred");
                return Promise.reject(error);
            }
    
            // Check if data is not undefined before accessing its properties
            if (data) {
                console.log("A book has been updated. Here are the new data: " + data.bookTitle);
            } else {
                console.log("A book has been updated.");
            }
            //instead of refresh the page
            getAllBooks()
        })

    }

    async function deleteBookHandler(bookId) {
        await fetch(`http://localhost:8080/api/v1/books/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');

            if (response.status === 204) {
                getAllBooks()
                successToast("Delete Successful")
            }
            
        })
        .catch(function (error) {
            console.log("an unknown error occured")
            return Promise.reject(error)
        })
    }

    return(
       <Container fluid className="background">
        <h1 className="title">Books</h1>
        <AddBook addBook={addBook} authorList={authorOptions}/>
        <Row className='justify-content-evenly'>

            {books && books.map((book) => 
                <BookCard key={book.bookId} 
                book={book} 
                updateBook={updateBook}
                authorOptions={authorOptions}
                deleteBookHandler={deleteBookHandler}/>
            )}

        </Row>
       </Container>
    )
}
