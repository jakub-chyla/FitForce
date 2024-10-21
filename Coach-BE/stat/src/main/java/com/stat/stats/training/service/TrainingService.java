package com.stat.stats.training.service;

import com.stat.stats.training.model.Training;
import com.stat.stats.training.repository.TrainingRepository;
import com.stat.stats.weight.model.Weight;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainingService {

    private final TrainingRepository trainingRepository;

    public List<Training> findAllTrainingsByMember(Long memberId) {
        return trainingRepository.findAllByMemberId(memberId);
    }
}
