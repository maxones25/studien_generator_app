FROM mysql:latest

COPY ./schema.sql /docker-entrypoint-initdb.d/0-schema.sql
COPY ./seed/test-seed.sql /docker-entrypoint-initdb.d/1-seed.sql
