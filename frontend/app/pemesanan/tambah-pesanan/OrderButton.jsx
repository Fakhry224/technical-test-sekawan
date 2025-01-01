"use client";

import ConfirmDialog from "@/app/(components)/ConfirmDialog";
import React, { useState } from "react";

const OrderButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="self-end w-[50%] bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Kirim Pemesanan
      </button>

      {isDialogOpen && (
        <ConfirmDialog
          title="Apakah anda ingin melakukan pemesanan?"
          message="Note: Pemesanan yang sudah dilakukan, tidak dapat di cancel!"
          onConfirm={() => setIsDialogOpen(false)}
          onCancel={() => setIsDialogOpen(false)}
          confirmMessage="Lakukan"
          cancelMessage="Batalkan"
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
};

export default OrderButton;
