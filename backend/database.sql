-- Active: 1688546505483@@127.0.0.1@3306@todo_app

DROP TABLE IF EXISTS importance;

DROP TABLE IF EXISTS task;

CREATE TABLE
    importance (
        id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
        title varchar(254) NOT NULL,
        description varchar(254) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE
    task (
        id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
        title varchar(254) NOT NULL,
        is_urgent TINYINT NOT NULL,
        importance_id varchar(254) NOT NULL
    ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
    importance (title, description)
VALUES ('A', "Very important"), ('B', "Important"), ('C', "Not important"), ('D', "Not important at all");

INSERT INTO
    task (
        title,
        is_urgent,
        importance_id
    )
VALUES ('Clean car', 0, 1), ('Clean house', 1, 2), ('Clean desk', 0, 3), ('Go shopping', 1, 2), ('Study classes', 0, 3), (
        'Talk with boss about vacations',
        1,
        1
    ), ('Buy pc', 0, 4);