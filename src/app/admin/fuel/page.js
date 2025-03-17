"use client";
import { useState } from "react";

export default function ManageFuel() {
  const [imageSrc, setImageSrc] = useState("/price.jpg");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageSrc(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Fuel Prices</h1>

      {/* Current Price Image */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-lg font-semibold mb-2">Current Price List</h2>
        <img
          src={imageSrc}
          alt="Fuel Price List"
          className="max-w-full h-auto rounded-lg"
        />
      </div>

      {/* Upload New Price List */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Update Price List</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
        />
      </div>
    </div>
  );
}
