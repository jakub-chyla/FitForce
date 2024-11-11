package com.stat.stats.diet.service;

import com.stat.stats.diet.dto.DietDto;
import com.stat.stats.diet.model.Diet;
import com.stat.stats.diet.repository.DietRepository;
import com.stat.stats.training.model.Training;
import com.stat.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DietService {

    private final DietRepository dietRepository;

    public DietDto saveDiet(Diet newDiet) {
        DietDto dietDto = new DietDto();
        List<Diet> diets = dietRepository.findAllByMemberId(newDiet.getMemberId());
        Map<String, Integer> countSums = countSums(diets);

        List<Diet> dietList  = new ArrayList<>();
        Diet diet = dietRepository.save(newDiet);
        dietList.add(diet);
        dietDto.setDiets(dietList);

        dietDto.setSumCarbohydrates(countSums.get("carbohydrates"));
        dietDto.setSumProteins(countSums.get("proteins"));
        dietDto.setSumFats(countSums.get("fats"));

        return dietDto;
    }

    public Long deleteById(Long dietId) {
        dietRepository.deleteById(dietId);
        return dietId;
    }

    public DietDto findAllByMemberId(Long memberId) {
        DietDto dietDto = new DietDto();
        List<Diet> diets = dietRepository.findAllByMemberId(memberId);
        dietDto.setDiets(diets);

        Map<String, Integer> countSums = countSums(diets);

        dietDto.setSumCarbohydrates(countSums.get("carbohydrates"));
        dietDto.setSumProteins(countSums.get("proteins"));
        dietDto.setSumFats(countSums.get("fats"));
        return dietDto;
    }

    public Map<String, Integer> countSums(List<Diet> diets){

        Map<String, Integer> sums = new HashMap<>();

        Integer sumCarbohydrates = 0;
        Integer sumProteins = 0;
        Integer sumFats = 0;
        for (Diet diet : diets ) {
            sumCarbohydrates += diet.getCarbohydrates();
            sumProteins += diet.getProteins();
            sumFats += diet.getFats();
        }
        sums.put("carbohydrates", sumCarbohydrates);
        sums.put("proteins", sumProteins);
        sums.put("fats", sumFats);
        return sums;
    }

}
