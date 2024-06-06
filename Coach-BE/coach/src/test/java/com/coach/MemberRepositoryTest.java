package com.coach;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
class MemberRepositoryTest {

    @Autowired
    MemberRepository memberRepository;

    @Test
    void should_find_stat_by_id() {
        //given
        Member member = new Member();
        member.setName("aa");
        member.setEmail("a@example.com");

        //when
        memberRepository.save(member);
        Member savedMember = memberRepository.findById(member.getId()).orElseThrow();

        //then
        assertEquals(member.getId(), savedMember.getId());
        assertEquals(member.getName(), savedMember.getName());
        assertEquals(member.getEmail(), savedMember.getEmail());
    }

    @Test
    void should_find_all_stats() {
        //given
        Member member = new Member();
        member.setName("aa");
        member.setEmail("a@example.com");

        //when
        memberRepository.save(member);
        Member savedMember = memberRepository.findById(member.getId()).orElseThrow();

        //then
        assertEquals(member.getId(), savedMember.getId());
        assertEquals(member.getName(), savedMember.getName());
        assertEquals(member.getEmail(), savedMember.getEmail());
    }
}