package neo4jproject.springframework.services;

import neo4jproject.springframework.domain.Liked;
import neo4jproject.springframework.domain.User;

import java.util.List;

public interface LikedService {
    List<Liked> listAll();

    void addLikedPost(String likeEmail, Long postId);
    void dislikedPost(String likeEmail, Long postId);
}
