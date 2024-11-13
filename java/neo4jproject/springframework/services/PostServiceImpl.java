package neo4jproject.springframework.services;

import neo4jproject.springframework.domain.Post;
import neo4jproject.springframework.domain.User;
import neo4jproject.springframework.repositories.PostRepository;
import neo4jproject.springframework.repositories.PostedRepository;
import neo4jproject.springframework.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class PostServiceImpl implements  PostService{
    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PostedRepository postedRepository;

    public PostServiceImpl(PostRepository postRepository
            , UserRepository userRepository
            , PostedRepository postedRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.postedRepository = postedRepository;
    }

    @Override
    public List<Post> listAll() {
        return null;
    }

    @Override
    public Collection<Post> getAllPosts() {
        return postRepository.getAllPosts();
    }

    @Override
    public void addPost(Post post) {
        User user = userRepository.getByEmail(post.getEmail());
        Long postId = postRepository.addPostAndReturnId(post.getDescription(), post.getLikes(), post.getLatitude(), post.getLongitude(),
                post.getLocation(), post.getEmail());
        postedRepository.addPosted(post.getEmail(), postId);
    }

    @Override
    public Collection<Post> getMyFollowersPosts(String email) {
        return postRepository.findMyFollowersPost(email);
    }

    @Override
    public Collection<Post> findLikedPosts(String email) {
        return postRepository.findLikedPosts(email);
    }
}
