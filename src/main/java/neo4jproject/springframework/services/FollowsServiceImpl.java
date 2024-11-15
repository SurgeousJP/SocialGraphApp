package neo4jproject.springframework.services;

import neo4jproject.springframework.domain.Follows;
import neo4jproject.springframework.domain.User;
import neo4jproject.springframework.repositories.FollowsRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class FollowsServiceImpl implements FollowsService {
    private FollowsRepository followsRepository;

    public FollowsServiceImpl(FollowsRepository followsRepository) {
        this.followsRepository = followsRepository;
    }

    @Override
    public List<Follows> listAll() {
        return null;
    }

    @Override
    public void followUser(User user, String userEmailFollow) {
        followsRepository.addFollows(user.getEmail(), userEmailFollow);
    }

    @Override
    public void unfollowUser(User user, String userEmailFollow) {
        followsRepository.deleteFollow(user.getEmail(), userEmailFollow);
    }

    @Override
    public boolean getMyFollows(String email, String myEmail) {
        return followsRepository.getMyFollows(email, myEmail).isEmpty();
    }
}
