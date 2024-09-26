package com.coach.controller;

import com.coach.dto.FullMemberResponse;
import com.coach.statsClient.StatClient;
import com.coach.model.Goal;
import com.coach.model.Member;
import com.coach.repository.GoalRepository;
import com.coach.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final GoalRepository goalRepository;


    private final StatClient statClient;

    @PostMapping
    public ResponseEntity<Member> save(@RequestBody Member member) {
        return ResponseEntity.ok(memberService.saveMember(member));
    }

    @PatchMapping
    public ResponseEntity<Member> update(@RequestBody Member member) {
        return ResponseEntity.ok(memberService.saveMember(member));
    }

    @GetMapping("/{user-id}")
    public ResponseEntity<List<Member>> findAllMembersForUser(@PathVariable("user-id") Long userId) {
        return ResponseEntity.ok(memberService.findAllMembers(userId));
    }

    @GetMapping("/with-name/{name}")
    public ResponseEntity<List<Member>> findAllMembersWithName(@PathVariable("name") String name) {
        return ResponseEntity.ok(memberService.findAllMembersWithName(name));
    }

    @GetMapping("/with-stats/{member-id}")
    public ResponseEntity<FullMemberResponse> findAllMembers(@PathVariable("member-id") Long memberId) {
        return ResponseEntity.ok(memberService.findMemberWithStats(memberId));
    }

    @DeleteMapping("/with-stats/{member-id}")
    public void deleteWithStats(@PathVariable("member-id") Long memberId) {
        memberService.deleteWithStats(memberId);
    }

    @GetMapping("/goals")
    public ResponseEntity<List<Goal>> findAllGoals() {
        return ResponseEntity.ok(goalRepository.findAll());
    }

}
