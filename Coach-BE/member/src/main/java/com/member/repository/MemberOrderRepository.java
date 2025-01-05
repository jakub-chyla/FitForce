package com.member.repository;

import com.member.model.MemberOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MemberOrderRepository extends JpaRepository<MemberOrder, Long> {

    @Query("DELETE FROM MemberOrder m WHERE m.memberId IN :memberIds")
    void deleteByMemberId(@Param("memberIds")List<Long> memberIds);


}
