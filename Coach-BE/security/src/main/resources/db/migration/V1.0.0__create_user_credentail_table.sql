
DROP SEQUENCE IF EXISTS security.user_credentials_seq;

CREATE SEQUENCE security.user_credentials_seq INCREMENT BY 1;
SELECT setval('security.user_credentials_seq', 1);

DROP TABLE IF EXISTS security.user_credentials;

CREATE TABLE security.user_credentials (
    id BIGINT PRIMARY KEY,
    user_id BIGINT,
    name TEXT,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    password TEXT
);
