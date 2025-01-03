package neo4jproject.springframework.controllers;
import neo4jproject.springframework.domain.PostDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import neo4jproject.springframework.domain.Post;
import neo4jproject.springframework.services.LikedService;
import neo4jproject.springframework.services.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/rest/neo4j/post")
public class PostController {
    private static final Logger logger = LoggerFactory.getLogger(PostController.class);
    private final PostService postService;
    private final LikedService likedService;

    public PostController(PostService postService, LikedService likedService) {
        this.postService = postService;
        this.likedService = likedService;
    }

    @GetMapping(
            value = "/getAll"
    )
    public Collection<Post> getAll() {
        return postService.getAllPosts();
    }

    @PostMapping(
            value = "/addPost",
            produces = {"application/json"}
    )
    public HttpStatus addPost(@RequestBody(required = true) Post post) {
        try {
            postService.addPost(post);
        } catch (RuntimeException e) {
            return HttpStatus.ACCEPTED;
        }
        return HttpStatus.BAD_REQUEST;
    }


    @GetMapping(
            value = "/getFollowersPosts/{mail}"
    )
    public Collection<Post> findAllMyFollowers(@PathVariable("mail")String email) {
        return postService.getMyFollowersPosts(email);
    }

    @GetMapping(
            value = "/getLikedPosts/{mail}"
    )
    public Collection<Post> findLikedPosts(@PathVariable("mail")String email) {
        return postService.findLikedPosts(email);
    }

    @GetMapping(
            value = ""
    )
    public Collection<Post> findPostsByMail(@RequestParam("mail")String mail) {
        return postService.getPostsByMail(mail);
    }


    @PostMapping(
            value = "/likePost",
            produces = {"application/json"}
    )
    public HttpStatus addLikedPost(@RequestBody(required = true) Post post, @RequestParam("mail")String mail) {
        try {
            likedService.addLikedPost(mail, post.getId());
            logger.info("Post ID: {} and Mail: {}", post.getId(), mail);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }
    @PostMapping(
            value = "/dislikePost",
            produces = {"application/json"}
    )
    public HttpStatus dislikedPost(@RequestBody(required = true) Post post, @RequestParam("mail")String mail) {
        try {
            likedService.dislikedPost(mail, post.getId());
            logger.info("Post ID: {} and Mail: {}", post.getId(), mail);
        } catch (RuntimeException e) {
            return HttpStatus.BAD_REQUEST;
        }
        return HttpStatus.ACCEPTED;
    }
}
