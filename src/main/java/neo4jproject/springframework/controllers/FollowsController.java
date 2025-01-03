package neo4jproject.springframework.controllers;

import neo4jproject.springframework.domain.Follows;
import neo4jproject.springframework.domain.User;
import neo4jproject.springframework.services.FollowsService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/rest/neo4j/follows")
public class FollowsController {
    private final FollowsService followsService;
    public FollowsController(FollowsService followsService){
        this.followsService = followsService;
    }

    @PostMapping(
            value = "/users/{userEmail}/follow/{userEmailToFollow}",
            produces = {"application/json"}
    )
    public HttpStatus followUser(@PathVariable("userEmail") String userEmail, @PathVariable("userEmailToFollow") String userEmailFollow) 
    {
        try {
            followsService.followUser(userEmail, userEmailFollow);
            return HttpStatus.CREATED;
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @DeleteMapping(
            value = "/users/{userEmail}/unfollow/{userEmailToUnFollow}",
            produces = {"application/json"}
    )
    public HttpStatus unfollowUser(@PathVariable("userEmail") String userEmail, @PathVariable("userEmailToUnFollow") String userEmailFollow) {
        try {
            followsService.unfollowUser(userEmail, userEmailFollow);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @GetMapping(
            value = "/isFollowing/{mail1}/{mail2}"
    )
    public boolean getIsFollowing(@PathVariable("mail1")String email, @PathVariable("mail2")String myEmail) {
        return followsService.isFollow(email, myEmail);
    }

    @GetMapping(
        value = "/getFollowing/{mail1}/{mail2}"
    )
    public List<Follows> getFollowing(@PathVariable("mail1")String email, @PathVariable("mail2")String myEmail) {
        return followsService.getMyFollows(email, myEmail);
    }
}
