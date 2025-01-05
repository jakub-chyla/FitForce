package com.member.service;

import com.member.model.Member;
import com.member.model.MemberOrder;
import com.member.repository.MemberRepository;
import com.member.repository.MemberOrderRepository;
import com.member.statsClient.StatClient;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberOrderRepository memberOrderRepository;
    private final StatClient statClient;

    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }

    @Transactional
    public void saveMembersOrder(List<Member> members) {
        List<Long> ids = members.stream().map(Member::getId).collect(Collectors.toList());
        memberOrderRepository.deleteByMemberId(ids);
        List<MemberOrder> memberOrderList = new ArrayList<>();
        for(Member member : members) {
            MemberOrder memberOrder = new MemberOrder();
            memberOrder.setUserId(member.getUserId());
            memberOrder.setMemberId(member.getId());
            memberOrderList.add(memberOrder);
        }
        memberOrderRepository.saveAll(memberOrderList);
    }

    //TODO refactor
    public List<Member> findAllMembersByUserId(Long userId) {
        //get all members for user
        // get all training s for user
        // get next training for user
        return memberRepository.findAllMembersByUserId(userId);
    }

    public List<Member> findAll() {
        return memberRepository.findAll();
    }

    public void deleteWithStats(Long memberId) {
        memberRepository.deleteById(memberId);
        statClient.deleteAllStatsByMember(memberId);
    }

}

