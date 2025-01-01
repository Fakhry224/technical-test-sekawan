-- Table: users
CREATE TABLE users (
    user_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL DEFAULT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Approver', 'Normal User') DEFAULT 'Normal User',
    employee_id BIGINT UNSIGNED NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);

-- Table: employees
CREATE TABLE employees (
    employee_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(255) NOT NULL,
    employee_rank ENUM('Employee', 'Supervisor', 'Manager', 'Driver') NOT NULL,
    employee_email VARCHAR(255) UNIQUE NOT NULL,
    supervisor_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supervisor_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);

-- Table: regions
CREATE TABLE regions (
    region_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    region_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: offices
CREATE TABLE offices (
    office_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    office_name VARCHAR(255) NOT NULL,
    office_type ENUM('Headquarters', 'Branch') NOT NULL,
    address VARCHAR(255) DEFAULT NULL,
    region_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (region_id) REFERENCES regions(region_id) ON DELETE CASCADE
);

-- Table: mines
CREATE TABLE mines (
    mine_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    mine_name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    status ENUM('Active', 'Non-Active') NOT NULL,
    region_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (region_id) REFERENCES regions(region_id) ON DELETE CASCADE
);

-- Table: vehicles
CREATE TABLE vehicles (
    vehicle_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    vehicle_type ENUM('Passenger', 'Freight') NOT NULL,
    capacity INT NOT NULL,
    vehicle_status ENUM('Owned', 'Rented') NOT NULL,
    office_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (office_id) REFERENCES offices(office_id) ON DELETE CASCADE
);

-- Table: vehicle_orders
CREATE TABLE vehicle_orders (
    order_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    usage_date DATE NOT NULL,
    return_date DATE NOT NULL,
    bbm_usage INT NOT NULL DEFAULT 0,
    order_status ENUM('Approved', 'Pending', 'Rejected') NOT NULL,
    vehicle_id BIGINT UNSIGNED NOT NULL,
    employee_id BIGINT UNSIGNED NOT NULL,
    supervisor_id BIGINT UNSIGNED NOT NULL,
    driver_id BIGINT UNSIGNED NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (supervisor_id) REFERENCES employees(employee_id) ON DELETE CASCADE,
    FOREIGN KEY (driver_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);

-- Table: service_schedules
CREATE TABLE service_schedules (
    service_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    service_date DATE NOT NULL,
    service_type VARCHAR(255) NOT NULL,
    service_status ENUM('Done', 'On Progress', 'Not Started') NOT NULL,
    vehicle_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(vehicle_id) ON DELETE CASCADE
);

-- Table: personal_access_tokens
CREATE TABLE personal_access_tokens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tokenable_type VARCHAR(255) NOT NULL,
    tokenable_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    token CHAR(64) UNIQUE NOT NULL,
    abilities TEXT DEFAULT NULL,
    last_used_at TIMESTAMP NULL DEFAULT NULL,
    expires_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: sessions
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    payload LONGTEXT NOT NULL,
    last_activity INT NOT NULL,
    INDEX (user_id),
    INDEX (last_activity),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
