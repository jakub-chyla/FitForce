package com.coach.stats;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Weight {

    private Integer id;

    private Long memberId;

    private LocalDateTime created;

    private Double value;


}