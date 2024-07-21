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

    private final MemberService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Member save(@RequestBody Member member) {
        return service.saveMember(member);
    }

    @GetMapping
    public ResponseEntity<List<Member>> findAllMembers() {
        return ResponseEntity.ok(service.findAllMembers());
    }

    @GetMapping("/with-name/{name}")
    public ResponseEntity<List<Member>> findAllMembersWithName(@PathVariable("name") String name) {
        return ResponseEntity.ok(service.findAllMembersWithName(name));
    }

    @GetMapping("/with-stats/{member-id}")
    public ResponseEntity<FullMemberResponse> findAllMembers(@PathVariable("member-id") Integer memberId) {
        return ResponseEntity.ok(service.findMemberWithStats(memberId));
    }


}
