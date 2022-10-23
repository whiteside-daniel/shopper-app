#!/bin/bash

source ~/.envars

mysql --password:"${MYSQL_ROOT_PW}"

CREATE USER 'dan'@192.168.1.241 IDENTIFIED BY ${MYSQL_ROOT_PW};
CREATE DATABASE open_fec;
GRANT ALL PRIVILEGES ON *.* TO 'dan'@${CLIENT_DB_IP};

sleep 5
