package com.coach;

import com.coach.client.StatClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;


class MemberServiceTest {

    @InjectMocks
    private MemberService memberService;

    @Mock
    public MemberRepository memberRepository;

    @Mock
    public StatClient client;

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
        assertEquals(member.getId(), response.getId());
        assertEquals(member.getName(), response.getName());
        assertEquals(member.getEmail(), response.getEmail());

    }

    @Test
    void should_find_all_members() {
        //given
        List<Member> members = new ArrayList<>();

        Member member1 = new Member();
        member1.setName("John");
        member1.setEmail("John@gmail.com");

        Member member2 = new Member();
        member2.setName("Paul");
        member2.setEmail("Paul@gmail.com");

        members.add(member1);
        members.add(member2);

        List<Member> savedMembers = new ArrayList<>();

        Member savedMember1 = new Member();
        savedMember1.setName("John");
        savedMember1.setEmail("John@gmail.com");

        Member savedMember2 = new Member();
        savedMember2.setName("Paul");
        savedMember2.setEmail("Paul@gmail.com");

        savedMembers.add(savedMember1);
        savedMembers.add(savedMember2);

        //mock the calls
        when(memberRepository.findAll()).thenReturn(savedMembers);

        //when
        List<Member> response = memberService.findAllMembers();

        //then
        assertEquals(members.get(0).getName(), response.get(0).getName());
        assertEquals(members.get(1).getName(), response.get(1).getName());
    }

    @Test
    void should_find_member_with_stats() {
        //given
        Member member = new Member();
        member.setName("John");
        member.setEmail("John@gmail.com");

        Member savedMember = new Member();
        savedMember.setId(1);
        savedMember.setName("John");
        savedMember.setEmail("John@gmail.com");

        List<Stat> stavedStats = new ArrayList<>();
        Stat saveStat = new Stat();
        saveStat.setFirstname("statName");
        saveStat.setLastname("statLastName");
        stavedStats.add(saveStat);

        //mock the calls
        when(memberRepository.findById(savedMember.getId())).thenReturn(Optional.of(savedMember));
        when(client.findAllStatsByMember(savedMember.getId())).thenReturn(stavedStats);

        //when
        FullMemberResponse response = memberService.findMemberWithStats(savedMember.getId());

        //then
        assertEquals(member.getName(), response.getName());

    }
}