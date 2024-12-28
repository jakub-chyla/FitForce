package com.security.service;

import com.security.dto.UserDto;
import com.security.enums.Role;
import com.security.model.UserCredential;
import com.security.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserCredentialRepository userCredentialRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public String saveUser(UserCredential credential) {
        credential.setPassword(passwordEncoder.encode(credential.getPassword()));
        credential.setRole(Role.USER);
        userCredentialRepository.save(credential);
        return "user added to the system";
    }

    public String generateToken(String username) {
        return jwtService.generateToken(username);
    }

    public UserDto getUserWithToken(String username) {
        Optional<UserCredential> userCredentialOptional = userCredentialRepository.findByName(username);
        if (userCredentialOptional.isPresent()) {
            UserCredential userCredential = userCredentialOptional.get();
            UserDto userDto = new UserDto();
            userDto.setId(userCredential.getId());
            userDto.setUserName(userCredential.getName());
            userDto.setFirstName(userCredential.getFirstName());
            userDto.setLastName(userCredential.getLastName());
            userDto.setToken(generateToken(username));
            userDto.setRole(userCredential.getRole());
            return userDto;
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }

}
