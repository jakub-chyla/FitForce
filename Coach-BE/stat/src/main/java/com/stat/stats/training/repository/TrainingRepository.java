package com.stat.stats.training.repository;

import com.stat.stats.training.model.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrainingRepository extends JpaRepository<Training, Long> {


    @Query(value = "SELECT * FROM stat.trainings w WHERE w.member_id = :memberId", nativeQuery = true)
    List<Training> findAllByMemberId(@Param("memberId") Long memberId);

    @Query(value = "SELECT * FROM stat.trainings w WHERE w.member_id = :memberId ORDER BY w.appointment DESC LIMIT 1", nativeQuery = true)
    Training findNextTrainingsByMemberId(@Param("memberId") Long memberId);

}
