"use client";

import React, { useEffect, useState } from "react";
import Header from "../../../(components)/Header";
import Sidebar from "../../../(components)/Sidebar";
import InputForm from "./InputForm";
import Image from "next/image";

const KendaraanForm = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/offices");

        const data = await response.json();

        Array.isArray(data) ? setOffices(data) : setOffices([data]);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error: {error}</p>;

  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row p-4 sm:p-8 lg:p-10 gap-6 lg:gap-10">
        <Sidebar />
        <div className="flex flex-col bg-green-5 rounded-3xl drop-shadow-lg p-6 sm:p-8 lg:p-10 w-full">
          {/* Header */}
          <div className="flex flex-col justify-start">
            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-4 sm:mb-5">
              Form Tambah Kendaraan
            </h1>
            <span className="h-[1px] w-full lg:w-[40rem] bg-black"></span>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:flex-row justify-around items-center gap-6 lg:gap-10 my-6 sm:my-8 lg:my-10">
            {/* Illustration */}
            <div className="flex justify-center lg:justify-start w-full lg:w-auto">
              <Image
                src="/illustrations/van-illustration.svg"
                alt="ilustrasi van"
                width={340}
                height={300}
                className="max-w-full h-auto"
              />
            </div>
            {/* Form */}
            <div className="w-full max-w-lg">
              <InputForm officesData={offices} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KendaraanForm;
