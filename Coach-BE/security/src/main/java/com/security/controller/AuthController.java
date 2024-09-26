package com.security.controller;


import com.security.dto.AuthRequest;
import com.security.dto.UserDto;
import com.security.model.UserCredential;
import com.security.repository.UserCredentialRepository;
import com.security.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private UserCredentialRepository userCredentialRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/validate")
    public Boolean validateToken(@RequestParam("token") String token) {
        authService.validateToken(token);
        return true;
    }

    @PostMapping("/register")
    public String addNewUser(@RequestBody UserCredential user) {
        return authService.saveUser(user);
    }

    @GetMapping("/user")
    public Boolean getUser(@RequestParam("token") String token) {
        authService.validateToken(token);
        return true;
    }

    @PostMapping("/token")
    public UserDto getToken(@RequestBody AuthRequest authRequest) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authenticate.isAuthenticated()) {
            return authService.getUserWithToken(authRequest.getUsername());
        } else {
            throw new RuntimeException("invalid access");
        }
    }


}
