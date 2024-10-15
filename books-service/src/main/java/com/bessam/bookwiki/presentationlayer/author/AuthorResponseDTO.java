package com.bessam.bookwiki.presentationlayer.author;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthorResponseDTO {

    private String authorId;

    private String name;

    private String description;

    private String pictureURL;
}
