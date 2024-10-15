package com.bessam.bookwiki.dataaccesslayer.author;


import com.bessam.bookwiki.dataaccesslayer.book.Book;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name="authors")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;// private id

    @Column(name = "authorid")
    private String authorId;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "pictureURL")
    private String pictureURL;

    @OneToMany(mappedBy = "author")
    private Set<Book> books;
}
