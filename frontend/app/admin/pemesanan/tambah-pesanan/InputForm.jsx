import React, { useState } from "react";
import OrderButton from "./OrderButton";

const InputForm = () => {
  const [formData, setFormData] = useState({
    namaPemesan: "",
    jenisKendaraan: "",
    pilihKendaraan: "",
    pilihDriver: "",
    tanggalPenggunaan: "",
    tanggalPengembalian: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "Field ini wajib diisi";
      }
    });
    return newErrors;
  };

  const handleApiSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return false;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/vehicle-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_date: new Date().toISOString().split("T")[0],
          usage_date: formData.tanggalPenggunaan,
          return_date: formData.tanggalPengembalian,
          order_status: "Pending",
          vehicle_id: formData.pilihKendaraan,
          employee_id: 1, // Ganti dengan ID pegawai
          supervisor_id: 1, // Ganti dengan ID supervisor
          driver_id: formData.pilihDriver || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal melakukan pemesanan");
      }

      alert("Pemesanan berhasil dilakukan!");
      setFormData({
        namaPemesan: "",
        jenisKendaraan: "",
        pilihKendaraan: "",
        pilihDriver: "",
        tanggalPenggunaan: "",
        tanggalPengembalian: "",
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center px-4 sm:p-6 lg:p-16">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-6 w-full max-w-lg bg-white rounded-xl shadow-md p-6"
      >
        {/* Nama Pemesan */}
        <div className="relative">
          <input
            type="text"
            name="namaPemesan"
            placeholder="Nama Pemesan"
            value={formData.namaPemesan}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-3 text-sm sm:text-base shadow-sm focus:ring-2 focus:outline-none ${
              errors.namaPemesan
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-green-4"
            }`}
          />
          {errors.namaPemesan && (
            <p className="text-red-500 text-xs mt-1">{errors.namaPemesan}</p>
          )}
        </div>

        {/* Jenis Kendaraan */}
        <div className="relative">
          <select
            name="jenisKendaraan"
            value={formData.jenisKendaraan}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-3 text-sm sm:text-base shadow-sm appearance-none focus:outline-none ${
              errors.jenisKendaraan
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-green-4"
            }`}
          >
            <option value="">Jenis Kendaraan</option>
            <option value="passanger">Passanger</option>
            <option value="freight">Freight</option>
          </select>
          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            ⌄
          </span>
          {errors.jenisKendaraan && (
            <p className="text-red-500 text-xs mt-1">{errors.jenisKendaraan}</p>
          )}
        </div>

        {/* Pilih Kendaraan */}
        <div className="relative">
          <select
            name="pilihKendaraan"
            value={formData.pilihKendaraan}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-3 text-sm sm:text-base shadow-sm appearance-none focus:outline-none ${
              errors.pilihKendaraan
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-green-4"
            }`}
          >
            <option value="">Pilih Kendaraan</option>
            <option value="avanza">Avanza</option>
            <option value="innova">Innova</option>
          </select>
          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            ⌄
          </span>
          {errors.pilihKendaraan && (
            <p className="text-red-500 text-xs mt-1">{errors.pilihKendaraan}</p>
          )}
        </div>

        {/* Pilih Driver */}
        <div className="relative">
          <select
            name="pilihDriver"
            value={formData.pilihDriver}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-3 text-sm sm:text-base shadow-sm appearance-none focus:outline-none ${
              errors.pilihDriver
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-green-400"
            }`}
          >
            <option value="">Pilih Driver</option>
            <option value="agus">Agus</option>
            <option value="budi">Budi</option>
          </select>
          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            ⌄
          </span>
          {errors.pilihDriver && (
            <p className="text-red-500 text-xs mt-1">{errors.pilihDriver}</p>
          )}
        </div>

        {/* Tanggal Penggunaan */}
        <div className="relative">
          <label
            htmlFor="tanggalPenggunaan"
            className="block text-gray-700 text-sm sm:text-base mb-2 font-medium"
          >
            Tanggal Penggunaan
          </label>
          <input
            id="tanggalPenggunaan"
            type="date"
            name="tanggalPenggunaan"
            value={formData.tanggalPenggunaan}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-3 text-sm sm:text-base shadow-sm focus:outline-none ${
              errors.tanggalPenggunaan
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-green-400"
            }`}
          />
          {errors.tanggalPenggunaan && (
            <p className="text-red-500 text-xs mt-1">
              {errors.tanggalPenggunaan}
            </p>
          )}
        </div>

        {/* Tanggal Pengembalian */}
        <div className="relative">
          <label
            htmlFor="tanggalPengembalian"
            className="block text-gray-700 text-sm sm:text-base mb-2 font-medium"
          >
            Tanggal Pengembalian
          </label>
          <input
            id="tanggalPengembalian"
            type="date"
            name="tanggalPengembalian"
            value={formData.tanggalPengembalian}
            onChange={handleChange}
            className={`w-full border rounded-lg px-4 py-3 text-sm sm:text-base shadow-sm focus:outline-none ${
              errors.tanggalPengembalian
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-green-4"
            }`}
          />
          {errors.tanggalPengembalian && (
            <p className="text-red-500 text-xs mt-1">
              {errors.tanggalPengembalian}
            </p>
          )}
        </div>

        {/* Tombol Pesan */}
        <OrderButton onConfirm={handleApiSubmit} loading={loading} />
      </form>
    </div>
  );
};

export default InputForm;
