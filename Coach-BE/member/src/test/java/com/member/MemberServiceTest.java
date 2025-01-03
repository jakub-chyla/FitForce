package com.member;

import com.member.model.Member;
import com.member.repository.MemberRepository;
import com.member.service.MemberService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class MemberServiceTest {

    @InjectMocks
    private MemberService memberService;

    @Mock
    public MemberRepository memberRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void givenValidMember_whenSaveMember_thenReturnsSavedMember() {
        //given
        Member member = new Member();
        member.setFirstName("John");
        member.setLastName("John@gmail.com");

        Member savedMember = new Member();
        savedMember.setFirstName("John");
        savedMember.setLastName("John@gmail.com");

        //mock the calls
        when(memberRepository.save(member)).thenReturn(savedMember);

        //when
        Member response = memberService.saveMember(member);

        //then
        assertEquals(member.getId(), response.getId());
        assertEquals(member.getFirstName(), response.getFirstName());
        assertEquals(member.getLastName(), response.getLastName());

    }

    @Test
    void should_find_all_members() {
        //given
        List<Member> members = new ArrayList<>();

        Member member1 = new Member();
        member1.setUserId(1L);
        Member member2 = new Member();
        member2.setUserId(1L);
        members.add(member1);
        members.add(member2);
        List<Member> savedMembers = new ArrayList<>();

        Member savedMember1 = new Member();
        savedMember1.setUserId(1L);
        Member savedMember2 = new Member();
        savedMember2.setUserId(1L);
        savedMembers.add(savedMember1);
        savedMembers.add(savedMember2);

        //mock the calls
        when(memberRepository.findAllMembersByUserId(1L)).thenReturn(savedMembers);

        //when
        List<Member> response = memberService.findAllMembersByUserId(1L);

        //then
        assertEquals(members.get(0).getUserId(), response.get(0).getUserId());
        assertEquals(members.get(1).getUserId(), response.get(1).getUserId());
    }

}