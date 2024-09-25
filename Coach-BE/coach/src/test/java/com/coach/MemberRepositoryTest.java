package com.coach;

import com.coach.model.Member;
import com.coach.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Test
    void should_find_stat_by_id() {
        //given
        Member member = new Member();
        member.setFirstName("aa");
        member.setLastName("a@example.com");

        //when
        memberRepository.save(member);
        Member savedMember = memberRepository.findById(member.getId()).orElseThrow();

        //then
        assertEquals(member.getId(), savedMember.getId());
        assertEquals(member.getFirstName(), savedMember.getFirstName());
        assertEquals(member.getLastName(), savedMember.getLastName());
    }

    @Test
    void should_find_all_stats() {
        //given
        Member member = new Member();
        member.setFirstName("aa");
        member.setLastName("a@example.com");

        //when
        memberRepository.save(member);
        Member savedMember = memberRepository.findById(member.getId()).orElseThrow();

        //then
        assertEquals(member.getId(), savedMember.getId());
        assertEquals(member.getFirstName(), savedMember.getFirstName());
        assertEquals(member.getLastName(), savedMember.getLastName());
    }

    @Test
    void should_find_members_by_name() {
        //given
        Member member1 = new Member();
        member1.setFirstName("aa");
        member1.setLastName("a@example.com");

        Member member2 = new Member();
        member2.setFirstName("bb");
        member2.setLastName("b@example.com");

        //when
        memberRepository.save(member1);
        List<Member> savedMembers = memberRepository.findMembersByFirstName(member1.getFirstName());

        //then
        assertEquals(member1.getFirstName(), savedMembers.get(0).getFirstName());
    }
}