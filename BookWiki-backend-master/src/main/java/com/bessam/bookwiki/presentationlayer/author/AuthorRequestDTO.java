package com.bessam.bookwiki.presentationlayer.author;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthorRequestDTO {

    private String name;

    private String description;

    private String pictureURL;
}
