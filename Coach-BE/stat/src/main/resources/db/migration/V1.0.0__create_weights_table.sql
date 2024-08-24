CREATE SEQUENCE weights_seq INCREMENT BY 1;

SELECT setval('weights_seq', 1);

CREATE TABLE weights (
    id BIGINT PRIMARY KEY,
    value double precision,
    member_id bigint
);

  insert into weights (id, value, member_id)
values
  (1, 80.5, 1);
