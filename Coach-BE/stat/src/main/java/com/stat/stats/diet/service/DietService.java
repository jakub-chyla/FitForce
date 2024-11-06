package com.stat.stats.diet.service;

import com.stat.stats.diet.dto.DietDto;
import com.stat.stats.diet.model.Diet;
import com.stat.stats.diet.repository.DietRepository;
import com.stat.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DietService {

    private final DietRepository dietRepository;

    public DietDto findAllByMemberId(Long memberId) {
        DietDto dietDto = new DietDto();
        List<Diet> diets = dietRepository.findAllByMemberId(memberId);
        dietDto.setDiets(diets);

        Integer sumCarbohydrates = 0;
        Integer sumProteins = 0;
        Integer sumFats = 0;
        for (Diet diet : diets ) {
            sumCarbohydrates += diet.getCarbohydrates();
            sumProteins += diet.getProteins();
            sumFats += diet.getFats();
        }
        dietDto.setSumCarbohydrates(sumCarbohydrates);
        dietDto.setSumProteins(sumProteins);
        dietDto.setSumFats(sumFats);
        return dietDto;
    }



}
