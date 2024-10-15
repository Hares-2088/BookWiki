import AddBook from '../components/AddBook';
import BookCarousel from '../components/BookCarousel';

export default function HomePage() {

    function addBook(bookTitle, coverImageLink, releaseDate, genre, isbn, description, authorid) {

        var bookRequestDTO = {
            bookTitle: bookTitle,
            releaseDate: releaseDate,
            genre: genre,
            isbn: isbn,
            coverImageLink: coverImageLink,
            description: description,
            authorId: authorid
        }

        fetch(`http://localhost:8080/api/v1/books`, {
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

                //check for error
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    console.log("post error occured");
                    return Promise.reject(error);
                }
                window.location.reload();
            })
    }

    return (
        <div className="home-background">

            <div className="Fantasy-Carousel-container">

                <div className="d-flex justify-content-between align-items-center" style={{ width: '100%' }}>
                    <div style={{ textAlign: 'left' }}>
                        <AddBook addBook={addBook} />
                    </div>
                    <div className="flex-grow-1 text-center">
                        <h1 className="title" style={{ marginTop: '3rem', marginBottom: '3rem' }}>
                            Our Favorites
                        </h1>
                    </div>
                </div>
                <div className="carousel-container-first">
                    <BookCarousel genre="Fantasy" />
                </div>
                <hr className="HomePage_Line mt-3" />
            </div>

            <div className="YoungAdult-Carousel-container">
                <div className="carousel-container">
                    <BookCarousel genre="Young Adult" />
                </div>
                <hr className="HomePage_Line" />
            </div>

            <div className="NonFiction-Carousel-container">
                <div className="carousel-container">
                    <BookCarousel genre="Non-Fiction" />
                </div>
                <hr className="HomePage_Line" />
            </div>

            <div className="Thriller-Carousel-container">
                <div className="carousel-container">
                    <BookCarousel genre="Thriller" />
                </div>
                <hr className="HomePage_Line" />
            </div>

            <div className="Romance-Carousel-container">
                <div className="carousel-container">
                    <BookCarousel genre="Romance" />
                </div>
                <hr className="HomePage_Line" />
            </div>

        </div>
    );
}