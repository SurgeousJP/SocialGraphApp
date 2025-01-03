package neo4jproject.springframework.repositories;

import neo4jproject.springframework.domain.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Collection;


public interface UserRepository extends Neo4jRepository<User, Long> {

    @Query("MATCH (n:User) return n")
    Collection<User> getAllUsers();

    @Query("MATCH (n:User)\n" +
            "WHERE n.email = $email\n" +
            "return n")
    User getByEmail(@Param("email") String email);

    @Query("CREATE(User:User {email: $email, imageUrl: $imageUrl, firstName:$firstName, lastName:$lastName, password: $password})")
    void addUser(@Param("email") String email, @Param("imageUrl") String imageUrl,
                 @Param("firstName") String firstName, @Param("lastName") String lastName, @Param("password") String password);

    @Query("CREATE(User:User {email: $email, imageUrl: $imageUrl, firstName:$firstName, lastName:$lastName, password: $password})")
    void addUserStart(@Param("email") String email, @Param("imageUrl") String imageUrl,
                      @Param("firstName") String firstName, @Param("lastName") String lastName, @Param("password") String password);

    @Query("MATCH (n:User)\n" +
            "WHERE n.email = $email\n" +
            "DETACH DELETE n")
    void deleteUser(@Param("email") String email);

    @Query("MATCH (n:User)\n" +
            "WHERE n.email = $email\n" +
            "SET n={email: $email, imageUrl: $imageUrl, firstName:$firstName, lastName:$lastName, password: $password}")
    void updateUser(@Param("email") String email
            , @Param("imageUrl") String imageUrl, @Param("firstName") String firstName
            , @Param("lastName") String lastName, @Param("password") String password);

    @Query("MATCH (n:User) DETACH DELETE n")
    void deleteAllFirma();

    @Query("MATCH(n:User{email: $mail})-[r:Follows]->(p:User) return p")
    Collection<User> findAllMyFollowers(@Param("mail") String mail);

    @Query("MATCH (u:User {email: $email})<-[f:Follows]-(p:User) RETURN DISTINCT (p)")
    Collection<User> getAllFollowersOfUser(@Param("email") String email);

    @Query("MATCH (u:User)-[:Liked]->(p:Post)\n" +
            "WHERE id(p) = $postId\n" +
            "RETURN u")
    Collection<User> getUsersWhoLikePost(@Param("postId") Long postId);
}
