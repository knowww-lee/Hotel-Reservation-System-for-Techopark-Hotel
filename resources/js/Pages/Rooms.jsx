import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from "react";
import AdminDashboard from "../Layouts/AdminDashboard";

export default function Room({ auth, rooms = [], stats = {} }) {
    const [roomType, setRoomType] = useState('all');
    const [roomsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [roomData, setRoomData] = useState(rooms);
    const [statsData, setStatsData] = useState(stats);

    // Function to fetch updated room data
    const fetchUpdatedRoomData = async () => {
        try {
            const response = await axios.get('/api/rooms');
            if (response.data) {
                // Process the rooms to handle checked-out guests
                const processedRooms = response.data.rooms.map(room => {
                    // If there's a current booking, check if it's completed/checked-out
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

                // Update room data
                setRoomData(processedRooms);
                
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

                // Update stats with new calculations
                const newStats = {
                    total: totalRooms,
                    available: totalAvailable,
                    booked: totalBooked,
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

                setStatsData(newStats);
            }
        } catch (error) {
            console.error('Error fetching room data:', error);
        }
    };

    // Set up polling interval
    useEffect(() => {
        // Initial data processing
        const processInitialRooms = rooms.map(room => {
            if (room.current_booking) {
                const checkOutDate = new Date(room.current_booking.check_out);
                const now = new Date();
                
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
        
        // Calculate initial stats
        const totalNormalRooms = processInitialRooms.filter(room => room.type === 'normal').length;
        const totalLuxuryRooms = processInitialRooms.filter(room => room.type === 'luxury').length;
        const totalRooms = totalNormalRooms + totalLuxuryRooms;

        const availableNormalRooms = processInitialRooms.filter(room => room.type === 'normal' && room.status === 'Available').length;
        const availableLuxuryRooms = processInitialRooms.filter(room => room.type === 'luxury' && room.status === 'Available').length;
        const totalAvailable = availableNormalRooms + availableLuxuryRooms;

        const bookedNormalRooms = totalNormalRooms - availableNormalRooms;
        const bookedLuxuryRooms = totalLuxuryRooms - availableLuxuryRooms;
        const totalBooked = bookedNormalRooms + bookedLuxuryRooms;

        const initialStats = {
            total: totalRooms,
            available: totalAvailable,
            booked: totalBooked,
            occupancyRate: Math.round((totalBooked / totalRooms) * 100),
            normal: {
                available: availableNormalRooms,
                booked: bookedNormalRooms,
                total: totalNormalRooms,
                occupancyRate: Math.round((bookedNormalRooms / totalNormalRooms) * 100)
            },
            luxury: {
                available: availableLuxuryRooms,
                booked: bookedLuxuryRooms,
                total: totalLuxuryRooms,
                occupancyRate: Math.round((bookedLuxuryRooms / totalLuxuryRooms) * 100)
            }
        };

        setRoomData(processInitialRooms);
        setStatsData(initialStats);

        // Set up polling interval (every 10 seconds)
        const interval = setInterval(fetchUpdatedRoomData, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [rooms, stats]);

    // Filter rooms based on type and search query
    const filteredRooms = roomData.filter(room => {
        const matchesType = roomType === 'all' || room.type === roomType;
        const matchesSearch = room.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (room.current_booking?.guest_name || '').toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesSearch;
    });

    // Calculate pagination
    const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);
    const startIndex = (currentPage - 1) * roomsPerPage;
    const paginatedRooms = filteredRooms.slice(startIndex, startIndex + roomsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Head title="Rooms" />
            <AdminDashboard>
                <div className="p-2 md:p-6">
                    {/* Statistics Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
                        <div className="bg-white p-2 md:p-4 rounded-lg shadow">
                            <h3 className="text-sm md:text-lg font-semibold text-[#024635]">Total Rooms</h3>
                            <p className="text-lg md:text-2xl font-bold">{statsData.total || 0}</p>
                        </div>
                        <div className="bg-white p-2 md:p-4 rounded-lg shadow">
                            <h3 className="text-sm md:text-lg font-semibold text-[#024635]">Available Rooms</h3>
                            <p className="text-lg md:text-2xl font-bold text-green-600">{statsData.available || 0}</p>
                        </div>
                        <div className="bg-white p-2 md:p-4 rounded-lg shadow">
                            <h3 className="text-sm md:text-lg font-semibold text-[#024635]">Booked Rooms</h3>
                            <p className="text-lg md:text-2xl font-bold text-blue-600">{statsData.booked || 0}</p>
                        </div>
                        <div className="bg-white p-2 md:p-4 rounded-lg shadow">
                            <h3 className="text-sm md:text-lg font-semibold text-[#024635]">Occupancy Rate</h3>
                            <p className="text-lg md:text-2xl font-bold text-purple-600">
                                {statsData.occupancyRate || 0}%
                            </p>
                        </div>
                    </div>

                    {/* Room Type Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                        <div className="bg-white p-2 md:p-4 rounded-lg shadow">
                            <h3 className="text-sm md:text-lg font-semibold text-[#024635] mb-2">Normal Rooms</h3>
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                            Available: {statsData.normal?.available || 0}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                            Booked: {statsData.normal?.booked || 0}
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                                    <div 
                                        style={{ width: `${statsData.normal?.occupancyRate || 0}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#024635]"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-2 md:p-4 rounded-lg shadow">
                            <h3 className="text-sm md:text-lg font-semibold text-[#024635] mb-2">Luxury Rooms</h3>
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                            Available: {statsData.luxury?.available || 0}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                            Booked: {statsData.luxury?.booked || 0}
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                                    <div 
                                        style={{ width: `${statsData.luxury?.occupancyRate || 0}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#024635]"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-2 md:p-4 rounded-lg shadow mb-4 md:mb-6">
                        <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-between">
                            <div className="flex gap-2 md:gap-4">
                                <button
                                    onClick={() => setRoomType('all')}
                                    className={`px-2 md:px-4 py-1 md:py-2 rounded-lg ${roomType === 'all' ? 'bg-[#024635] text-white' : 'bg-gray-100'}`}
                                >
                                    All Rooms
                                </button>
                                <button
                                    onClick={() => setRoomType('normal')}
                                    className={`px-2 md:px-4 py-1 md:py-2 rounded-lg ${roomType === 'normal' ? 'bg-[#024635] text-white' : 'bg-gray-100'}`}
                                >
                                    Normal Rooms
                                </button>
                                <button
                                    onClick={() => setRoomType('luxury')}
                                    className={`px-2 md:px-4 py-1 md:py-2 rounded-lg ${roomType === 'luxury' ? 'bg-[#024635] text-white' : 'bg-gray-100'}`}
                                >
                                    Luxury Rooms
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by room number or guest name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-2 md:px-4 py-1 md:py-2 border rounded-lg w-full md:w-auto"
                            />
                        </div>
                    </div>

                    {/* Room List */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-xs md:text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Number</th>
                                        <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Guest</th>
                                        <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                                        <th className="px-2 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedRooms.map((room, index) => (
                                        <tr key={room.number}>
                                            <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.number}</td>
                                            <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{room.type}</td>
                                            <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    room.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {room.status}
                                                </span>
                                            </td>
                                            <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-500">
                                                {room.current_booking?.guest_name || '-'}
                                            </td>
                                            <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-500">
                                                {room.current_booking?.check_in ? new Date(room.current_booking.check_in).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="px-2 md:px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-500">
                                                {room.current_booking?.check_out ? new Date(room.current_booking.check_out).toLocaleDateString() : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-4">
                            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`relative inline-flex items-center px-2 md:px-4 py-1 md:py-2 border text-xs md:text-sm font-medium ${
                                            currentPage === page
                                                ? 'z-10 bg-[#024635] border-[#024635] text-white'
                                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
            </AdminDashboard>
        </>
    );
}