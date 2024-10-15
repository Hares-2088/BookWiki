import { Container, Row } from "react-bootstrap"
import AuthorCard from "./AuthorCard"
import {useState, useEffect} from 'react';
import { errorToast, successToast } from "../utils/toasts";
import AddAuthor from "./AddAuthor";


export default function AuthorList(){

    const [authors, setAuthors] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    function getAllAuthors(){
        (async() => {
            const authorResponse = await fetch("http://localhost:8080/api/v1/authors",{
            method: "GET"
            });  

            const authors = await authorResponse.json()
            console.log(authors)
            setAuthors(authors)
            setIsLoading(false)
            console.log("Fetched All the authors");
        })();
    }

    useEffect(() => {
        getAllAuthors();
    }, [])

    if(isLoading){
        return <div><h1>Loading...</h1></div>
    }

    async function deleteAuthorHandler(author) {
        await fetch(`http://localhost:8080/api/v1/authors/${author.authorId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');

            if (response.status === 204) {
                getAllAuthors()
                successToast("Delete Successful")
            }
            if(response.status === 422){
            
            getAllAuthors()
            errorToast("You can't delete an authors that has books")
            }
        })
        .catch(function (error) {
            console.log("an unknown error occured")
            return Promise.reject(error)
        })
    }

    function updateAuthor(updatedAuthor){

        var authorRequestDTO = {
            name: updatedAuthor.name, 
            description: updatedAuthor.description,
            pictureURL: updatedAuthor.pictureURL
        }

        fetch(`http://localhost:8080/api/v1/authors/${updatedAuthor.authorId}`,{
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
            if(!response.ok){
                const error = (data && data.message) || response.status;
                console.log("post error occured");
                return Promise.reject(error);
            }
            //instead of refresh the page
            getAllAuthors()
        })
    }

    function addAuthor(name, pictureURL, description){

        var authorRequestDTO = {
            name : name,
            description: description,
            pictureURL : pictureURL
        }

        fetch(`http://localhost:8080/api/v1/authors`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authorRequestDTO)
        })
        .then(async response => {
            const isJson = response.headers
            .get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            //check for error
            if(!response.ok){
                const error = (data && data.message) || response.status;
                console.log("post error occured");
                return Promise.reject(error);
            }
            //instead of refresh the page
            getAllAuthors()
        })
    }

    return(
        
       <Container fluid className="background">
        <h1 className="title">Authors</h1>
        <AddAuthor addAuthor={addAuthor} />
        <Row className='justify-content-evenly'>

            {authors && authors.map((author) => 
                
                <AuthorCard key={author.authorId} 
                author={author}
                deleteAuthorHandler={deleteAuthorHandler} 
                updateAuthor={updateAuthor}/>

            )}

        </Row>
       </Container>

    )
}