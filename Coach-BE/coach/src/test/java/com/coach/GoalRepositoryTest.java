package com.coach;

import com.coach.model.Goal;
import com.coach.repository.GoalRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
class GoalRepositoryTest {

    @Autowired
    GoalRepository goalRepository;

    @Test
    void should_find_all_Goals() {
        // given
        Goal goal = Goal.builder()
                .name("LOSE_WEIGHT")
                .build();

        // when
        Goal savedGoal = goalRepository.save(goal);
        Goal retrievedGoal = goalRepository.findById(savedGoal.getId()).orElseThrow();

        // then
        assertEquals(savedGoal.getId(), retrievedGoal.getId());
        assertEquals(savedGoal.getName(), retrievedGoal.getName());
    }

}