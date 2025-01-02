package neo4jproject.springframework.domain;

import java.util.List;

public class PostDTO {
    private Post post;
    private List<User> likedUsers;

    // Constructor, Getters, Setters
    public PostDTO(Post post, List<User> likedUsers) {
        this.post = post;
        this.likedUsers = likedUsers;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public List<User> getLikedUsers() {
        return likedUsers;
    }

    public void setLikedUsers(List<User> likedUsers) {
        this.likedUsers = likedUsers;
    }
}

