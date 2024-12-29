package neo4jproject.springframework.domain;

import org.springframework.data.neo4j.core.schema.*;

@Node("Post")
public class Post {
    @Id
    @GeneratedValue
    private Long id;
    @Property(name = "description")
    private String description;
    @Property(name = "likes")
    private Integer likes;
    @Property(name = "email")
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Post(String description, Integer likes,
                String email) {
        this.id = null;
        this.description = description;
        this.likes = likes;
        this.email = email;
    }

    public Post withId(Long id) {
        if (this.id.equals(id)) {
            return this;
        } else {
            return new Post(this.description, this.likes, this.email);
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }

}
