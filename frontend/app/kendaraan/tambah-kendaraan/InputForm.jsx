import React, { useEffect, useState } from "react";
import AddVehicleButton from "./AddVehicleButton";

const InputForm = () => {
  const vehicleTypes = [
    { id: 1, type: "Mobil" },
    { id: 2, type: "Motor" },
    { id: 3, type: "Truk" },
  ];

  const offices = [
    { id: 1, name: "Office 1" },
    { id: 2, name: "Office 2" },
  ];
  // const [vehicleTypes, setVehicleTypes] = useState([]);
  // const [offices, setOffices] = useState([]);

  // // Fetch data ketika komponen di-mount
  // useEffect(() => {
  //   // Fetch jenis kendaraan
  //   fetch("/api/vehicles")
  //     .then((response) => response.json())
  //     .then((data) => setVehicleTypes(data))
  //     .catch((error) => console.error("Error fetching vehicles:", error));

  //   // Fetch data office
  //   fetch("/api/offices")
  //     .then((response) => response.json())
  //     .then((data) => setOffices(data))
  //     .catch((error) => console.error("Error fetching offices:", error));
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex">
      <form onSubmit={handleSubmit} className="space-y-4 w-96 flex flex-col">
        {/* Nama Pemesan */}
        <div className="relative">
          <input
            type="text"
            placeholder="Nama Kendaraan"
            className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm focus:ring-2 focus:ring-green-4 focus:outline-none"
          />
        </div>

        {/* Jenis Kendaraan */}
        <div className="relative">
          <select className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm appearance-none focus:ring-2 focus:ring-green-4 focus:outline-none">
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
        </div>

        {/* Office */}
        <div className="relative">
          <select className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm appearance-none focus:ring-2 focus:ring-green-4 focus:outline-none">
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
        </div>

        {/* Pilih Driver */}
        <div className="relative">
          <input
            type="text"
            placeholder="Capacity"
            className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm focus:ring-2 focus:ring-green-4 focus:outline-none"
          />
        </div>

        {/* Pilih Kendaraan */}
        <div className="relative">
          <select className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm appearance-none focus:ring-2 focus:ring-green-4 focus:outline-none">
            <option value="">Ownership</option>
            <option value="owned">Owned</option>
            <option value="rented">Rented</option>
          </select>
          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            ⌄
          </span>
        </div>

        {/* Tombol Kirim */}
        <AddVehicleButton />
      </form>
    </div>
  );
};

export default InputForm;
