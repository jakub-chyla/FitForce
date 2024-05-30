package com.coach;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

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
    void should_save_member() {
        //given
        Member member = new Member();
        member.setName("John");
        member.setEmail("John@gmail.com");

        Member savedMember = new Member();
        savedMember.setName("John");
        savedMember.setEmail("John@gmail.com");

        //mock the calls
        when(memberRepository.save(member)).thenReturn(savedMember);

        //when
        Member response = memberService.saveMember(member);

        //then
        assertEquals(member.getName(), response.getName());

    }

    @Test
    @Disabled
    void findAllMembers() {
    }

    @Test
    @Disabled
    void findMembersWithStats() {
    }
}