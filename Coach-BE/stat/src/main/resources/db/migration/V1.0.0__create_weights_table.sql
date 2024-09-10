create sequence weights_seq increment by 1;

select setval('weights_seq', 1);

create TABLE weights (
    id BIGINT PRIMARY KEY,
    member_id bigint,
    created DATE,
    weight_value double precision
);

  insert into weights (id, member_id, created, weight_value)
values
  (1, 1, '2024-01-10', 70.5),
  (2, 1, '2024-02-10', 75.0),
  (3, 1, '2025-03-10', 78.8),
  (4, 1, '2025-04-10', 82.3),
  (5, 1, '2025-05-10', 77.5),
  (6, 1, '2025-06-10', 74.2);
