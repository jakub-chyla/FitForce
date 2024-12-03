package com.stat.stats.weight.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "weights", schema = "stat")
public class Weight {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "weights_seq")
    @SequenceGenerator(name = "weights_seq", sequenceName = "stat.weights_seq", allocationSize = 1)
    private Long id;

    @Column(name = "member_id")
    private Long memberId;

    private LocalDate created;

    @Column(name = "weight_value")
    private Double weightValue;

}
