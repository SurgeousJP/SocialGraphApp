package neo4jproject.springframework.repositories;

import neo4jproject.springframework.domain.Liked;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.data.repository.query.Param;

public interface LikedRepository extends Neo4jRepository<Liked, Long> {
    @Query("MATCH\n" +
            "(a:User),\n" +
            "(b:Post)\n" +
            "WHERE a.email = $likeUser AND id(b) = $postId\n" +
            "MERGE (a)-[r:Liked]->(b)\n" +
            "RETURN type(r)")
    void addLiked(@Param("likeUser")String likeEmail, @Param("postId")Long postId);

    @Query("MATCH (n:Post) WHERE id(n) = $nodeId SET n.likes = n.likes + 1")
    void incrementLikes(@Param("nodeId") Long nodeId);

    @Query("MATCH\n" +
            "(a:User)-[r:Liked]->(b:Post)\n" +
            "WHERE a.email = $likeUser AND id(b) = $postId\n" +
            "DELETE r\n" +
            "RETURN COUNT(r) > 0") // Returns true if the relationship was removed
    void removeLiked(@Param("likeUser") String likeEmail, @Param("postId") Long postId);

    @Query("MATCH (n:Post) WHERE id(n) = $nodeId SET n.likes = n.likes - 1")
    void decrementLikes(@Param("nodeId") Long nodeId);
}
