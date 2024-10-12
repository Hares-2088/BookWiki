package com.bessam.bookwiki.businesslayer.book;

import com.bessam.bookwiki.presentationlayer.book.BookRequestDTO;
import com.bessam.bookwiki.presentationlayer.book.BookResponseDTO;

import java.util.List;

public interface BookService {
    List<BookResponseDTO> getAllBooks();
    BookResponseDTO getBookById(String bookId);
    BookResponseDTO addBook(BookRequestDTO bookRequestDTO);
    BookResponseDTO updateBook(BookRequestDTO bookRequestDTO, String bookId);
    void deleteBook(String bookId);
}
