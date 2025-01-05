package com.member.model;

import jakarta.persistence.*;
import lombok.Setter;

@Entity
@Setter
@Table(name = "member_order", schema = "member")
public class MemberOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member.member_order_seq")
    @SequenceGenerator(name = "member.member_order_seq", sequenceName = "member.member_order_seq", allocationSize = 1)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "member_id")
    private Long memberId;
}
