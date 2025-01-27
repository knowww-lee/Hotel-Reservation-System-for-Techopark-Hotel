import { Head } from '@inertiajs/react';
import { useState, useEffect } from "react";
import AdminDashboard from "../Layouts/AdminDashboard";

export default function Room({ auth, rooms = [], stats = {} }) {
    const [roomType, setRoomType] = useState('all');
    const [roomsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    // Filter rooms based on type and search query
    const filteredRooms = rooms.filter(room => {
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

    useEffect(() => {
        console.log('Rooms:', rooms);
        console.log('Stats:', stats);
    }, [rooms, stats]);

    return (
        <>
            <Head title="Rooms" />
            <AdminDashboard>
                <div className="p-6">
                    {/* Statistics Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-[#024635]">Total Rooms</h3>
                            <p className="text-2xl font-bold">{stats.total || 0}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-[#024635]">Available Rooms</h3>
                            <p className="text-2xl font-bold text-green-600">{stats.available || 0}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-[#024635]">Booked Rooms</h3>
                            <p className="text-2xl font-bold text-blue-600">{stats.booked || 0}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-[#024635]">Occupancy Rate</h3>
                            <p className="text-2xl font-bold text-purple-600">
                                {stats.total ? Math.round((stats.booked / stats.total) * 100) : 0}%
                            </p>
                        </div>
                    </div>

                    {/* Room Type Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-[#024635] mb-2">Normal Rooms</h3>
                            <div className="relative pt-1">
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
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                                    <div 
                                        style={{ width: `${stats.normal?.total ? (stats.normal.booked / stats.normal.total) * 100 : 0}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#024635]"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h3 className="text-lg font-semibold text-[#024635] mb-2">Luxury Rooms</h3>
                            <div className="relative pt-1">
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
                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                                    <div 
                                        style={{ width: `${stats.luxury?.total ? (stats.luxury.booked / stats.luxury.total) * 100 : 0}%` }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#024635]"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                        <div className="flex flex-wrap gap-4 items-center justify-between">
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setRoomType('all')}
                                    className={`px-4 py-2 rounded-lg ${roomType === 'all' ? 'bg-[#024635] text-white' : 'bg-gray-100'}`}
                                >
                                    All Rooms
                                </button>
                                <button
                                    onClick={() => setRoomType('normal')}
                                    className={`px-4 py-2 rounded-lg ${roomType === 'normal' ? 'bg-[#024635] text-white' : 'bg-gray-100'}`}
                                >
                                    Normal Rooms
                                </button>
                                <button
                                    onClick={() => setRoomType('luxury')}
                                    className={`px-4 py-2 rounded-lg ${roomType === 'luxury' ? 'bg-[#024635] text-white' : 'bg-gray-100'}`}
                                >
                                    Luxury Rooms
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Search by room number or guest name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-4 py-2 border rounded-lg w-full md:w-auto"
                            />
                        </div>
                    </div>

                    {/* Room List */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Guest</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedRooms.map((room, index) => (
                                        <tr key={room.number}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.number}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{room.type}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    room.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {room.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {room.current_booking?.guest_name || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {room.current_booking?.check_in ? new Date(room.current_booking.check_in).toLocaleDateString() : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
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