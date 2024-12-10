package com.coach.service;

import com.coach.model.Member;
import com.coach.repository.MemberRepository;
import com.coach.statsClient.StatClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final StatClient statClient;

    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }

    public List<Member> findAllMembersByUserId(Long userId) {
        //get all members for user
        // get all training s for user
        // get next training for user
        return memberRepository.findAllMembersByUserId(userId);
    }

    public List<Member> findAll(){
        return memberRepository.findAll();
    };

    public void deleteWithStats(Long memberId) {
        memberRepository.deleteById(memberId);
        statClient.deleteAllStatsByMember(memberId);
    }

}

