import ConfirmDialog from "@/app/(components)/ConfirmDialog";
import React, { useState } from "react";

const AddVehicleButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="self-end w-[50%] bg-green-1 text-green-5 font-semibold py-3 rounded-lg shadow-md hover:bg-green-4 focus:outline-none focus:ring-2 focus:ring-green-4"
      >
        Tambah Kendaraan
      </button>
      {isDialogOpen && (
        <ConfirmDialog
          title="Apakah anda ingin menambah kendaraan?"
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

export default AddVehicleButton;
