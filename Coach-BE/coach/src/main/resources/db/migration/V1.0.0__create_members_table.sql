create sequence members_seq increment by 1;

select setval('members_seq', 1);

create TABLE members (
    id BIGINT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    phone BIGINT,
    email TEXT,
    birthday DATE

);

  insert into members (id, first_name, last_name, phone, email, birthday)
values
  (1, 'John', 'Wich', 508388845, 'example@gmail.com', '2000-02-01');