-- Up Migration
create table users (
  id uuid primary key
  , email varchar (100) not null
  , name varchar (100) not null
  , role varchar (20) not null
  , password varchar (400) not null
  , created_at timestamp not null default now()
  , deleted_at timestamp null
  , constraint user_email_unique unique (email)
  , constraint user_role_enum check (role in ('ADMIN', 'CUSTOMER'))
);

create index idx_users_email on users (email);


-- Down Migration
drop table users;
