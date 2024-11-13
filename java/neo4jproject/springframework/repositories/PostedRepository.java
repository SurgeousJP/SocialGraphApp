package neo4jproject.springframework.repositories;

import neo4jproject.springframework.domain.Post;
import neo4jproject.springframework.domain.Posted;
import neo4jproject.springframework.domain.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

public interface PostedRepository extends Neo4jRepository<Posted, Long> {
    @Query("MATCH\n" +
            "(a:User),\n" +
            "(b:Post)\n" +
            "WHERE a.email = $email AND id(b) = $postId\n" +
            "MERGE (a)-[r:Posted]->(b)\n" +
            "RETURN type(r)")
    void addPosted(@Param("email") String email, @Param("postId") Long postId);

    @Query("MATCH (a:User{email : $email})-[p:Posted]->(b:Post) return p, a, b")
    void getPostedLinks(@Param("email") String email);

    @Query("MATCH (a:User{email : $email})-[p:Posted]->(b:Post) DETACH DELETE b")
    void deleteUsersPosts(@Param("email") String email);
}
