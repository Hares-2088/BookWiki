package com.bessam.bookwiki.presentationlayer.book;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class BookRequestDTO {

    private String	bookTitle;

    private Date releaseDate;

    private String genre;

    private String ISBN; //International Standard Book Number

    private String coverImageLink;

    private String description;

    private String authorId;
}
