package com.bessam.bookwiki.dataaccesslayer.book;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Book findBookByBookId(String bookId);

    List<Book>  findBooksByAuthor_AuthorId(String authorId);
}
