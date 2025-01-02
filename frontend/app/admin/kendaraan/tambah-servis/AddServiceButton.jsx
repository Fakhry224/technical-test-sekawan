import ConfirmDialog from "@/app/(components)/ConfirmDialog";
import React, { useState } from "react";

const AddServiceButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="self-end w-[50%] bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Tambah Kendaraan
      </button>
      {isDialogOpen && (
        <ConfirmDialog
          title="Apakah anda ingin menambah jadwal servis kendaraan?"
          message=""
          onConfirm={() => setIsDialogOpen(false)}
          onCancel={() => setIsDialogOpen(false)}
          confirmMessage="Tambahkan"
          cancelMessage="Batalkan"
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
};

export default AddServiceButton;
