package com.stat.stats.weight.service;

import com.stat.stats.weight.dto.WeightDto;
import com.stat.stats.weight.model.Weight;
import com.stat.stats.weight.repository.WeightRepository;
import com.stat.utils.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WeightService {

    private final WeightRepository weightRepository;

    public Weight saveStat(WeightDto weightDto) {
        Weight weight = new Weight();
        weight.setCreated(LocalDate.parse(weightDto.getCreated(), DateTimeFormatter.ISO_LOCAL_DATE));
        weight.setWeightValue(Double.valueOf(weightDto.getWeightValue()));
        weight.setMemberId(1L);
        return weightRepository.save(weight);
    }

    public List<Weight> findAllStats() {
        return weightRepository.findAll();
    }

    public List<WeightDto> findRecentWeightsByMember(Long memberId) {
        List<Weight> weights =  weightRepository.findAllByMemberIdRecent(memberId);
       return weights.stream().map(Mapper::mapWeightToDto).collect(Collectors.toList());
    }

    public Long deleteById(Long weightId) {
        weightRepository.deleteById(weightId);
        return weightId;
    }
}
