CREATE DATABASE restaurant;
USE restaurant;

-- create users
CREATE TABLE users (
    _id INT AUTO_INCREMENT PRIMARY KEY,  -- 用户ID（自动生成）
    name VARCHAR(255) NOT NULL,          -- 用户名
    email VARCHAR(255) UNIQUE NOT NULL,  -- 登录邮箱（唯一）
    password VARCHAR(255) NOT NULL,      -- 哈希加密密码
    phone VARCHAR(20),                   -- 手机号
    role ENUM('customer', 'waiter') NOT NULL,  -- 角色（customer, waiter, admin）
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 注册时间
);

-- create tables
CREATE TABLE tables (
    _id INT AUTO_INCREMENT PRIMARY KEY,  -- 餐桌ID
    tableNumber INT UNIQUE NOT NULL,     -- 桌号（唯一）
    capacity INT NOT NULL,               -- 可容纳人数
    status ENUM('Available', 'Reserved', 'Occupied') NOT NULL -- 状态（Available, Reserved, Occupied）
);

-- create bookings
CREATE TABLE bookings (
    _id INT AUTO_INCREMENT PRIMARY KEY,   -- 预订ID
    userId INT,                           -- 关联用户ID
    tableId INT,                          -- 关联餐桌ID
    date DATE NOT NULL,                   -- 预订日期
    time TIME NOT NULL,                   -- 预订时间
    remarks TEXT,                         -- 备注
    status ENUM('Pending', 'Confirmed', 'Cancelled') NOT NULL, -- 状态（Pending, Confirmed, Cancelled）
    FOREIGN KEY (userId) REFERENCES users(_id),  -- 外键关联用户表
    FOREIGN KEY (tableId) REFERENCES tables(_id) -- 外键关联餐桌表
);

-- 插入测试用户
INSERT INTO users (name, email, password, phone, role) VALUES
('John', 'john@example.com', 'password1', 'phone1', 'customer'),
('Mike', 'mike@example.com', 'password2', 'phone2', 'waiter');

-- 插入餐桌（假设有 3 张桌子）
INSERT INTO tables (tableNumber, capacity, status) VALUES
(1, 4, 'Available'),
(2, 2, 'Available'),
(3, 6, 'Reserved');

-- 可选：插入测试预订记录
INSERT INTO bookings (userId, tableId, date, time, remarks, status) VALUES
(1, 1, '2025-03-20', '18:30:00', 'Window seat', 'Pending');