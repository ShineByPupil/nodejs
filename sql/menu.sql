CREATE TABLE menu (
  id INT PRIMARY KEY,
  parent_id INT,
  name VARCHAR(255) NOT NULL,
  sequence INT,
  route VARCHAR(255),
  route_name VARCHAR(255),
  FOREIGN KEY (parent_id) REFERENCES menu(id)
);

INSERT INTO menu (id, parent_id, name, sequence, route, route_name) VALUES
(100, NULL, '主页', 1, '/', 'home'),
(101, NULL, '报表', 2, '/report', 'report'),
(102, NULL, '学习', 3, '/student', 'student'),
(10201, 102, 'promise', 1, '/student/promise', 'promise'),
(10202, 102, 'proxy', 2, '/student/proxy', 'proxy'),
(10203, 102,'bigint', 3, '/student/bigint', 'bigint'),
(10204, 102, 'vueJsx', 4, '/student/vueJsx', 'Subsubmenu 1'),
(10205, 102, 'websoket', 5, '/student/websoket', 'websoket'),
(10206, 102, 'optionsApi', 6, '/student/optionsApi', 'optionsApi'),
(10207, 102, 'refAndReactive', 7, '/student/refAndReactive', 'refAndReactive'),
(1020401, 10204, 'vueJsx_demo1', 1, '/student/vueJsx/demo1', 'vueJsx_demo1'),
(1020402, 10204, 'vueJsx_demo2', 2, '/student/vueJsx/demo2', 'vueJsx_demo2'),
(1020403, 10204, 'vueJsx_demo3', 3, '/student/vueJsx/demo3', 'vueJsx_demo3'),
(1020404, 10204, 'vueJsx_demo4', 4, '/student/vueJsx/demo4', 'vueJsx_demo4');