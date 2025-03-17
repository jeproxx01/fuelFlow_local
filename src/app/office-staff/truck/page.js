"use client";
import { useState } from "react";

export default function ManageTruck() {
  const [imageSrc, setImageSrc] = useState("/truck.jpg");

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
      <h1 className="text-2xl font-bold mb-4">Manage Trucks</h1>

      {/* Truck List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {["Truck 1", "Truck 2", "Truck 3"].map((truck, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <h2 className="text-lg font-semibold mb-2">{truck}</h2>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Edit Truck Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
