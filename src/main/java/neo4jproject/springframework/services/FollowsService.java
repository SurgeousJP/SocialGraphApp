package neo4jproject.springframework.services;

import neo4jproject.springframework.domain.Follows;
import neo4jproject.springframework.domain.User;

import java.util.Collection;
import java.util.List;

public interface FollowsService {
    List<Follows> listAll();

    void followUser(User user, String userEmailFollow);

    void unfollowUser(User user, String userEmailFollow);

    boolean getMyFollows(String email, String myEmail);
}
