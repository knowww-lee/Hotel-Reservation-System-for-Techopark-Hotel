import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AdminDashboard from "../Layouts/AdminDashboard";

// Function to censor name
const censorName = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.map(part => {
        if (part.length <= 2) return part;
        const firstChar = part.charAt(0);
        const lastChar = part.charAt(part.length - 1);
        const middleStars = '*'.repeat(part.length - 2);
        return `${firstChar}${middleStars}${lastChar}`;
    }).join(' ');
};

// Function to censor email
const censorEmail = (email) => {
    if (!email) return '';
    const [localPart, domain] = email.split('@');
    
    // Censor local part (username)
    const censoredLocal = localPart.charAt(0) + 
                         '*'.repeat(localPart.length - 2) + 
                         localPart.charAt(localPart.length - 1);
    
    // Censor domain (except the TLD)
    const domainParts = domain.split('.');
    const domainName = domainParts[0];
    const tld = domainParts.slice(1).join('.');
    
    const censoredDomain = domainName.charAt(0) + 
                          '*'.repeat(domainName.length - 2) + 
                          domainName.charAt(domainName.length - 1);
    
    return `${censoredLocal}@${censoredDomain}.${tld}`;
};

export default function Dashboard({ bookingStats: initialBookingStats, roomStats: initialRoomStats, contacts }) {
    const [stats, setStats] = useState(initialRoomStats);
    const [bookingStats, setBookingStats] = useState(initialBookingStats);

    const fetchUpdatedStats = async () => {
        try {
            const response = await axios.get('/api/rooms');
            if (response.data && response.data.rooms) {
                const rooms = response.data.rooms;
                
                // Process rooms to handle checked-out guests - matching Rooms.jsx logic
                const processedRooms = rooms.map(room => {
                    if (room.current_booking) {
                        const checkOutDate = new Date(room.current_booking.check_out);
                        const now = new Date();
                        
                        // If check-out date has passed or booking is completed, clear the current booking
                        if (checkOutDate < now || room.current_booking.status === 'completed') {
                            return {
                                ...room,
                                status: 'Available',
                                current_booking: null
                            };
                        }
                    }
                    return room;
                });

                // Calculate total rooms by type
                const totalNormalRooms = processedRooms.filter(room => room.type === 'normal').length;
                const totalLuxuryRooms = processedRooms.filter(room => room.type === 'luxury').length;
                const totalRooms = totalNormalRooms + totalLuxuryRooms;

                // Calculate available and booked rooms by type
                const availableNormalRooms = processedRooms.filter(room => room.type === 'normal' && room.status === 'Available').length;
                const availableLuxuryRooms = processedRooms.filter(room => room.type === 'luxury' && room.status === 'Available').length;
                const totalAvailable = availableNormalRooms + availableLuxuryRooms;

                const bookedNormalRooms = totalNormalRooms - availableNormalRooms;
                const bookedLuxuryRooms = totalLuxuryRooms - availableLuxuryRooms;
                const totalBooked = bookedNormalRooms + bookedLuxuryRooms;

                // Calculate occupancy rates
                const normalOccupancyRate = (bookedNormalRooms / totalNormalRooms) * 100;
                const luxuryOccupancyRate = (bookedLuxuryRooms / totalLuxuryRooms) * 100;
                const totalOccupancyRate = (totalBooked / totalRooms) * 100;

                // Update room stats with the same structure as Rooms.jsx
                const newStats = {
                    total: totalRooms,
                    available: totalAvailable,
                    occupied: totalBooked,
                    availableNormal: availableNormalRooms,
                    availableLuxury: availableLuxuryRooms,
                    occupancyRate: Math.round(totalOccupancyRate),
                    normal: {
                        available: availableNormalRooms,
                        booked: bookedNormalRooms,
                        total: totalNormalRooms,
                        occupancyRate: Math.round(normalOccupancyRate)
                    },
                    luxury: {
                        available: availableLuxuryRooms,
                        booked: bookedLuxuryRooms,
                        total: totalLuxuryRooms,
                        occupancyRate: Math.round(luxuryOccupancyRate)
                    }
                };

                // Update booking stats
                const newBookingStats = {
                    ...bookingStats,
                    availableNormal: availableNormalRooms,
                    availableLuxury: availableLuxuryRooms,
                    totalActive: totalBooked
                };

                setStats(newStats);
                setBookingStats(newBookingStats);
            }
        } catch (error) {
            console.error('Error fetching room stats:', error);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchUpdatedStats();

        // Set up polling interval (every 10 seconds to match Rooms.jsx)
        const interval = setInterval(fetchUpdatedStats, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Head title="Dashboard" />

            <AdminDashboard>         
                <section className="py-4 px-4 bg-white rounded-2xl shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                            <p className="text-sm text-gray-500">Today's</p>
                            <p className="text-md font-semibold text-gray-500">
                                Check-in <span className="ml-2 text-2xl font-bold text-[#F8B008]">{bookingStats.todayCheckIns}</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Today's</p>
                            <p className="text-md font-semibold text-gray-500">
                                Check-out <span className="ml-2 text-2xl font-bold text-[#F8B008]">{bookingStats.todayCheckOuts}</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active</p>
                            <p className="text-md font-semibold text-gray-500">
                                Bookings <span className="ml-2 text-2xl font-bold text-[#F8B008]">{bookingStats.totalActive}</span>
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total</p>
                            <p className="text-md font-semibold text-gray-500">
                                Bookings <span className="ml-2 text-2xl font-bold text-[#F8B008]">{bookingStats.total}</span>
                            </p>
                        </div>
                    </div>
                </section>

                <section className="p-4 bg-white rounded-lg shadow mt-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Rooms</h2>
                    <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="p-4 bg-white rounded-lg border border-gray-400">
                            <h3 className="text-sm font-medium text-gray-500">Normal Rooms</h3>
                            <p className="mt-1 text-sm text-gray-500">{stats.normal?.available}/{stats.normal?.total} Available</p>
                            <p className="mt-2 text-md font-bold text-gray-500">
                                <span className="text-2xl text-[#F8B008]">$100</span> /day
                            </p>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-gray-400">
                            <h3 className="text-sm font-medium text-gray-500">Luxury Rooms</h3>
                            <p className="mt-1 text-sm text-gray-500">{stats.luxury?.available}/{stats.luxury?.total} Available</p>
                            <p className="mt-2 text-md font-bold text-gray-500">
                                <span className="text-2xl text-[#F8B008]">$200</span> /day
                            </p>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-gray-400">
                            <h3 className="text-sm font-medium text-gray-500">Total Rooms</h3>
                            <p className="mt-1 text-sm text-gray-500">{stats.available}/{stats.total} Available</p>
                            <p className="mt-2 text-md font-bold text-gray-500">
                                <span className="text-2xl text-[#F8B008]">Starting from $100</span>
                            </p>
                        </div>
                    </div>
                </section>
     
                <section className="grid grid-cols-1 gap-6 mt-6 xl:grid-cols-2 mx-4 lg:mx-20">
                    <div className="p-4 bg-white rounded-2xl shadow">
                        <h3 className="text-lg font-medium text-gray-800">Room Status</h3>
                        <div className="mt-4 space-y-4">
                            {/* Normal Rooms Status */}
                            <div className="relative pt-1">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Normal Rooms</h4>
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                            Available: {stats.normal?.available || 0}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                            Booked: {stats.normal?.booked || 0}
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                                    <div 
                                        style={{ width: `${stats.normal?.occupancyRate || 0}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#024635]"
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 text-right">{stats.normal?.occupancyRate || 0}% Occupancy Rate</p>
                            </div>

                            {/* Luxury Rooms Status */}
                            <div className="relative pt-1">
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Luxury Rooms</h4>
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                            Available: {stats.luxury?.available || 0}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                            Booked: {stats.luxury?.booked || 0}
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-gray-200">
                                    <div 
                                        style={{ width: `${stats.luxury?.occupancyRate || 0}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#024635]"
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-500 text-right">{stats.luxury?.occupancyRate || 0}% Occupancy Rate</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-2xl shadow">
                        <h3 className="text-lg font-medium text-gray-800">Customer Feedback</h3>
                        <div className="mt-4 space-y-4 max-h-[200px] overflow-y-auto">
                            {contacts && contacts
                                .filter(contact => contact.subject === 'Feedback')
                                .map((feedback, index) => (
                                    <div key={index} className="border-b pb-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">{censorName(feedback.name)}</h3>
                                                <p className="text-sm text-gray-600">{censorEmail(feedback.email)}</p>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {new Date(feedback.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="mt-2 text-gray-700">{feedback.message}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            </AdminDashboard>
        </>
    );
}