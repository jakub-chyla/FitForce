package com.stat.stats.diet.dto;

import com.stat.stats.diet.model.Diet;
import jakarta.persistence.Column;
import lombok.Data;

import java.util.List;

@Data
public class DietDto {
    private Long id;

    private Long memberId;

    private List<Diet> diets;

    private Integer sumCarbohydrates;

    private Integer sumProteins;

    private Integer sumFats;
}
