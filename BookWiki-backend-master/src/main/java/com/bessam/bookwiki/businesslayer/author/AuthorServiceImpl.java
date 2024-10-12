package com.bessam.bookwiki.businesslayer.author;

import com.bessam.bookwiki.dataaccesslayer.author.Author;
import com.bessam.bookwiki.dataaccesslayer.author.AuthorRepository;
import com.bessam.bookwiki.presentationlayer.author.AuthorRequestDTO;
import com.bessam.bookwiki.presentationlayer.author.AuthorResponseDTO;
import com.bessam.bookwiki.utils.exceptions.InUseException;
import com.bessam.bookwiki.utils.exceptions.NotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AuthorServiceImpl implements AuthorService{

        private AuthorRepository authorRepository;

        public AuthorServiceImpl(AuthorRepository authorRepository) {
            this.authorRepository = authorRepository;
        }

        @Override
        public List<AuthorResponseDTO> getAllAuthors() {
            List<Author> authorEntities = authorRepository.findAll();

            //Convert list of author entities to list of AuthorResponseDTO
            List<AuthorResponseDTO> authorResponseDTOS = new ArrayList<>();

            for (Author author : authorEntities) {

                AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
                BeanUtils.copyProperties(author, authorResponseDTO);

                authorResponseDTOS.add(authorResponseDTO);
            }

            return authorResponseDTOS;
        }

        @Override
        public AuthorResponseDTO getAuthorById(String authorId) {
            Author foundAuthor = authorRepository.findAuthorByAuthorId(authorId);

            if (foundAuthor ==null){
                throw new NotFoundException("Unknown author id: " + authorId);
            }

            //convert savedAuthor (entity) to AuthorResponseDTO
            AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
            BeanUtils.copyProperties(foundAuthor, authorResponseDTO);

            return authorResponseDTO;
        }

        @Override
        public AuthorResponseDTO addAuthor(AuthorRequestDTO authorRequestDTO) {
            //convert author requestDTO to an entity
            Author author = new Author();
            BeanUtils.copyProperties(authorRequestDTO, author);
            author.setAuthorId(UUID.randomUUID().toString());

            //save author entity to database via repository
            Author savedAuthor = authorRepository.save(author);

            //convert savedAuthor (entity) to AuthorResponseDTO
            AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
            BeanUtils.copyProperties(savedAuthor, authorResponseDTO);

            return authorResponseDTO;
        }

        @Override
        public AuthorResponseDTO updateAuthor(AuthorRequestDTO authorRequestDTO, String authorId) {
            //find the author based on the id using the repository and putting it in a local object of author
            Author foundAuthor = authorRepository.findAuthorByAuthorId(authorId);

            // throw the exception if the id doesn't exist
            if (foundAuthor == null){
                throw new NotFoundException("Unknown author id: " + authorId);
            }

            //convert authorRequestDTO to an entity
            Author author = new Author();
            BeanUtils.copyProperties(authorRequestDTO, author);
            author.setAuthorId(foundAuthor.getAuthorId());
            author.setId(foundAuthor.getId());

            //save author entity to author repository and the database
            Author savedAuthor = authorRepository.save(author);

            //convert savedAuthor (entity) to AuthorResponseDTO to show it in postman
            AuthorResponseDTO authorResponseDTO = new AuthorResponseDTO();
            BeanUtils.copyProperties(savedAuthor, authorResponseDTO);

            return authorResponseDTO;
        }

        @Override
        public void deleteAuthor(String authorId) {
            Author foundAuthor = authorRepository.findAuthorByAuthorId(authorId);

            if (foundAuthor ==null){
                throw new NotFoundException("Unknown author id: " + authorId);
            }

            try {
                authorRepository.delete(foundAuthor);

            }
            catch (DataIntegrityViolationException ex){
                throw new InUseException("Cannot delete author with authorId: " + authorId +
                        " as it is currently assigned to one or more book");
            }
        }
}



