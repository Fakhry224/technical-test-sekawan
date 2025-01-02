"use client";

import React, { useState } from "react";
import ConfirmDialog from "@/app/(components)/ConfirmDialog";
import * as XLSX from "xlsx";

const DownloadButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/vehicle-orders/3"
      );
      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Data format is not valid.");
      }

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Vehicle Orders");

      worksheet["!cols"] = [
        { wch: 15 }, // Order ID
        { wch: 20 }, // Order Date
        { wch: 20 }, // Usage Date
        { wch: 15 }, // Order Status
        { wch: 15 }, // Vehicle ID
        { wch: 15 }, // Employee ID
        { wch: 15 }, // Supervisor ID
        { wch: 15 }, // Driver ID
      ];

      XLSX.writeFile(workbook, "Vehicle_Orders_Report.xlsx");
    } catch (error) {
      console.error("Error downloading Excel file:", error);
      alert("Gagal mengunduh laporan.");
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="self-center lg:self-end w-fit lg:w-[50%] bg-green-1 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-4 focus:outline-none focus:ring-2 focus:ring-green-4"
      >
        Unduh Laporan
      </button>
      {isDialogOpen && (
        <ConfirmDialog
          title="Apakah Anda ingin mengunduh laporan?"
          message="Laporan akan diunduh dalam format Excel."
          onConfirm={handleDownload}
          onCancel={() => setIsDialogOpen(false)}
          confirmMessage="Unduh"
          cancelMessage="Batalkan"
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
};

export default DownloadButton;
