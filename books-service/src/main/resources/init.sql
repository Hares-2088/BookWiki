drop table authors if exists;
create table authors (
                           id INT NOT NULL AUTO_INCREMENT,
                           authorid VARCHAR(255) NOT NULL UNIQUE,
                           name VARCHAR(255) NOT NULL,
                           description VARCHAR(255) NOT NULL,
                           pictureurl VARCHAR(255),
                           PRIMARY KEY (id)
);
drop table books if exists;
CREATE TABLE books (
                       id INT NOT NULL AUTO_INCREMENT,
                       bookId VARCHAR(255) NOT NULL,
                       bookTitle VARCHAR(255) NOT NULL,
                       releaseDate DATE NOT NULL,
                       genre VARCHAR(255) NOT NULL,
                       ISBN VARCHAR(255),
                       coverImageLink VARCHAR(255),
                       description VARCHAR(255),
                       authorid VARCHAR(255) NOT NULL,
                       PRIMARY KEY (id),
                       FOREIGN KEY (authorid) references authors(authorid)

);