package neo4jproject.springframework.controllers;

import neo4jproject.springframework.domain.User;
import neo4jproject.springframework.repositories.UserRepository;
import neo4jproject.springframework.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthController() {
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest authRequest) {
        User user = userRepository.getByEmail(authRequest.email);

        if (user == null){
            return "User not found for validation";
        }

        if (!user.getPassword().equals(authRequest.password)) {
            return "Invalid Credentials" + " User password: " + user.getPassword() + "Auth request: " + authRequest.password;
        }

        return jwtUtil.generateToken(user.getEmail());
    }
}

class AuthRequest {
    public String email;
    public String password;
}
