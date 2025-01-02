"use client";

import React, { useState } from "react";

import Image from "next/image";
import ConfirmDialog from "../../(components)/ConfirmDialog";

export default function ApproveButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <div
        className="flex rounded-full bg-green-3 text-white text-lg font-semibold text-center py-2 px-5 my-2 cursor-pointer transition-colors hover:bg-green-1 group"
        onClick={() => setIsDialogOpen(true)}
      >
        Approve{" "}
        <span>
          <Image
            src="/icons/right-arrow-icon.svg"
            alt="icon panah kanan"
            width={24}
            height={24}
          />
        </span>
      </div>

      {isDialogOpen && (
        <ConfirmDialog
          title="Apakah anda ingin melakukan persetujuan?"
          message="Note: Pengajuan akan dialihkan ke manager terlebih dahulu!"
          onConfirm=""
          onCancel=""
          confirmMessage="Approve"
          cancelMessage="Reject"
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
}
