package neo4jproject.springframework.services;

import neo4jproject.springframework.domain.Post;
import neo4jproject.springframework.domain.User;

import java.util.Collection;
import java.util.List;

public interface PostService {
    List<Post> listAll();

    Collection<Post> getAllPosts();

    void addPost(Post post);

    Collection<Post> getMyFollowersPosts(String email);

    Collection<Post> findLikedPosts(String email);
}
