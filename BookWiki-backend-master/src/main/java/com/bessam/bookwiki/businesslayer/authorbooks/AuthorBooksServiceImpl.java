package com.bessam.bookwiki.businesslayer.authorbooks;

import com.bessam.bookwiki.dataaccesslayer.author.Author;
import com.bessam.bookwiki.dataaccesslayer.author.AuthorRepository;
import com.bessam.bookwiki.dataaccesslayer.book.Book;
import com.bessam.bookwiki.dataaccesslayer.book.BookRepository;
import com.bessam.bookwiki.presentationlayer.author.AuthorResponseDTO;
import com.bessam.bookwiki.presentationlayer.authorbooks.AuthorBooksResponseDTO;
import com.bessam.bookwiki.presentationlayer.book.BookResponseDTO;
import com.bessam.bookwiki.utils.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorBooksServiceImpl implements AuthorBooksService{
private AuthorRepository authorRepository;
private BookRepository bookRepository;

    public AuthorBooksServiceImpl(AuthorRepository authorRepository, BookRepository bookRepository) {
        this.authorRepository = authorRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public AuthorBooksResponseDTO getAllBooksByAuthorId(String authorId) {
        Author foundAuthor = authorRepository.findAuthorByAuthorId(authorId);

        if (foundAuthor ==null){
            throw new NotFoundException("Unknown author id: " + authorId);
        }

        AuthorBooksResponseDTO authorBooksResponseDTO = new AuthorBooksResponseDTO();
        BeanUtils.copyProperties(foundAuthor, authorBooksResponseDTO);

        List<Book> bookList = bookRepository.findBooksByAuthor_AuthorId(authorId);

        List<BookResponseDTO> bookResponseDTOS = new ArrayList<>();

        for (Book book : bookList) {
            BookResponseDTO bookResponseDTO = new BookResponseDTO();
            BeanUtils.copyProperties(book, bookResponseDTO);

            AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
            BeanUtils.copyProperties(book.getAuthor(), authorResponseDTO);
            bookResponseDTO.setAuthor(authorResponseDTO);
            bookResponseDTOS.add(bookResponseDTO);
        }
        authorBooksResponseDTO.setBooks(bookResponseDTOS);

        return authorBooksResponseDTO;
    }
}
