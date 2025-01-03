package com.member.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "members", schema = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "members_seq")
    @SequenceGenerator(name = "members_seq", sequenceName = "member.members_seq", allocationSize = 1)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(nullable = false, updatable = false)
    private LocalDateTime created = LocalDateTime.now();

    private Integer phone;
    private Integer avatar;

    private String email;

    @OneToOne
    @JoinColumn(name = "goal_id", referencedColumnName = "id")
    private Goal goal;

    private LocalDate birthday;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

}
