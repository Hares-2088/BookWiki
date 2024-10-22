package com.bessam.bookwiki.presentationlayer.book;

import com.bessam.bookwiki.businesslayer.book.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/books")
public class BookController {
    BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<BookResponseDTO>> getAllBooks(){
        return ResponseEntity.status(HttpStatus.FOUND).body(bookService.getAllBooks());
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<BookResponseDTO> getBookByID(@PathVariable String bookId) {
        return ResponseEntity.status(HttpStatus.FOUND).body(bookService.getBookById(bookId));
    }

    @PostMapping
    public ResponseEntity<BookResponseDTO> addBook(@RequestBody BookRequestDTO bookRequestDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.addBook(bookRequestDTO));
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<BookResponseDTO> updateBook( @RequestBody BookRequestDTO bookRequestDTO, @PathVariable String bookId){
        return ResponseEntity.status(HttpStatus.OK).body(bookService.updateBook(bookRequestDTO, bookId));
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable String bookId){
        bookService.deleteBook(bookId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
