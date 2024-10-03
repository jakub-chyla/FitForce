package com.coach.stats.weight.model;

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
@Table(name = "weights", schema = "stat")
public class Weight {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "weights_seq")
    @SequenceGenerator(name = "weights_seq", sequenceName = "weights_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "member_id")
    private Long memberId;

    private LocalDate created;

    @Column(name = "weight_value")
    private Double weightValue;

}
