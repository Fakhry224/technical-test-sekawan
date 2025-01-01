-- Insert into regions
INSERT INTO regions (region_name) VALUES
('Wilayah Utara'),
('Wilayah Selatan'),
('Wilayah Timur'),
('Wilayah Barat');

-- Insert into offices
INSERT INTO offices (office_name, office_type, address, region_id) VALUES
('Kantor Pusat', 'Headquarters', 'Jl. Merdeka No. 1, Jakarta', 1),
('Kantor Cabang Bandung', 'Branch', 'Jl. Asia Afrika No. 45, Bandung', 2),
('Kantor Cabang Surabaya', 'Branch', 'Jl. Pemuda No. 17, Surabaya', 3);

-- Insert into mines
INSERT INTO mines (mine_name, capacity, status, region_id) VALUES
('Tambang Batu Bara Kalimantan', 1000, 'Active', 1),
('Tambang Nikel Sulawesi', 800, 'Active', 3),
('Tambang Emas Papua', 1200, 'Non-Active', 4);

-- Insert into employees
INSERT INTO employees (employee_name, employee_rank, employee_email, supervisor_id) VALUES
('Budi Santoso', 'Manager', 'budi.santoso@example.com', NULL),
('Rina Kartika', 'Supervisor', 'rina.kartika@example.com', 1),
('Ali Mustofa', 'Employee', 'ali.mustofa@example.com', 5),
('Siti Aminah', 'Employee', 'siti.aminah@example.com', 5);
('Rahmat Hidayat', 'Driver', 'rahmat.hidayat@example.com', 2),
('Lina Mariani', 'Driver', 'lina.mariani@example.com', 2),
('Didi Setiawan', 'Supervisor', 'didi.setiawan@example.com', 4),
('Tari Agustina', 'Driver', 'tari.agustina@example.com', 2),
('Umar Zainal', 'Employee', 'umar.zainal@example.com', 5),
('Fitri Handayani', 'Driver', 'fitri.handayani@example.com', 2);


-- Insert into users
INSERT INTO users (name, email, password, role, employee_id) VALUES
('admin', 'admin@example.com', 'admin123', 'Admin', 1),
('approver_rina', 'rina@example.com', 'approver123', 'Approver', 2),
('user_ali', 'ali@example.com', 'user123', 'Normal User', 3);

-- Insert into vehicles
INSERT INTO vehicles (vehicle_type, capacity, vehicle_status, office_id) VALUES
('Passenger', 5, 'Owned', 1),
('Freight', 10, 'Rented', 2),
('Passenger', 7, 'Owned', 3);
('Passenger', 4, 'Rented', 1),
('Freight', 15, 'Owned', 2),
('Passenger', 6, 'Owned', 3),
('Passenger', 8, 'Rented', 1),
('Freight', 20, 'Owned', 2);

-- Insert into vehicle_orders
INSERT INTO vehicle_orders (usage_date, return_date, bbm_usage, order_status, vehicle_id, employee_id, supervisor_id, driver_id) VALUES
('2025-01-05', '2025-01-06', 30, 'Approved', 1, 3, 2, 4),
('2025-01-07', '2025-01-08', 0, 'Pending', 2, 3, 2, NULL),
('2025-01-10', '2025-01-12', 20, 'Pending', 3, 3, 2, 4);
('2025-01-15', '2025-01-16', 15, 'Approved', 4, 3, 2, 5),
('2025-01-18', '2025-01-19', 40, 'Approved', 5, 3, 2, 6),
('2025-01-20', '2025-01-21', 25, 'Rejected', 6, 3, 2, 7),
('2025-01-25', '2025-01-27', 50, 'Pending', 7, 3, 2, 8),
('2025-01-28', '2025-01-30', 35, 'Approved', 8, 3, 2, 9),
('2025-02-01', '2025-02-02', 20, 'Pending', 1, 3, 2, 10);

-- Insert into service_schedules
INSERT INTO service_schedules (service_date, service_type, service_status, vehicle_id) VALUES
('2025-01-15', 'Perawatan Mesin', 'Done', 1),
('2025-01-20', 'Penggantian Ban', 'On Progress', 2),
('2025-01-25', 'Pemeriksaan Rem', 'Not Started', 3);
