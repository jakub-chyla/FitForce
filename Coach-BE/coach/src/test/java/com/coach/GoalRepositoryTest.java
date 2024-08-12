package com.coach;

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
                .value("LOSE_WEIGHT")
                .build();

        // when
        Goal savedGoal = goalRepository.save(goal);
        Goal retrievedGoal = goalRepository.findById(savedGoal.getId()).orElseThrow();

        // then
        assertEquals(savedGoal.getId(), retrievedGoal.getId());
        assertEquals(savedGoal.getValue(), retrievedGoal.getValue());
    }

}