"use client";

import Image from "next/image";
import Navbar from "./(components)/Header";
import Tabs from "./(components)/Tabs";
import Sidebar from "./(components)/Sidebar";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-10">
        <h1 className="text-9xl font-bold">Perusahaan Tambang</h1>
        <div className="flex gap-10 text-2xl">
          <Link href="/login" className="hover:text-blue-1">
            Login
          </Link>
          <Link href="/sign-up" className="hover:text-blue-1">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
