package com.bessam.bookwiki.presentationlayer.author;

import com.bessam.bookwiki.businesslayer.author.AuthorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/v1/authors")
public class AuthorController {

    AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }
    @GetMapping()
    public ResponseEntity<List<AuthorResponseDTO>> getAllAuthors(){
        return ResponseEntity.status(HttpStatus.FOUND).body(authorService.getAllAuthors());
    }

    @GetMapping("/{authorId}")
    public ResponseEntity<AuthorResponseDTO> getAuthorById(@PathVariable String authorId){
        return ResponseEntity.status(HttpStatus.FOUND).body(authorService.getAuthorById(authorId));
    }

    @PostMapping()
    public ResponseEntity<AuthorResponseDTO> addAuthor(@RequestBody AuthorRequestDTO authorRequestDTO){

        return ResponseEntity.status(HttpStatus.CREATED).body(authorService.addAuthor(authorRequestDTO));
    }

    @PutMapping("/{authorId}")
    public ResponseEntity<AuthorResponseDTO> updateAuthor(@RequestBody AuthorRequestDTO authorRequestDTO,
                                                              @PathVariable String authorId){
        return ResponseEntity.status(HttpStatus.OK).body(authorService.updateAuthor(authorRequestDTO, authorId));
    }

    @DeleteMapping("/{authorId}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable String authorId){
        authorService.deleteAuthor(authorId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
    }
}
