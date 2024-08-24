package com.coach.stats.weight;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="weights")
public class Weight {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "weights_seq")
    @SequenceGenerator(name = "weights_seq", sequenceName = "weights_seq", allocationSize = 1)
    private Integer id;

    @Column(name = "member_id")
    private Long memberId;

    private Double value;

}
