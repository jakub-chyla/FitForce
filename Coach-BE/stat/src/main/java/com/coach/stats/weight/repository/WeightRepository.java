package com.coach.stats.weight.repository;

import com.coach.stats.weight.model.Weight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WeightRepository extends JpaRepository<Weight, Long> {

    @Query(value = "SELECT * FROM stat.weights w WHERE w.member_id = :memberId ORDER BY w.created DESC LIMIT 4", nativeQuery = true)
    List<Weight> findAllByMemberIdRecent(@Param("memberId") Long memberId);

}
