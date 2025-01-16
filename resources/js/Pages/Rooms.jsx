import { Head } from '@inertiajs/react';
import AdminDashboard from "../Layouts/AdminDashboard";
import React, { useState } from "react";

const rooms = [
    { number: "#001", bed: "Double bed", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Available" },
      { number: "#002", bed: "Single bed", floor: "Floor -2", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Booked" },
      { number: "#003", bed: "VIP", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Booked" },
      { number: "#004", bed: "VIP", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Reserved" },
      { number: "#005", bed: "Single bed", floor: "Floor -1", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Reserved" },
      { number: "#006", bed: "Double bed", floor: "Floor -2", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Waitlist" },
      { number: "#007", bed: "Double bed", floor: "Floor -3", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Available" },
      { number: "#008", bed: "Single bed", floor: "Floor -5", facility: "AC, shower, Double bed, towel, bathtub, TV", status: "Blocked" },
  ];
  
export default function Guest() {



  const statusClasses = {
    Available: "bg-[#E8F1FD] text-[#448DF2]",
    Booked: "bg-[#FEECEB] text-[#F36960]",
    Reserved: "bg-[#E7F8F0] text-[#41C588]",
    "Waitlist": "bg-[#FEF4E6] text-[#F9A63A]",
    "Blocked": "bg-[#FEF4E6] text-[#F9A63A]",
  };


    return (
        <>
            <Head title="Rooms" />

            <AdminDashboard>
                <h3 className="mb-4 text-[#024635]">Rooms</h3>         
            <div className="p-4 bg-white">
                <div className="flex items-center justify-between mb-4">
                    <div>
                    <button className="px-4 py-2 bg-[#C2F8EB]  border border-[#024635] text-[#024635] rounded-3xl mr-4">All Room (100)</button>
                    <button className="px-4 py-2 bg-white border border-[#989FAD] text-[#5D6679] rounded-3xl mr-4">Available Room (20)</button>
                    <button className="px-4 py-2 bg-white border border-[#989FAD] text-[#5D6679] rounded-3xl">Booked (80)</button>
                    </div>
                   
                   <button className="px-6 py-3 bg-[#024635] text-[#F8B008] rounded-lg" >Add Rooms</button>
                </div>

                    <table className="min-w-full">
                        <thead className="bg-[#F7F9FC]">
                        <tr>
                            <th className="px-4 py-2 text-center text-[#667085]">Room Number</th>
                            <th className="px-4 py-2 text-center text-[#667085]">Bed Typer</th>
                            <th className="px-4 py-2 text-center text-[#667085]">Room Number</th>
                            <th className="px-4 py-2 text-center text-[#667085]">Room Facility</th>
                            <th className="px-4 py-2 text-center text-[#667085]">Status</th>
                            <th className="px-2 py-2 text-center text-[#667085]">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rooms.map((room, index) => (
                        <tr key={index}>
                        <td className="px-4 py-4 text-center text-[#2B2F38] font-bold">{room.number}</td>
                        <td className="px-4 py-2 text-center text-[#5D6679]">{room.bed}</td>
                        <td className="px-4 py-2 text-center text-[#5D6679]">{room.floor}</td>
                        <td className="px-4 py-2 text-center text-[#5D6679]">{room.facility}</td>
                        <td className="px-4 py-2 text-center">
                            <span className={`px-2 py-1 rounded-3xl ${statusClasses[room.status]}`}>
                            {room.status}
                            </span>
                        </td>
                        <td className="px-4 py-2 text-center">
                            <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6h.01M12 12h.01M12 18h.01"
                            />
                            </svg>
                        </td>
                        </tr>
                    ))}
                        </tbody>
                    </table>

                <div className="flex justify-between items-center mt-4">
                    <button className="px-4 py-2 bg-white text-[#667085] border border-[#667085] rounded">Previous</button>
                    <button className="px-4 py-2 bg-white rounded-xl border border-[#858D9D] text-[#858D9D]">Next</button>
                </div>
           </div>
            </AdminDashboard>
              
        </>
    );
}