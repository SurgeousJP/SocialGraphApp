package neo4jproject.springframework.repositories;


import neo4jproject.springframework.domain.Follows;
import neo4jproject.springframework.domain.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Collection;
import java.util.List;
import java.util.NoSuchElementException;

public interface FollowsRepository extends Neo4jRepository<Follows, Long> {
    @Query("MATCH (a:User {email: $user1}) " +
        "MATCH (b:User {email: $user2}) " +
        "CREATE (a)-[r:Follows {following: b.email}]->(b) " +
        "RETURN type(r)")
    void addFollows(@Param("user1") String email1, @Param("user2") String email2);

    @Query("MATCH(n:User {email: $user1})-[r:Follows {following: $user2}]->() DELETE (r)")
    void deleteFollow(@Param("user1")String email, @Param("user2")String userEmailFollow);

    @Query("MATCH (n:User {email: $user2})-[r:Follows {following: $user1}] ->() RETURN COUNT(r)")
    Long getMyFollows(@Param("user1") String email, @Param("user2") String myEmail);
}
