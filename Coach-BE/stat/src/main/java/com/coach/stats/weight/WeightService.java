package com.coach.stats.weight;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WeightService {

    private final WeightRepository repository;

    public Weight saveStat(Weight weight) {
        return repository.save(weight);
    }

    public List<Weight> findAllStats() {
        return repository.findAll();
    }

    public List<Weight> findAllStatsByMember(Long memberId) {
        return repository.findAllByMemberIdRecent(memberId);
    }

    public void deleteById(Integer memberId) {
        repository.deleteById(memberId);
    }
}
