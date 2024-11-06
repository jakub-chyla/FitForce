package com.stat.stats.diet.repository;

import com.stat.stats.diet.model.Diet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DietRepository extends JpaRepository<Diet, Long> {

    @Query(value = "SELECT * FROM stat.diets w WHERE w.member_id = :memberId", nativeQuery = true)
    List<Diet> findAllByMemberId(@Param("memberId") Long memberId);


}
