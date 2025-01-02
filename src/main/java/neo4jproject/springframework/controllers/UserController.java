package neo4jproject.springframework.controllers;

import neo4jproject.springframework.domain.User;
import neo4jproject.springframework.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;


@RestController
@RequestMapping("/rest/neo4j/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService productService) {
        this.userService = productService;
    }

    @GetMapping(
            value = "/getAll"
    )
    public Collection<User> getAll() {
        return userService.getAll();
    }

    @GetMapping(
            value = "/getByMail/{mail}"
    )
    public User getByMail(@PathVariable("mail")String email) {
        return userService.getByEmail(email);
    }

    @GetMapping(
            value = "/allMyFollowers/{mail}"
    )
    public Collection<User> findAllMyFollowers(@PathVariable("mail")String email) {
        return userService.getMyFollowers(email);
    }

    @PostMapping(
            value = "/addUser",
            produces = {"application/json"}
    )
    public HttpStatus addUser(@RequestBody(required = true) User user) {
        try {
            userService.addUser(user);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @PutMapping(
            value = "/updateUser",
            produces = {"application/json"}
    )
    public HttpStatus updateUser(@RequestBody(required = true) User user) {
        try {
            userService.updateUser(user);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }

    @DeleteMapping(
            value = "/deleteProfile",
            produces = {"application/json"}
    )
    public HttpStatus deleteUser (@RequestBody(required = true) User user) {
        try {
            userService.deleteProfile(user);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }
    @GetMapping(
            value = "/getAllFollowers/{email}"
    )
    public Collection<User> getAll(@PathVariable("email")String email) {
        return userService.getAllFollowersOfUser(email);
    }
    @GetMapping(
            value = ""
    )
    public Collection<User> getAllUserWhoLikePost(@RequestParam("postId") Long postId) {
        return userService.getUserWhoLikePost(postId);
    }
}
