-- Insert departments
INSERT INTO departments (id, name)
VALUES 
    (1, "Core Teacher"),
    (2, "Admin"),
    (3, "Electives"),
    (4, "Tutors");

-- Insert roles
INSERT INTO role (id, title, salary, department_id)
VALUES 
    (1, "Science", 80000, 1),
    (2, "Math", 80000, 1),
    (3, "Humanities", 80000, 1),
    (4, "Principal", 90000, 2),
    (5, "Assistant Principal", 90000, 2),
    (6, "Counselor", 90000, 2),
    (7, "Secretary", 90000, 2),
    (8, "PE", 70000, 3),
    (9, "Dance", 70000, 3),
    (10, "Art", 70000, 3),
    (11, "Music", 70000, 3),
    (12, "Drama", 70000, 3),
    (13, "Reading Tutor", 40000, 4),
    (14, "Math Tutor", 40000, 4);

-- Insert employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES 
    (1, "Dan", "Rose", 1, 4),
    (2, "Norma", "Jean", 2, 4),
    (3, "Jason", "Call", 3, 4),
    (4, "Deborah", "Chandlier", 4, NULL),
    (5, "Jen", "Sanchez", 5, 4),
    (6, "Amy", "Mautz", 6, 4),
    (7, "Nicole", "Baird", 7, 4),
    (8, "Torrey", "Skeet", 8, 4),
    (9, "Denny Jo", "Rowe", 9, 4),
    (10, "Elizabeth", "Henry", 10, 4),
    (11, "Judson", "Armstrong", 11, 4),
    (12, "Holly", "Winn", 12, 4),
    (13, "Mindy", "Cook", 13, 4),
    (14, "Amy", "Conn", 14, 4);