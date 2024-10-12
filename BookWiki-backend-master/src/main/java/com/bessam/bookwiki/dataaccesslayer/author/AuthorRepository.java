package com.bessam.bookwiki.dataaccesslayer.author;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Integer> {
    Author findAuthorByAuthorId(String authorId);
}
