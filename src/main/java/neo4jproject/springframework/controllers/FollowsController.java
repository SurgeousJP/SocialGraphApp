package neo4jproject.springframework.controllers;

import neo4jproject.springframework.domain.Follows;
import neo4jproject.springframework.domain.User;
import neo4jproject.springframework.services.FollowsService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/rest/neo4j/follows")
public class FollowsController {
    private final FollowsService followsService;
    public FollowsController(FollowsService followsService){
        this.followsService = followsService;
    }

    @PostMapping(
            value = "/followUser",
            produces = {"application/json"}
    )
    public HttpStatus followUser(@RequestBody(required = true) User user, @RequestParam("mail")String userEmailFollow) {
        try {
            followsService.followUser(user, userEmailFollow);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @DeleteMapping(
            value = "/unfollowUser",
            produces = {"application/json"}
    )
    public HttpStatus unfollowUser(@RequestBody(required = true) User user, @RequestParam("mail")String userEmailFollow) {
        try {
            followsService.unfollowUser(user, userEmailFollow);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @GetMapping(
            value = "/getFollowing/{mail1}/{mail2}"
    )
    public boolean getFollowing(@PathVariable("mail1")String email, @PathVariable("mail2")String myEmail) {
        return followsService.getMyFollows(email, myEmail);
    }
}
