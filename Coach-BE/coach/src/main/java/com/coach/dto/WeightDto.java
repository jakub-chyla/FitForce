package com.coach.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class WeightDto {
    private Long id;

    private String created;

    private Double weightValue;
}