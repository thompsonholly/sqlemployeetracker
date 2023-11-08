INSERT INTO department (name)
  VALUES 
  ('Sales'),
  ('HR'),
  ('Engineering'),
  ('Legal'),
  ('Coffe Barista');

INSERT INTO role (title, salary, department_id)
  VALUES
  ('Lead Sales', 120000, 1),
  ('HR Director', 75000, 2),
  ('Software Engineer', 150000, 3),
  ('Civil Engineer', 130000, 3),
  ('Lawyer', 200000, 4),
  ('Lead Barista', 40000, 5)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
  VALUES
  ('John', 'Smith', 1, NULL),
  ('Jane', 'Doe', 2, 1),
  ('Thomas', 'Jenkins', 3, Null),
  ('Veronica', 'Sanchez', 4, 3),
  ('Jessica', 'Chang', 6, Null)




