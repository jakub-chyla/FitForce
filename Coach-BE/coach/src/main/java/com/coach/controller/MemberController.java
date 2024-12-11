package com.coach.controller;

import com.coach.model.Goal;
import com.coach.model.Member;
import com.coach.model.UserCredential;
import com.coach.repository.UserCredentialRepository;
import com.coach.service.GoalService;
import com.coach.service.MemberService;
import com.coach.utils.ApiUrl;
import com.coach.validator.ValidAdmin;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(ApiUrl.API + ApiUrl.V1)
@RequiredArgsConstructor
@Validated
public class MemberController {

    private final MemberService memberService;
    private final UserCredentialRepository userCredentialRepository;

    private final GoalService goalService;


    @GetMapping(ApiUrl.Member.BASE +"/{user-id}")
    public ResponseEntity<List<Member>> findAllMembersForUser(@PathVariable("user-id") Long userId) {
        return ResponseEntity.ok(memberService.findAllMembersByUserId(userId));
    }

    @GetMapping(ApiUrl.Member.ADMIN +"/{user-id}")
    public ResponseEntity<List<Member>> findAll(@PathVariable("user-id") @ValidAdmin Long userId) {
        return ResponseEntity.ok(memberService.findAll());
    }

    @GetMapping(ApiUrl.Member.GOALS)
    public ResponseEntity<List<Goal>> findAllGoals() {
        return ResponseEntity.ok(goalService.findAllGoals());
    }

    @PostMapping(ApiUrl.Member.BASE)
    public ResponseEntity<Member> save(@RequestBody Member member) {
        return ResponseEntity.ok(memberService.saveMember(member));
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
        return ResponseEntity.ok("ping coach");
    }

//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Validation error in MemberController: " + ex.getMessage());
//    }

}
