import React from "react";
import OrderButton from "./OrderButton";

const InputForm = () => {
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
            placeholder="Nama Pemesan"
            className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm focus:ring-2 focus:ring-green-4 focus:outline-none"
          />
        </div>

        {/* Jenis Kendaraan */}
        <div className="relative">
          <select className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm appearance-none focus:ring-2 focus:ring-green-4 focus:outline-none">
            <option value="">Jenis Kendaraan</option>
            <option value="passanger">Passanger</option>
            <option value="freight">Freight</option>
          </select>
          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            ⌄
          </span>
        </div>

        {/* Pilih Kendaraan */}
        <div className="relative">
          <select className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm appearance-none focus:ring-2 focus:ring-green-4 focus:outline-none">
            <option value="">Pilih Kendaraan</option>
            <option value="avanza">Avanza</option>
            <option value="innova">Innova</option>
          </select>
          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            ⌄
          </span>
        </div>

        {/* Pilih Driver */}
        <div className="relative">
          <select className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm appearance-none focus:ring-2 focus:ring-green-4 focus:outline-none">
            <option value="">Pilih Driver</option>
            <option value="agus">Agus</option>
            <option value="budi">Budi</option>
          </select>
          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            ⌄
          </span>
        </div>

        {/* Tanggal Penggunaan */}
        <div className="relative">
          <label
            htmlFor="tanggal-penggunaan"
            className="block text-gray-700 mb-2 font-bold"
          >
            Tanggal Penggunaan
          </label>
          <input
            id="tanggal-penggunaan"
            type="date"
            className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm focus:ring-2 focus:ring-green-4 focus:outline-none"
          />
        </div>

        {/* Tanggal Pengembalian */}
        <div className="relative">
          <label
            htmlFor="tanggal-pengembalian"
            className="block text-gray-700 mb-2 font-bold"
          >
            Tanggal Pengembalian
          </label>
          <input
            id="tanggal-pengembalian"
            type="date"
            className="w-full border rounded-lg px-4 py-3 text-lg shadow-sm focus:ring-2 focus:ring-green-4 focus:outline-none"
          />
        </div>

        <OrderButton />
      </form>
    </div>
  );
};

export default InputForm;
