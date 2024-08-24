package com.coach.stats.weight;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WeightService {

    private final WeightRepository repository;

    public Weight saveStat(Weight stat) {
        return repository.save(stat);
    }

    public List<Weight> findAllStats() {
        return repository.findAll();
    }

    public List<Weight> findAllStatsByMember(Integer memberId) {
        return repository.findAllByMemberId(memberId);
    }
}
