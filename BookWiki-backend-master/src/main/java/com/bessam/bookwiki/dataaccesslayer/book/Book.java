package com.bessam.bookwiki.dataaccesslayer.book;

import com.bessam.bookwiki.dataaccesslayer.author.Author;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name="books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // private id

    @Column(name = "bookid")
    private String bookId; // public id

    @Column(name= "booktitle")
    private String	bookTitle;

    @Column(name= "releasedate")
    private Date releaseDate;

    @Column(name= "genre")
    private String genre;

    @Column(name= "isbn")
    private String ISBN; //International Standard Book Number

    @Column(name= "coverimagelink")
    private String coverImageLink;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "authorid", referencedColumnName = "authorid")
    private Author author;
}
