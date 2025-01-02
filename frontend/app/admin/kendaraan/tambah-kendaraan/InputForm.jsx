import React, { useState } from "react";
import AddVehicleButton from "./AddVehicleButton";

const InputForm = ({ officesData }) => {
  const [formData, setFormData] = useState({
    vehicleName: "",
    vehicleType: "",
    office: "",
    capacity: "",
    ownership: "",
  });

  const [errors, setErrors] = useState({});

  const vehicleTypes = [
    { id: 1, type: "Passenger" },
    { id: 2, type: "Freight" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.vehicleName)
      newErrors.vehicleName = "Nama kendaraan wajib diisi.";
    if (!formData.vehicleType)
      newErrors.vehicleType = "Jenis kendaraan wajib dipilih.";
    if (!formData.office) newErrors.office = "Office wajib dipilih.";
    if (!formData.capacity) newErrors.capacity = "Capacity wajib diisi.";
    if (!formData.ownership) newErrors.ownership = "Ownership wajib dipilih.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const selectedOffice = officesData.find(
      (office) => office.name === formData.office
    );

    const payload = {
      vehicle_type: formData.vehicleType,
      capacity: parseInt(formData.capacity),
      vehicle_status: formData.ownership,
      office_id: selectedOffice?.id,
    };

    try {
      const response = await fetch("http://localhost:8000/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage("Vehicle berhasil ditambahkan!");
        setFormData({
          vehicleName: "",
          vehicleType: "",
          office: "",
          capacity: "",
          ownership: "",
        });
        console.log("Response:", data);
      } else {
        const errorData = await response.json();
        setErrors({
          apiError: errorData.message || "Gagal menambahkan vehicle.",
        });
      }
    } catch (error) {
      setErrors({ apiError: "Terjadi kesalahan pada server." });
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center px-4 sm:px-8 lg:px-16">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-lg flex flex-col bg-white p-6 shadow-md rounded-xl"
      >
        {/* Nama Kendaraan */}
        <div className="relative">
          <input
            type="text"
            name="vehicleName"
            value={formData.vehicleName}
            onChange={handleInputChange}
            placeholder="Nama Kendaraan"
            className={`w-full border rounded-lg px-4 py-3 text-base sm:text-lg shadow-sm focus:ring-2 ${
              errors.vehicleName
                ? "border-red-500 ring-red-500"
                : "focus:ring-green-4"
            } focus:outline-none`}
          />
          {errors.vehicleName && (
            <p className="text-red-500 text-sm">{errors.vehicleName}</p>
          )}
        </div>

        {/* Jenis Kendaraan */}
        <div className="relative">
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleInputChange}
            className={`w-full border rounded-lg px-4 py-3 text-base sm:text-lg shadow-sm appearance-none focus:ring-2 ${
              errors.vehicleType
                ? "border-red-500 ring-red-500"
                : "focus:ring-green-4"
            } focus:outline-none`}
          >
            <option value="">Jenis Kendaraan</option>
            {vehicleTypes.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.type}>
                {vehicle.type}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            ⌄
          </span>
          {errors.vehicleType && (
            <p className="text-red-500 text-sm">{errors.vehicleType}</p>
          )}
        </div>

        {/* Office */}
        <div className="relative">
          <select
            name="office"
            value={formData.office}
            onChange={handleInputChange}
            className={`w-full border rounded-lg px-4 py-3 text-base sm:text-lg shadow-sm appearance-none focus:ring-2 ${
              errors.office
                ? "border-red-500 ring-red-500"
                : "focus:ring-green-4"
            } focus:outline-none`}
          >
            <option value="">Office</option>
            {offices.map((office) => (
              <option key={office.id} value={office.name}>
                {office.name}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            ⌄
          </span>
          {errors.office && (
            <p className="text-red-500 text-sm">{errors.office}</p>
          )}
        </div>

        {/* Capacity */}
        <div className="relative">
          <input
            type="text"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            placeholder="Capacity"
            className={`w-full border rounded-lg px-4 py-3 text-base sm:text-lg shadow-sm focus:ring-2 ${
              errors.capacity
                ? "border-red-500 ring-red-500"
                : "focus:ring-green-4"
            } focus:outline-none`}
          />
          {errors.capacity && (
            <p className="text-red-500 text-sm">{errors.capacity}</p>
          )}
        </div>

        {/* Ownership */}
        <div className="relative">
          <select
            name="ownership"
            value={formData.ownership}
            onChange={handleInputChange}
            className={`w-full border rounded-lg px-4 py-3 text-base sm:text-lg shadow-sm appearance-none focus:ring-2 ${
              errors.ownership
                ? "border-red-500 ring-red-500"
                : "focus:ring-green-4"
            } focus:outline-none`}
          >
            <option value="">Ownership</option>
            <option value="owned">Owned</option>
            <option value="rented">Rented</option>
          </select>
          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            ⌄
          </span>
          {errors.ownership && (
            <p className="text-red-500 text-sm">{errors.ownership}</p>
          )}
        </div>

        {/* Tombol Kirim */}
        <AddVehicleButton />
      </form>
    </div>
  );
};

export default InputForm;
