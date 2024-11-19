package com.coach.controller;

import com.coach.dto.FullMemberResponse;
import com.coach.model.Goal;
import com.coach.model.Member;
import com.coach.repository.GoalRepository;
import com.coach.service.MemberService;
import com.coach.statsClient.StatClient;
import com.coach.utils.ApiUrl;
import com.coach.utils.Helper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiUrl.API + ApiUrl.V1)
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final GoalRepository goalRepository;

    @GetMapping(ApiUrl.Member.GET_MEMBER)
    public ResponseEntity<List<Member>> findAllMembersForUser(@PathVariable("user-id") Long userId) {
        return ResponseEntity.ok(memberService.findAllMembers(userId));
    }

    @GetMapping(ApiUrl.Member.WITH_NAME + "/{name}")
    public ResponseEntity<List<Member>> findAllMembersWithName(@PathVariable("name") String name) {
        return ResponseEntity.ok(memberService.findAllMembersWithName(name));
    }

    @GetMapping("/goals")
    public ResponseEntity<List<Goal>> findAllGoals() {
        return ResponseEntity.ok(goalRepository.findAll());
    }

    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("ping coach");
    }

//    @GetMapping("/with-stats/{member-id}")
//    public ResponseEntity<FullMemberResponse> findAllMembers(@PathVariable("member-id") Long memberId) {
//        return ResponseEntity.ok(memberService.findMemberWithStats(memberId));
//    }

    @PostMapping
    public ResponseEntity<Member> save(@RequestBody Member member) {
        return ResponseEntity.ok(memberService.saveMember(member));
    }

    @PatchMapping
    public ResponseEntity<Member> update(@RequestBody Member member) {
        return ResponseEntity.ok(memberService.saveMember(member));
    }

    @DeleteMapping("/with-stats/{member-id}")
    public void deleteWithStats(@PathVariable("member-id") Long memberId) {
        memberService.deleteWithStats(memberId);
    }


}
