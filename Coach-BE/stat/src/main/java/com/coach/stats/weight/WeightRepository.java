package com.coach.stats.weight;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WeightRepository extends JpaRepository<Weight, Integer> {
    List<Weight> findAllByMemberId(Integer memberId);
}
