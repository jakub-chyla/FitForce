package com.member.service;

import com.member.model.Goal;
import com.member.repository.GoalRepository;
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
