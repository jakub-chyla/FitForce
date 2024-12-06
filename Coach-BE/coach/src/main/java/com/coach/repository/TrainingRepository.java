package com.coach.repository;


import com.coach.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrainingRepository extends JpaRepository<Training, Long> {

    @Query(value = "SELECT * FROM stat.trainings w WHERE w.member_id = :memberId", nativeQuery = true)
    List<Training> findAllByMemberId(@Param("memberId") Long memberId);

    @Query(value = "SELECT * FROM stat.trainings w WHERE w.member_id IN :membersId", nativeQuery = true)
    List<Training> findNextTrainingsByCoachMembersId(List<Long> membersId);

}
