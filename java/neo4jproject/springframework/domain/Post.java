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
    @Property(name = "latitude")
    private Double latitude;
    @Property(name = "longitude")
    private Double longitude;
    @Property(name = "location")
    private String location;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Post(String description, Integer likes, Double latitude, Double longitude,
                String email, String location) {
        this.id = null;
        this.description = description;
        this.likes = likes;
        this.latitude = latitude;
        this.longitude = longitude;
        this.location = location;
        this.email = email;
    }

    public Post withId(Long id) {
        if (this.id.equals(id)) {
            return this;
        } else {
            return new Post(this.description, this.likes, this.latitude, this.longitude, this.email, this.location);
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

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}
