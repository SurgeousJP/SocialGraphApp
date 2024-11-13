package neo4jproject.springframework.controllers;

import neo4jproject.springframework.services.PostedService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/neo4j/posted")
public class PostedController {
    private final PostedService postedService;
    public PostedController(PostedService postedService) {
        this.postedService = postedService;
    }
}
