CREATE DATABASE IF NOT EXISTS database_perusahaan_tambang;
USE database_perusahaan_tambang;

-- Tabel Users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Approver') NOT NULL, 
    employee_id INT UNIQUE, 
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);

-- Tabel Employees
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(255) NOT NULL,
    employee_rank ENUM('Employee', 'Supervisor', 'Manager') NOT NULL,
    supervisor_id INT DEFAULT NULL,
    FOREIGN KEY (supervisor_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);

-- Tabel Regions
CREATE TABLE regions (
    region_id INT AUTO_INCREMENT PRIMARY KEY,
    region_name VARCHAR(255) NOT NULL
);

-- Tabel Offices
CREATE TABLE offices (
    office_id INT AUTO_INCREMENT PRIMARY KEY,
    office_name VARCHAR(255) NOT NULL,
    office_type ENUM('Pusat', 'Cabang') NOT NULL,
    address VARCHAR(255),
    region_id INT NOT NULL,
    FOREIGN KEY (region_id) REFERENCES regions(region_id) ON DELETE CASCADE
);

-- Tabel Mines
CREATE TABLE mines (
    mine_id INT AUTO_INCREMENT PRIMARY KEY,
    mine_name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    status ENUM('Aktif', 'Non-Aktif') NOT NULL,
    region_id INT NOT NULL,
    FOREIGN KEY (region_id) REFERENCES regions(region_id) ON DELETE CASCADE
);

-- Tabel Vehicles
CREATE TABLE vehicles (
    vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_type ENUM('Angkutan Orang', 'Angkutan Barang') NOT NULL,
    capacity INT NOT NULL,
    vehicle_status ENUM('Milik', 'Sewa') NOT NULL,
    office_id INT NOT NULL,
    FOREIGN KEY (office_id) REFERENCES offices(office_id) ON DELETE CASCADE
);

-- Tabel Vehicle Orders
CREATE TABLE vehicle_orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE NOT NULL,
    usage_date DATE NOT NULL,
    order_status ENUM('Approve', 'Pending', 'Cancelled') NOT NULL,
    vehicle_id INT NOT NULL,
    employee_id INT NOT NULL,
    supervisor_id INT NOT NULL,
    driver_id INT DEFAULT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (supervisor_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);

-- Tabel Approval Levels (Persetujuan Berjenjang)
CREATE TABLE approval_levels (
    approval_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    approver_id INT NOT NULL,
    approval_level INT NOT NULL, -- Level persetujuan
    approval_status ENUM('Approved', 'Pending', 'Rejected') NOT NULL DEFAULT 'Pending',
    approval_date DATE DEFAULT NULL,
    FOREIGN KEY (order_id) REFERENCES vehicle_orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (approver_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- Tabel Usage History
CREATE TABLE usage_history (
    history_id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    distance INT NOT NULL,
    bbm_usage INT NOT NULL,
    vehicle_id INT NOT NULL,
    employee_id INT NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- Tabel Service Schedules
CREATE TABLE service_schedules (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_date DATE NOT NULL,
    service_type VARCHAR(255) NOT NULL,
    service_status ENUM('Done', 'On Progress') NOT NULL,
    vehicle_id INT NOT NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);

-- Tabel Vehicle Usage Analytics (untuk data dashboard)
CREATE TABLE vehicle_usage_analytics (
    analytics_id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_id INT NOT NULL,
    usage_month YEAR(4) NOT NULL,
    total_usage INT NOT NULL, 
    total_distance INT NOT NULL, 
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);



