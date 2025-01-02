import React, { useState } from "react";
import ConfirmDialog from "@/app/(components)/ConfirmDialog";

const OrderButton = ({ onConfirm, loading }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="self-end ml-auto w-[50%] bg-green-1 text-green-5 font-semibold py-3 rounded-lg shadow-md hover:bg-green-4 focus:outline-none focus:ring-2 focus:ring-green-4"
        disabled={loading}
      >
        {loading ? "Memproses..." : "Kirim Pemesanan"}
      </button>

      {isDialogOpen && (
        <ConfirmDialog
          title="Apakah anda ingin melakukan pemesanan?"
          message="Note: Pemesanan yang sudah dilakukan tidak dapat di-cancel!"
          onConfirm={() => {
            onConfirm();
            setIsDialogOpen(false);
          }}
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
