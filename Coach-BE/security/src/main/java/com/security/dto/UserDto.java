package com.security.dto;

import com.security.enums.Role;
import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String token;
    private Role role;
}