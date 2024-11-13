package neo4jproject.springframework.controllers;

import neo4jproject.springframework.services.LikedService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/neo4j/liked")
public class LikedController {
    private final LikedService likedService;

    public LikedController(LikedService likedService) {
        this.likedService = likedService;
    }
}
