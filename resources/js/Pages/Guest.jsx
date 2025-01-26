import { Head, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';
import AdminDashboard from "../Layouts/AdminDashboard";

export default function Guest({ bookings = [], todayCheckoutCount = 0, viewingCheckouts = false }) {
    useEffect(() => {
        console.log('Guest component mounted with bookings:', { bookings, todayCheckoutCount, viewingCheckouts });
    }, [bookings, todayCheckoutCount, viewingCheckouts]);

    const [search, setSearch] = useState("");
    const [openMenuId, setOpenMenuId] = useState(null);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleViewChange = (viewCheckouts) => {
        router.get('/guest', { checkouts: viewCheckouts }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    if (!Array.isArray(bookings)) {
        console.error('Bookings is not an array:', bookings);
        return <div>Error: Invalid bookings data</div>;
    }

    const filteredBookings = bookings.filter((booking) =>
        (booking.room_number?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (booking.name?.toLowerCase() || '').includes(search.toLowerCase())
    );

    const statusClasses = {
        confirmed: "bg-[#E7F8F0] text-[#41C588]",
        cancelled: "bg-[#FEECEB] text-[#F36960]",
        pending: "bg-[#FFF4E5] text-[#F8B008]"
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid date';
        }
    };

    const handleDelete = (bookingId) => {
        setOpenMenuId(null); // Close dropdown
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#024635',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/bookings/${bookingId}`, {
                    onSuccess: () => {
                        Swal.fire(
                            'Deleted!',
                            'Booking has been deleted.',
                            'success'
                        );
                    },
                });
            }
        });
    };

    const handleStatusUpdate = (bookingId, currentStatus) => {
        setOpenMenuId(null); // Close dropdown
        const newStatus = currentStatus === 'confirmed' ? 'cancelled' : 'confirmed';
        
        Swal.fire({
            title: 'Update Status',
            text: `Change booking status to ${newStatus}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#024635',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.put(`/bookings/${bookingId}/status`, {
                    status: newStatus
                }, {
                    onSuccess: () => {
                        Swal.fire(
                            'Updated!',
                            `Booking status changed to ${newStatus}.`,
                            'success'
                        );
                    },
                });
            }
        });
    };

    const toggleDropdown = (bookingId) => {
        setOpenMenuId(openMenuId === bookingId ? null : bookingId);
    };

    return (
        <>
            <Head title="Guest" />

            <AdminDashboard>
                <h3 className="mb-4 text-[#024635]">
                    {viewingCheckouts ? "Today's Check-outs" : "Guests"}
                </h3>         
                <div className="p-4 bg-white">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <button 
                                onClick={() => handleViewChange(false)}
                                className={`px-4 py-2 border rounded-3xl mr-4 ${
                                    !viewingCheckouts 
                                        ? 'bg-[#C2F8EB] border-[#024635] text-[#024635]' 
                                        : 'bg-white border-[#989FAD] text-[#5D6679]'
                                }`}
                            >
                                Check in
                            </button>
                            <button 
                                onClick={() => handleViewChange(true)}
                                className={`px-4 py-2 border rounded-3xl ${
                                    viewingCheckouts 
                                        ? 'bg-[#C2F8EB] border-[#024635] text-[#024635]' 
                                        : 'bg-white border-[#989FAD] text-[#5D6679]'
                                }`}
                            >
                                Check out ({todayCheckoutCount})
                            </button>
                        </div>
                       
                        <input
                            type="text"
                            placeholder="Search by room number or guest name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-[#F7F9FC]">
                                <tr>
                                    <th className="px-4 py-2 text-center text-[#667085]">Booking ID</th>
                                    <th className="px-4 py-2 text-center text-[#667085]">Guest Name</th>
                                    <th className="px-4 py-2 text-center text-[#667085]">Room Number</th>
                                    <th className="px-4 py-2 text-center text-[#667085]">Room Type</th>
                                    <th className="px-4 py-2 text-center text-[#667085]">Check In</th>
                                    <th className="px-4 py-2 text-center text-[#667085]">Check Out</th>
                                    <th className="px-4 py-2 text-center text-[#667085]">Status</th>
                                    <th className="px-2 py-2 text-center text-[#667085]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td className="px-4 py-4 text-center text-[#2B2F38] font-bold">
                                            #{String(booking.id).padStart(4, '0')}
                                        </td>
                                        <td className="px-4 py-2 text-center text-[#5D6679]">{booking.name || 'N/A'}</td>
                                        <td className="px-4 py-2 text-center text-[#5D6679]">{booking.room_number || 'N/A'}</td>
                                        <td className="px-4 py-2 text-center text-[#5D6679] capitalize">{booking.room_type || 'N/A'}</td>
                                        <td className="px-4 py-2 text-center text-[#5D6679]">{formatDate(booking.check_in)}</td>
                                        <td className="px-4 py-2 text-center text-[#5D6679]">{formatDate(booking.check_out)}</td>
                                        <td className="px-4 py-2 text-center">
                                            <span className={`px-2 py-1 rounded-3xl ${statusClasses[booking.status] || statusClasses.pending}`}>
                                                {booking.status || 'pending'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2 text-center"> 
                                            <div className="relative" ref={dropdownRef}>
                                                <button 
                                                    onClick={() => toggleDropdown(booking.id)}
                                                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                                >
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
                                                </button>
                                                {openMenuId === booking.id && (
                                                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                                        <div className="py-1">
                                                            <button
                                                                onClick={() => handleStatusUpdate(booking.id, booking.status)}
                                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                            >
                                                                {booking.status === 'confirmed' ? 'Cancel Booking' : 'Confirm Booking'}
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(booking.id)}
                                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                                            >
                                                                Delete Booking
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AdminDashboard>
        </>
    );
}