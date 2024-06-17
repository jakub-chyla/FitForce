CREATE TABLE stats (
    id BIGINT PRIMARY KEY,
    weight TEXT,
    memberId TEXT
);

  insert into stats (id, weight, memberId)
values
  (1, 'kg', 1);