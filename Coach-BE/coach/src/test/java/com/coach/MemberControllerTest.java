package com.coach;

import org.h2.bnf.Sentence;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class MemberControllerTest {

    @LocalServerPort
    private int port;

    private String baseUrl = "http://localhost";

    private static RestTemplate restTemplate;

    @Autowired
    private MemberRepository repo;

    @BeforeAll
    public static void init() {
        restTemplate = new RestTemplate();
    }

    @BeforeEach
    public void setUp() {
        baseUrl = baseUrl.concat(":").concat(port + "").concat("/api/v1/members");
    }

    @Test
    public void testAddSentence() {
        Member member = new Member();
        member.setFirstName("john");
        member.setLastName("john@example.com");

        ResponseEntity<Member> responseEntity = restTemplate.exchange(
                baseUrl + "/", HttpMethod.POST, new HttpEntity<>(member), Member.class
        );

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals("john", responseEntity.getBody().getFirstName());
        assertEquals(1, repo.findAll().size());
    }

}