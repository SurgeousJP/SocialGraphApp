package neo4jproject.springframework.services;

import neo4jproject.springframework.domain.Follows;
import neo4jproject.springframework.domain.User;

import java.util.Collection;
import java.util.List;

public interface FollowsService {
    List<Follows> listAll();

    void followUser(String userEmail, String userEmailFollow);

    void unfollowUser(String userEmail, String userEmailFollow);

    boolean isFollow(String email, String myEmail);
    List<Follows> getMyFollows(String email, String myEmail);
}
