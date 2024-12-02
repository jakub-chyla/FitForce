package com.coach.service;

import com.coach.model.Goal;
import com.coach.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;

    public List<Goal> findAllGoals() {
        return goalRepository.findAll();
    }
}
