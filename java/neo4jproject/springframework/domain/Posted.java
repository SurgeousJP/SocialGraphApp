package neo4jproject.springframework.domain;

import org.springframework.data.neo4j.core.schema.*;

@RelationshipProperties
public class Posted {
    @Id
    @GeneratedValue
    private Long id;

    @TargetNode
    private Post post;

    public Posted(User user, Post post) {
        this.id = null;
        this.post = post;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
