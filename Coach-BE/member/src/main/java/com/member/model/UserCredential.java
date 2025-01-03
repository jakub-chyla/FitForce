package com.member.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_credentials", schema = "security")
public class UserCredential {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "security.user_credentials_seq")
    @SequenceGenerator(name = "security.user_credentials_seq", sequenceName = "security.user_credentials_seq", allocationSize = 1)
    private Long id;

    private String name;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String email;
    private String password;

    private String role;
}
