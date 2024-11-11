package com.stat.stats.weight.service;

import com.stat.stats.training.repository.TrainingRepository;
import com.stat.stats.weight.model.Weight;
import com.stat.stats.weight.repository.WeightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WeightService {

    private final WeightRepository weightRepository;

    public Weight saveStat(Weight weight) {
        return weightRepository.save(weight);
    }

    public List<Weight> findAllStats() {
        return weightRepository.findAll();
    }

    public List<Weight> findAllStatsByMember(Long memberId) {
        return weightRepository.findAllByMemberIdRecent(memberId);
    }

    public Long deleteById(Long weightId) {
        weightRepository.deleteById(weightId);
        return weightId;
    }
}
