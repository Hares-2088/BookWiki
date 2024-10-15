package com.bessam.bookwiki.presentationlayer.book;

import com.bessam.bookwiki.presentationlayer.author.AuthorResponseDTO;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class BookResponseDTO {

    private String bookId; // public id

    private String	bookTitle;

    private Date releaseDate;

    private String genre;

    private String ISBN; //International Standard Book Number

    private String coverImageLink;

    private String description;

    private AuthorResponseDTO author;
}
