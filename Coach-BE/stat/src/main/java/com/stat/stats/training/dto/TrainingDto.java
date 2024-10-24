package com.stat.stats.training.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TrainingDto {

    private Long id;

    private Long memberId;

    private String time;

    private LocalDate appointment;

    private String note;
}
