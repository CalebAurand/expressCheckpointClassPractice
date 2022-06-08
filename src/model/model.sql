-- Documentation of sql commands for router/controller functions

CREATE TABLE todos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(50) NOT NULL,
  description VARCHAR(1000),
  is_done BOOLEAN
);

create table todos (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(50) NOT NULL,
  description VARCHAR(1000),
  is_done BOOLEAN
  )

-- get the summary of all the items
select id, task, is_done from todos;

-- get the details of a single item by id
select id, task, description, is_done from todos
where id = ?;

-- delete a task given an id
delete from todos where id = ?;

-- create a new todo
insert into todos (task, description) values (?, ?);

-- update a todo given its id
update todos set task = ?, description = ?, is_done = ? where id = ?;





--  STUFF WE WANT TO PREVENT FROM GETTING IN --
insert into todos(task, description) values ('feed dog', 'feed 2 cup'); drop table todos; select ('') ;
-- what if a user types out
'feed dog'
'feed 2 cups'); drop table todos;