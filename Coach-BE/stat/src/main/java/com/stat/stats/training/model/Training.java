package com.stat.stats.training.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "trainings", schema = "stat")
public class Training {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "trainings_seq")
    @SequenceGenerator(name = "trainings_seq", sequenceName = "stat.trainings_seq", allocationSize = 1)
    private Long Id;

    @Column(name = "member_Id")
    private Long memberId;

    private LocalDate appointment;
}
