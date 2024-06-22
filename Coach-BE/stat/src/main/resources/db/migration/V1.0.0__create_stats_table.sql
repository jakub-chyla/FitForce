CREATE SEQUENCE stats_seq INCREMENT BY 1;

CREATE TABLE stats (
    id BIGINT PRIMARY KEY,
    weight TEXT,
    member_id BIGINT
);

  insert into stats (id, weight, member_id)
values
  (1, 'kg', 1);
