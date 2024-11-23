package com.security.controller;

import com.security.dto.AuthRequest;
import com.security.dto.UserDto;
import com.security.model.UserCredential;
import com.security.service.AuthService;
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

    @GetMapping(ApiUrl.Security.VALIDATE)
    public Boolean validateToken(@RequestParam("token") String token) {
        authService.validateToken(token);
        return true;
    }

    @PostMapping(ApiUrl.Security.REGISTER)
    public String addNewUser(@RequestBody UserCredential user) {
        return authService.saveUser(user);
    }

    @PostMapping(ApiUrl.Security.TOKEN)
    public UserDto getToken(@RequestBody AuthRequest authRequest) {
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authenticate.isAuthenticated()) {
            return authService.getUserWithToken(authRequest.getUsername());
        } else {
            throw new RuntimeException("invalid access");
        }
    }

}
