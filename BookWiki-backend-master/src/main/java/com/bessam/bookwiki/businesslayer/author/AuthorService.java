package com.bessam.bookwiki.businesslayer.author;

import com.bessam.bookwiki.presentationlayer.author.AuthorRequestDTO;
import com.bessam.bookwiki.presentationlayer.author.AuthorResponseDTO;

import java.util.List;

public interface AuthorService {
    List<AuthorResponseDTO> getAllAuthors();
    AuthorResponseDTO getAuthorById(String authorId);
    AuthorResponseDTO addAuthor(AuthorRequestDTO authorRequestDTO);

    AuthorResponseDTO updateAuthor(AuthorRequestDTO authorRequestDTO, String authorId);
    void deleteAuthor(String authorId);
}
