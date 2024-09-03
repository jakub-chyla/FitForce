package com.coach;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final GoalRepository goalRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Member save(@RequestBody Member member) {
        return memberService.saveMember(member);
    }

    @GetMapping
    public ResponseEntity<List<Member>> findAllMembers() {
        return ResponseEntity.ok(memberService.findAllMembers());
    }

    @GetMapping("/with-name/{name}")
    public ResponseEntity<List<Member>> findAllMembersWithName(@PathVariable("name") String name) {
        return ResponseEntity.ok(memberService.findAllMembersWithName(name));
    }

    @GetMapping("/with-stats/{member-id}")
    public ResponseEntity<FullMemberResponse> findAllMembers(@PathVariable("member-id") Integer memberId) {
        return ResponseEntity.ok(memberService.findMemberWithStats(memberId));
    }

    @DeleteMapping("/with-stats/{member-id}")
    public void deleteWithStats(@PathVariable("member-id") Integer memberId) {
       memberService.deleteWithStats(memberId);
    }

    @GetMapping("/goals")
    public ResponseEntity<List<Goal>> findAllGoals() {
        return ResponseEntity.ok(goalRepository.findAll());
    }

}
