package com.coach.service;

import com.coach.dto.FullMemberResponse;
import com.coach.utils.Mapper;
import com.coach.statsClient.StatClient;
import com.coach.model.Goal;
import com.coach.model.Member;
import com.coach.repository.MemberRepository;
import com.coach.stats.Weight;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final StatClient statClient;

    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }

    public List<Member> findAllMembers(Long userId) {
        return memberRepository.findMembersByUserId(userId);
    }

    public FullMemberResponse findMemberWithStats(Long memberId) {
        Member member = memberRepository.findById(memberId).orElse(Member.builder().firstName("NOT_FOUND").lastName("NOT_FOUND").build());
        List<Weight> weights = statClient.findAllStatsByMember(memberId);
        return FullMemberResponse.builder().name(member.getFirstName()).weights(weights.stream().map(Mapper::map).collect(Collectors.toList())).build();
    }

    public void deleteWithStats(Long memberId) {
        memberRepository.deleteById(memberId);
        statClient.deleteAllStatsByMember(memberId);
    }

    public List<Member> findAllMembersWithName(String name) {
        return memberRepository.findMembersByFirstName(name);
    }

    public List<Goal> findAllGoals() {
        return new ArrayList<>();
    }
}

