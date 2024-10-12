package com.bessam.bookwiki.businesslayer.book;

import com.bessam.bookwiki.dataaccesslayer.author.Author;
import com.bessam.bookwiki.dataaccesslayer.author.AuthorRepository;
import com.bessam.bookwiki.dataaccesslayer.book.Book;
import com.bessam.bookwiki.dataaccesslayer.book.BookRepository;
import com.bessam.bookwiki.presentationlayer.author.AuthorResponseDTO;
import com.bessam.bookwiki.presentationlayer.book.BookRequestDTO;
import com.bessam.bookwiki.presentationlayer.book.BookResponseDTO;
import com.bessam.bookwiki.utils.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class BookServiceImpl implements BookService{

    
    private BookRepository bookRepository;

    private AuthorRepository authorRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public List<BookResponseDTO> getAllBooks() {
        List<Book> bookEntities = bookRepository.findAll();

        //Convert list of book  entities to list of Book ResponseDTO
        List<BookResponseDTO> bookResponseDTOS = new ArrayList<>();

        for (Book book : bookEntities) {

            BookResponseDTO bookResponseDTO = new BookResponseDTO();
            BeanUtils.copyProperties(book, bookResponseDTO);

            AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
            BeanUtils.copyProperties(book.getAuthor(), authorResponseDTO);
            bookResponseDTO.setAuthor(authorResponseDTO);

            bookResponseDTOS.add(bookResponseDTO);
        }

        return bookResponseDTOS;
    }

    @Override
    public BookResponseDTO getBookById(String bookId) {
        Book foundBook = bookRepository.findBookByBookId(bookId);

        if (foundBook ==null){
            throw new NotFoundException("Unknown author id: " + bookId);
        }

        //convert saved book into a DTO
        BookResponseDTO bookResponseDTO = new BookResponseDTO();

        //create an author dto to put in the response
        AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
        BeanUtils.copyProperties(foundBook.getAuthor(), authorResponseDTO);

        bookResponseDTO.setAuthor(authorResponseDTO);
        BeanUtils.copyProperties(foundBook, bookResponseDTO);
        return bookResponseDTO;
    }

    @Override
    public BookResponseDTO addBook(BookRequestDTO bookRequestDTO) {
        Author foundAuthor = authorRepository.findAuthorByAuthorId(bookRequestDTO.getAuthorId());

        if (foundAuthor == null){
            throw new NotFoundException("Unknown author id: " + bookRequestDTO.getAuthorId());
        }

        Book book = new Book();
        BeanUtils.copyProperties(bookRequestDTO, book);
        book.setBookId(UUID.randomUUID().toString());

        book.setAuthor(foundAuthor);

        Book savedBook = bookRepository.save(book);

        BookResponseDTO bookResponseDTO = new BookResponseDTO();
        AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
        BeanUtils.copyProperties(foundAuthor, authorResponseDTO);

        BeanUtils.copyProperties(savedBook, bookResponseDTO);
        bookResponseDTO.setAuthor(authorResponseDTO);

        return bookResponseDTO;
    }

    @Override
    public BookResponseDTO updateBook(BookRequestDTO bookRequestDTO, String bookId) {

        Book  foundBook  = bookRepository.findBookByBookId(bookId);

        if (foundBook  == null){
            throw new NotFoundException("Unknown book  id: " + bookId);
        }
        //convert book RequestDTO to an entity
        Book  book  = new Book ();
        BeanUtils.copyProperties(bookRequestDTO, book );
        book .setBookId(foundBook.getBookId());
        book .setId(foundBook .getId());

        Author author = authorRepository.findAuthorByAuthorId(bookRequestDTO.getAuthorId());
        book .setAuthor(author);

        //save book  entity to book  repository
        Book  savedBook  = bookRepository.save(book );

        //convert savedBook  (entity) to Book ResponseDTO
        BookResponseDTO bookResponseDTO = new BookResponseDTO();

        AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
        BeanUtils.copyProperties(author, authorResponseDTO);

        bookResponseDTO.setAuthor(authorResponseDTO);
        BeanUtils.copyProperties(savedBook , bookResponseDTO);

        return bookResponseDTO;
    }

    @Override
    public void deleteBook(String bookId) {
        Book foundBook = bookRepository.findBookByBookId(bookId);

        if (foundBook == null){
            throw new NotFoundException("Unknown book id: " + bookId);
        }

        bookRepository.delete(foundBook);
    }
}
