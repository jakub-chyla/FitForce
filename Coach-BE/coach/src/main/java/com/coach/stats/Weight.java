package com.coach.stats;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Weight {

    private Long id;

    private Long memberId;

    private LocalDate created;

    private Double weightValue;


}