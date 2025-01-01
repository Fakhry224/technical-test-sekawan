import React from "react";
import AddServiceButton from "./AddServiceButton";

const InputForm = () => {
  const vehicles = [
    { id: 1, type: "Mobil" },
    { id: 2, type: "Motor" },
    { id: 3, type: "Truk" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex">
      <form onSubmit={handleSubmit} className="space-y-4 w-96 flex flex-col">
        {/* Jenis Kendaraan */}
        <div className="relative">
          <select className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm appearance-none focus:ring-2 focus:ring-green-4 focus:outline-none">
            <option value="">Kendaraan</option>
            {vehicles.map((vehicles) => (
              <option key={vehicles.id} value="vehicle.type">
                {vehicles.type}
              </option>
            ))}
          </select>
          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            ⌄
          </span>
        </div>

        {/* Tanggal Servis */}
        <div className="relative">
          <label
            htmlFor="tanggal-servis"
            className="block text-gray-700 mb-2 font-bold"
          >
            Tanggal Servis
          </label>
          <input
            id="tanggal-servis"
            type="date"
            className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm focus:ring-2 focus:ring-green-4 focus:outline-none"
          />
        </div>

        {/* Tombol Kirim */}
        <AddServiceButton />
      </form>
    </div>
  );
};

export default InputForm;
