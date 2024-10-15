package com.bessam.bookwiki.businesslayer.authorbooks;

import com.bessam.bookwiki.presentationlayer.authorbooks.AuthorBooksResponseDTO;

public interface AuthorBooksService {
    AuthorBooksResponseDTO getAllBooksByAuthorId(String directorId);
}
