package com.coach;

import com.coach.repository.MemberRepository;
import com.coach.service.MemberService;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


import static org.junit.jupiter.api.Assertions.assertEquals;


class MemberServiceTest {

    @InjectMocks
    private MemberService memberService;

    @Mock
    public MemberRepository memberRepository;

//    @Mock
//    public StatClient client;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

//    @Test
//    void should_save_member() {
//        //given
//        Member member = new Member();
//        member.setFirstName("John");
//        member.setLastName("John@gmail.com");
//
//        Member savedMember = new Member();
//        savedMember.setFirstName("John");
//        savedMember.setLastName("John@gmail.com");
//
//        //mock the calls
//        when(memberRepository.save(member)).thenReturn(savedMember);
//
//        //when
//        Member response = memberService.saveMember(member);
//
//        //then
//        assertEquals(member.getId(), response.getId());
//        assertEquals(member.getFirstName(), response.getFirstName());
//        assertEquals(member.getLastName(), response.getLastName());
//
//    }
//
//    @Test
//    void should_find_all_members() {
//        //given
//        List<Member> members = new ArrayList<>();
//
//        Member member1 = new Member();
//        member1.setFirstName("John");
//        member1.setLastName("John@gmail.com");
//
//        Member member2 = new Member();
//        member2.setFirstName("Paul");
//        member2.setLastName("Paul@gmail.com");
//
//        members.add(member1);
//        members.add(member2);
//
//        List<Member> savedMembers = new ArrayList<>();
//
//        Member savedMember1 = new Member();
//        savedMember1.setFirstName("John");
//        savedMember1.setLastName("John@gmail.com");
//
//        Member savedMember2 = new Member();
//        savedMember2.setFirstName("Paul");
//        savedMember2.setLastName("Paul@gmail.com");
//
//        savedMembers.add(savedMember1);
//        savedMembers.add(savedMember2);
//
//        //mock the calls
//        when(memberRepository.findAll()).thenReturn(savedMembers);
//
//        //when
//        List<Member> response = memberService.findAllMembers();
//
//        //then
//        assertEquals(members.get(0).getFirstName(), response.get(0).getFirstName());
//        assertEquals(members.get(1).getFirstName(), response.get(1).getFirstName());
//    }

//    @Test
//    void should_find_member_with_stats() {
//        //given
//        Member member = new Member();
//        member.setFirstName("John");
//        member.setLastName("John@gmail.com");
//
//        Member savedMember = new Member();
//        savedMember.setId(1);
//        savedMember.setFirstName("John");
//        savedMember.setLastName("John@gmail.com");
//
//        List<Weight> stavedWeights = new ArrayList<>();
//        Weight saveWeight = new Weight();
//        saveWeight.setWeight("80");
//        stavedWeights.add(saveWeight);
//
//        //mock the calls
//        when(memberRepository.findById(savedMember.getId())).thenReturn(Optional.of(savedMember));
//        when(client.findAllStatsByMember(savedMember.getId())).thenReturn(stavedWeights);
//
//        //when
//        FullMemberResponse response = memberService.findMemberWithStats(savedMember.getId());
//
//        //then
//        assertEquals(member.getFirstName(), response.getName());
//
//    }
}