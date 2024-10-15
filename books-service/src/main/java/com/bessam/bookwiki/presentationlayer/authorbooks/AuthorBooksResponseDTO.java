package com.bessam.bookwiki.presentationlayer.authorbooks;

import com.bessam.bookwiki.dataaccesslayer.book.Book;
import com.bessam.bookwiki.presentationlayer.book.BookResponseDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AuthorBooksResponseDTO {

    private String authorId;

    private String name;

    private String description;

    private List<BookResponseDTO> books;
}
