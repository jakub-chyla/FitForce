package com.coach.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "goals", schema = "coach")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "goals_seq")
    @SequenceGenerator(name = "goals_seq", sequenceName = "goals_seq", allocationSize = 1)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

}