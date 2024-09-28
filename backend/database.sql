-- Active: 1688546505483@@127.0.0.1@3306@todo_app
DROP TABLE IF EXISTS importance;

DROP TABLE IF EXISTS tasks;

CREATE TABLE
  importance (
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title varchar(254) NOT NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

CREATE TABLE
  tasks (
    id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title varchar(254) NOT NULL,
    description varchar(254),
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    end_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    importance_id INT,
    is_urgent TINYINT,
    image_url varchar(254),
    FOREIGN KEY (importance_id) REFERENCES `importance` (id)
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;

INSERT INTO
  importance (title)
VALUES
  ("Very important"),
  ("Important"),
  ("Not important"),
  ("Not important at all");

INSERT INTO
  tasks (
    title,
    description,
    created_at,
    end_date,
    is_urgent,
    importance_id,
    image_url 
  )
VALUES
  (
    'Clean car',
    'clean the car exterior, the seats and the car wheels ',
    CURRENT_TIMESTAMP,
    null,
    0,
    1,
    null
  ),
  (
    'Clean house',
    'Clean the hose, my chamber, Stella chamber, kitchen and toiletes',
    CURRENT_TIMESTAMP,
    null,
    1,
    2,
    null
  ),
  (
    'Clean desk',
    'Clean the mouse, keyboard and seat',
    CURRENT_TIMESTAMP,
    null,
    0,
    3,
    null
  ),
  (
    'Go shopping',
    'Buy some clopthes for the winter',
    CURRENT_TIMESTAMP,
    null,
    1,
    2,
    null
  ),
  (
    'Study classes',
    'Learn more of useCallback and useMemo',
    CURRENT_TIMESTAMP,
    null,
    0,
    3,
    null
  ),
  (
    'Talk with boss about dentiste',
    'I need to tell him that the dentiste meating will be in november',
    CURRENT_TIMESTAMP,
    null,
    1,
    2,
    null
  ),
  ('Buy pc', 'By a pc to use windows 11', CURRENT_TIMESTAMP, null, 0, 3, null);
