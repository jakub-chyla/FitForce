package com.coach;

import com.coach.client.StatClient;
import com.coach.client.StatClient2;
import com.coach.stats.Weight;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class MemberService {

    private final MemberRepository memberRepository;
    private final StatClient client;
    private final StatClient2 statClient2;

    public MemberService(MemberRepository memberRepository, StatClient client, StatClient2 statClient2) {
        this.memberRepository = memberRepository;
        this.client = client;
        this.statClient2 = statClient2;
    }

    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }

    public List<Member> findAllMembers() {
        return memberRepository.findAll();
    }

    public FullMemberResponse findMemberWithStats(Integer memberId) {
        Member member = memberRepository.findById(memberId).orElse(Member.builder().firstName("NOT_FOUND").lastName("NOT_FOUND").build());
        List<Weight> weights = statClient2.findAllStatsByMember(memberId);
        return FullMemberResponse.builder().name(member.getFirstName()).weights(weights.stream().map(Mapper::map).collect(Collectors.toList())).build();
    }

    public void deleteWithStats(Integer memberId) {
        memberRepository.deleteById(memberId);
        client.deleteAllStatsByMember(memberId);
    }

    public List<Member> findAllMembersWithName(String name) {
        return memberRepository.findMembersByFirstName(name);
    }

    public List<Goal> findAllGoals() {
        return new ArrayList<>();
    }
}

