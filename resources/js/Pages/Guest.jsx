import { Head } from '@inertiajs/react';
import AdminDashboard from "../Layouts/AdminDashboard";
import React, { useState } from "react";

const reservations = [
    { id: "#5644", name: "Alexander", room: "A647", total: 467, paid: 200, status: "Clean" },
    { id: "#6112", name: "Pegasus", room: "A456", total: 645, paid: 250, status: "Dirty" },
    { id: "#6141", name: "Martin", room: "A645", total: 686, paid: 400, status: "Dirty" },
    { id: "#6535", name: "Cecil", room: "A684", total: 8413, paid: 2500, status: "Inspected" },
    { id: "#6541", name: "Luke", room: "B464", total: 841, paid: 400, status: "Clean" },
    { id: "#9846", name: "Yadrin", room: "C648", total: 684, paid: 300, status: "Clean" },
    { id: "#4921", name: "Kiand", room: "D644", total: 984, paid: 513, status: "Pick up" },
    { id: "#9841", name: "Turen", room: "B641", total: 984, paid: 600, status: "Dirty" },
  ];
  
export default function Guest() {

    const [search, setSearch] = useState("");

  const filteredReservations = reservations.filter((reservation) =>
    reservation.room.toLowerCase().includes(search.toLowerCase())
  );

  const statusClasses = {
    Clean: "bg-[#E8F1FD] text-[#448DF2]",
    Dirty: "bg-[#FEECEB] text-[#F36960]",
    Inspected: "bg-[#E7F8F0] text-[#41C588]",
    "Pick up": "bg-[#FEF4E6] text-[#F9A63A]",
  };


    return (
        <>
            <Head title="Guest" />

            <AdminDashboard>
                <h3 className="mb-4 text-[#024635]">Guests</h3>         
            <div className="p-4 bg-white">
                <div className="flex items-center justify-between mb-4">
                    <div>
                    <button className="px-4 py-2 bg-[#C2F8EB]  border border-[#024635] text-[#024635] rounded-3xl mr-4">Check in</button>
                    <button className="px-4 py-2 bg-white border border-[#989FAD] text-[#5D6679] rounded-3xl">Check out</button>
                    </div>
                   
                    <input
                    type="text"
                    placeholder="Search by room number"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded"
                    />
                </div>

                    <table className="min-w-full">
                        <thead className="bg-[#F7F9FC]">
                        <tr>
                            <th className="px-4 py-2 text-center text-[#667085]">Reservation ID</th>
                            <th className="px-4 py-2 text-center text-[#667085]">Name</th>
                            <th className="px-4 py-2 text-center text-[#667085]">Room Number</th>
                            <th className="px-4 py-2 text-center text-[#667085]">Total Amount</th>
                            <th className="px-4 py-2 text-center text-[#667085]">Amount Paid</th>
                            <th className="px-4 py-2 text-center text-[#667085]">Status</th>
                            <th className="px-2 py-2 text-center text-[#667085]">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredReservations.map((reservation) => (
                            <tr key={reservation.id}>
                            <td className="px-4 py-4 text-center text-[#2B2F38] font-bold">{reservation.id}</td>
                            <td className="px-4 py-2 text-center text-[#5D6679]">{reservation.name}</td>
                            <td className="px-4 py-2 text-center text-[#5D6679]">{reservation.room}</td>
                            <td className="px-4 py-2 text-center text-[#5D6679]">${reservation.total}</td>
                            <td className="px-4 py-2 text-center text-[#5D6679]">${reservation.paid}</td>
                            <td className="px-4 py-2 text-center">
                                <span className={`px-2 py-1 rounded-3xl ${statusClasses[reservation.status]}`}>
                                {reservation.status}
                                
                                </span>
                            </td>
                            <td> 
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