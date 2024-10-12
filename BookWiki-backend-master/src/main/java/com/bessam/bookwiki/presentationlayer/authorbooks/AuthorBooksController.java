package com.bessam.bookwiki.presentationlayer.authorbooks;

import com.bessam.bookwiki.businesslayer.authorbooks.AuthorBooksService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/authors/{authorId}/books")
public class AuthorBooksController {
    private AuthorBooksService authorBooksService;

    public AuthorBooksController(AuthorBooksService authorBooksService) {
        this.authorBooksService = authorBooksService;
    }

    @GetMapping()
    public ResponseEntity<AuthorBooksResponseDTO> getAllBooksForAnAuthor(@PathVariable String authorId){
        return ResponseEntity.status(HttpStatus.OK).body(authorBooksService.getAllBooksByAuthorId(authorId));
    }
}
