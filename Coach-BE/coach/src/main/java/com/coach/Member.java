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
    @Column(name ="first_name")
    private String firstName;

    @Column(name ="last_name")
    private String lastName;

    private Integer phone;
}
