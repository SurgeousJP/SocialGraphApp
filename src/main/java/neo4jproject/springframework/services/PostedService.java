package neo4jproject.springframework.services;

import neo4jproject.springframework.domain.Posted;
import neo4jproject.springframework.domain.User;

import java.util.List;

public interface PostedService {
    List<Posted> listAll();

    void addPostedLink(String email, Long postId);
}
