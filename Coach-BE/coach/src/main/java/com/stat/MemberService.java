package com.stat;

import com.stat.client.StatClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository repository;
    private final StatClient client;


    public void saveMember(Member member) {
        repository.save(member);
    }

    public List<Member> findAllMembers() {
        return repository.findAll();
    }

    public FullMemberResponse findMembersWithStats(Integer memberId) {
        var member = repository.findById(memberId)
                .orElse(
                        Member.builder()
                                .name("NOT_FOUND")
                                .email("NOT_FOUND")
                                .build()
                );
        var members = client.findAllStatsByMember(memberId);
        return FullMemberResponse.builder()
                .name(member.getName())
                .email(member.getEmail())
                .stats(members)
                .build();
    }
}
