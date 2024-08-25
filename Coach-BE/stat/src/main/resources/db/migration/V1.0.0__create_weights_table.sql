create sequence weights_seq increment by 1;

select setval('weights_seq', 1);

create TABLE weights (
    id BIGINT PRIMARY KEY,
    member_id bigint,
    created DATE,
    value double precision
);

  insert into weights (id, member_id, created, value)
values
  (1, 1, '1985-05-15', 80.5);
