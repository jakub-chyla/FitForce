package com.coach.service;

import com.coach.dto.FullMemberResponse;
import com.coach.dto.StatDto;
import com.coach.utils.Mapper;
import com.coach.statsClient.StatClient;
import com.coach.model.Goal;
import com.coach.model.Member;
import com.coach.repository.MemberRepository;
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
        StatDto stats = statClient.findMemberStats(memberId);
        FullMemberResponse response = new FullMemberResponse();
        response.setMemberId(memberId);
        response.setTrainings(stats.getTrainings().stream().map(Mapper::mapTraining).collect(Collectors.toList()));
        response.setWeights(stats.getWeights().stream().map(Mapper::mapWeight).collect(Collectors.toList()));
        return response;
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

