package com.coach;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="stats")
public class Stat {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "stats_seq")
    @SequenceGenerator(name = "stats_seq", sequenceName = "stats_seq", allocationSize = 1)
    private Integer id;
    private String weight;

    @Column(name = "member_id")
    private Integer memberId;
}
