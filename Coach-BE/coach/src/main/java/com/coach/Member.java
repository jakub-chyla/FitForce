package com.coach;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "members_seq")
    @SequenceGenerator(name = "members_seq", sequenceName = "members_seq", allocationSize = 1)
    private Integer id;
    private String name;
    private String email;
}
