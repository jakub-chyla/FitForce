package com.member.controller;

import com.member.model.Goal;
import com.member.model.Member;
import com.member.repository.UserCredentialRepository;
import com.member.service.GoalService;
import com.member.service.MemberService;
import com.member.utils.ApiUrl;
import com.member.validator.ValidAdmin;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiUrl.API + ApiUrl.V1)
@RequiredArgsConstructor
@Validated
public class MemberController {

    private final MemberService memberService;
    private final UserCredentialRepository userCredentialRepository;

    private final GoalService goalService;

    @GetMapping(ApiUrl.Member.BASE + "/{user-id}")
    public ResponseEntity<List<Member>> findAllMembersForUser(@PathVariable("user-id") Long userId) {
        return ResponseEntity.ok(memberService.findAllMembersByUserId(userId));
    }

    @GetMapping(ApiUrl.Member.ADMIN + "/{user-id}")
    public ResponseEntity<List<Member>> findAll(@PathVariable("user-id") @ValidAdmin Long userId) {
        return ResponseEntity.ok(memberService.findAll());
    }

    @GetMapping(ApiUrl.Member.GOALS)
    public ResponseEntity<List<Goal>> findAllGoals() {
        return ResponseEntity.ok(goalService.findAllGoals());
    }

    @PostMapping(ApiUrl.Member.BASE)
    public ResponseEntity<Member> saveMember(@RequestBody Member member) {
        return ResponseEntity.ok(memberService.saveMember(member));
    }

    @PostMapping(ApiUrl.Member.MEMBERS_ORDER)
    public ResponseEntity<Void> saveMembersOrder(@RequestBody List<Member> members) {
        memberService.saveMembersOrder(members);
        return ResponseEntity.ok().build();
    }

    @PutMapping(ApiUrl.Member.BASE)
    public ResponseEntity<Member> update(@RequestBody Member member) {
        return ResponseEntity.ok(memberService.saveMember(member));
    }

    @DeleteMapping(ApiUrl.Member.BASE + "/{member-id}")
    public ResponseEntity<Void> deleteWithStats(@PathVariable("member-id") Long memberId) {
        memberService.deleteWithStats(memberId);
        return ResponseEntity.ok().build();
    }

    @GetMapping(ApiUrl.Member.PING)
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("ping member");
    }

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Validation error in MemberController: " + ex.getMessage());
//    }

}
