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
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

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
    public ResponseEntity<String> login(@RequestBody AuthRequest authRequest) {
        User user = userRepository.getByEmail(authRequest.email);

        if (user == null) {
            return new ResponseEntity<>("User not found for validation", HttpStatus.NOT_FOUND);
        }

        if (!user.getPassword().equals(authRequest.password)) {
            return new ResponseEntity<>("Invalid Credentials", HttpStatus.UNAUTHORIZED);
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new ResponseEntity<>(token, HttpStatus.OK);
    }
}

class AuthRequest {
    public String email;
    public String password;
}
