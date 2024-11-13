package neo4jproject.springframework.services;

import neo4jproject.springframework.domain.Post;
import neo4jproject.springframework.domain.Posted;
import neo4jproject.springframework.repositories.PostedRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostedServiceImpl implements PostedService {
    PostedRepository postedRepository;

    public PostedServiceImpl(PostedRepository postedRepository) {
        this.postedRepository = postedRepository;
    }

    @Override
    public List<Posted> listAll() {
        return null;
    }

    @Override
    public void addPostedLink(String email, Long postId) {
        postedRepository.addPosted(email, postId);
    }
}
