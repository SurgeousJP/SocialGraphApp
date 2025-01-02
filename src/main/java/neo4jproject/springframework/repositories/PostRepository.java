package neo4jproject.springframework.repositories;

import neo4jproject.springframework.domain.Post;
import neo4jproject.springframework.domain.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;

public interface PostRepository extends Neo4jRepository<Post, Long> {
    @Query("CREATE(Post:Post {description: $description, likes: $likes, email:$email})")
    void addPost(@Param("description") String description,
                 @Param("likes") Integer likes,
                 @Param("email") String email);

    @Query("CREATE (p:Post {description: $description, likes: $likes, email: $email}) RETURN id(p)")
    Long addPostAndReturnId(@Param("description") String description,
                            @Param("likes") Integer likes,
                            @Param("email") String email);

    @Query("MATCH (n:Post)\n" +
            "WHERE id(b) = $postId\n" +
            "return n")
    Post getById(@Param("postId") Long postId);

    @Query("MATCH (n:Post) RETURN DISTINCT n")
    Collection<Post> getAllPosts();

    @Query("MATCH(n:User{email: $mail})--(p:User)--(d:Post) RETURN DISTINCT d")
    Collection<Post> findMyFollowersPost(@Param("mail") String email);

    @Query("MATCH(n:User{email: $mail})-[l:Liked]->(d:Post) RETURN DISTINCT d")
    Collection<Post> findLikedPosts(@Param("mail") String email);

    @Query("MATCH (a: User)-[r:Posted]->(b: Post) "
            + "WHERE a.email = $mail "
            + "RETURN b")
    Collection<Post> getAllPostsByMail (@Param("mail") String email);
}
