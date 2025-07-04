# creatorship-ui

# Example: Dumping only new rows

pg_dump -U local_user -h localhost -d local_db_name > full_dump.sql

psql -U server_user -h server_ip -d server_db_name < full_dump.sql
