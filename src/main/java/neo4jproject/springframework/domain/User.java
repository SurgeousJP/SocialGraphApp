package neo4jproject.springframework.domain;

import org.springframework.data.neo4j.core.schema.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Node("User")
public class User {

    @Id
    @GeneratedValue
    private Long id;
    @Property(name = "email")
    private String email;
    @Property(name = "imageUrl")
    private String imageUrl;
    @Property(name = "firstName")
    private String firstName;
    @Property(name = "lastName")
    private String lastName;

    @Property(name = "password")
    private String password;

    @Relationship(type = "Follows", direction = Relationship.Direction.OUTGOING)
    private List<User> following;

    @Relationship(type = "Liked", direction = Relationship.Direction.OUTGOING)
    private List<Post> likedPosts;

    @Relationship(type = "Posted", direction = Relationship.Direction.OUTGOING)
    private List<Post> myPosts;

    public User(String email,
                String imageUrl, String firstName,
                String lastName, String password, List<User> following, List<Post> likedPosts, List<Post> myPosts) {
        this.id = null;
        this.email = email;
        this.imageUrl = imageUrl;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.following = following;
        this.likedPosts = likedPosts;
        this.myPosts = myPosts;
    }

    public User withId(Long id) {
        if (this.id.equals(id)) {
            return this;
        } else {
            return new User(this.email, this.imageUrl, this.firstName,
                    this.lastName, this.password, this.following, this.likedPosts,
                    this.myPosts);
        }
    }

    public List<User> getFollowing() {
        return following;
    }

    public void setFollowing(List<User> following) {
        this.following = following;
    }

    public List<Post> getLikedPosts() {
        return likedPosts;
    }

    public void setLikedPosts(List<Post> likedPosts) {
        this.likedPosts = likedPosts;
    }

    public List<Post> getMyPosts() {
        return myPosts;
    }

    public void setMyPosts(List<Post> myPosts) {
        this.myPosts = myPosts;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setPassword(String newPassword) {
        this.password = newPassword;
    }

    public String getPassword() {
        return password;
    }
}
