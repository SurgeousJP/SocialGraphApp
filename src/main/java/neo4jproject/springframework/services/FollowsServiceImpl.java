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
    public void followUser(String userEmail, String userEmailFollow) {
        followsRepository.addFollows(userEmail, userEmailFollow);
    }

    @Override
    public void unfollowUser(String userEmail, String userEmailFollow) {
        followsRepository.deleteFollow(userEmail, userEmailFollow);
    }

    @Override
    public boolean isFollow(String email, String myEmail) {
        return followsRepository.isFollow(email, myEmail) > 0;
    }

    @Override
    public List<Follows> getMyFollows(String email, String myEmail) {
        Collection<Follows> followsCollection = followsRepository.getMyFollows(email, myEmail);
        return new ArrayList<>(followsCollection); // Convert Collection to List    
    }
}
