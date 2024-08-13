-- Create sequence for goals
create sequence goals_seq increment by 1;

-- Create goals table
create table goals (
    id BIGINT PRIMARY KEY,
    value TEXT UNIQUE NOT NULL
);

-- Create members table with foreign key to goals table
create table members (
    id BIGINT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    phone BIGINT,
    email TEXT,
    birthday DATE,
    goal_id BIGINT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created TIMESTAMP,
    CONSTRAINT fk_goal FOREIGN KEY (goal_id) REFERENCES goals(id)
);

-- Insert values into goals table
insert into goals (id, value) values
  (1, 'Lose weight'),
  (2, 'Gain muscles');

-- Insert values into members table
insert into members (id, first_name, last_name, phone, email, birthday, goal_id, is_active, created)
values
  (1, 'John', 'Williams', 1234567890, 'john.williams@example.com', '1985-05-15', 1, true, CURRENT_TIMESTAMP);
