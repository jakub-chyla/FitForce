package com.security.controller;

import com.security.dto.AuthRequest;
import com.security.dto.UserDto;
import com.security.model.UserCredential;
import com.security.service.AuthService;
import com.security.service.EmailSenderService;
import com.security.utils.ApiUrl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ApiUrl.API + ApiUrl.V1)
public class AuthController {
    @Autowired
    private AuthService authService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private EmailSenderService emailSenderService;

    @GetMapping(ApiUrl.Security.VALIDATE)
    public Boolean validateToken(@RequestParam("token") String token) {
        authService.validateToken(token);
        return true;
    }

    @PostMapping(ApiUrl.Security.REGISTER)
    public String addNewUser(@RequestBody UserCredential user) {
                emailSenderService.sendEmail(user.getEmail(),
                "Account created",
                "this is body");
        return authService.saveUser(user);
    }

    @PostMapping(ApiUrl.Security.LOG_IN)
    public UserDto getToken(@RequestBody AuthRequest authRequest) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authenticate.isAuthenticated()) {
            return authService.getUserWithToken(authRequest.getUsername());
        } else {
            throw new RuntimeException("invalid access");
        }
    }

}
