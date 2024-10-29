package com.stat.stats.diet.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "diets", schema = "stat")
public class Diet {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "diets_seq")
    @SequenceGenerator(name = "diets_seq", sequenceName = "stat.diets_seq", allocationSize = 1)
    private Long id;

    @Column(name = "member_id")
    private Long memberId;
}
