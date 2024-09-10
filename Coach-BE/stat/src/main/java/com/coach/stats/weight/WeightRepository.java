package com.coach.stats.weight;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.util.List;

public interface WeightRepository extends JpaRepository<Weight, Integer> {


        @Query(value = "SELECT * FROM weights w WHERE w.member_id = :memberId ORDER BY w.created DESC LIMIT 4", nativeQuery = true)
        List<Weight> findAllByMemberIdRecent(@Param("memberId") Long memberId);


}
