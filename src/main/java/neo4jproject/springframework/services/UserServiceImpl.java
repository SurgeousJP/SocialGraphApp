package neo4jproject.springframework.services;

import neo4jproject.springframework.domain.User;
import neo4jproject.springframework.repositories.FollowsRepository;
import neo4jproject.springframework.repositories.PostedRepository;
import neo4jproject.springframework.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private final PostedRepository postedRepository;

    public UserServiceImpl(UserRepository userRepository, PostedRepository postedRepository) {
        this.userRepository = userRepository;
        this.postedRepository = postedRepository;
    }


    @Override
    public List<User> listAll() {
        List<User> products = new ArrayList<>();
        userRepository.findAll().forEach(products::add); //fun with Java 8
        return products;
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User saveOrUpdate(User product) {
        userRepository.save(product);
        return product;
    }

    @Override
    public void addUser(User user) {
        if(userRepository.getByEmail(user.getEmail()) == null){
            userRepository.addUser(user.getEmail(), user.getImageUrl(), user.getFirstName(), user.getLastName());
        }
    }


    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);

    }

    @Override
    public Collection<User> getAll() {
        return userRepository.getAllUsers();
    }

    @Override
    public User getByEmail(String email) {
        return userRepository.getByEmail(email);
    }

    @Override
    public void updateUser(User user) {
        userRepository.updateUser(user.getEmail(), user.getImageUrl(), user.getFirstName(), user.getLastName());
    }

    @Override
    public Collection<User> getMyFollowers(String email) {
        return userRepository.findAllMyFollowers(email);
    }

    @Override
    public void deleteProfile(User user) {
        postedRepository.deleteUsersPosts(user.getEmail());
        userRepository.deleteUser(user.getEmail());
    }
    @Override
    public Collection<User> getAllFollowersOfUser(String email) {
        return userRepository.getAllFollowersOfUser(email);
    }
}
