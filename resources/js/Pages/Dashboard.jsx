import { Head } from '@inertiajs/react';
import AdminDashboard from "../Layouts/AdminDashboard";

export default function Dashboard({ bookingStats, roomStats, contacts }) {
    return (
        <>
            <Head title="Dashboard" />

            <AdminDashboard>         
                <section className="py-4 px-4 bg-white rounded-2xl shadow-lg">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Overview</h2>
                    <div className="grid grid-cols-4 gap-6">
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
                    <div className="grid grid-cols-1 gap-40 mt-6 lg:grid-cols-2 xl:grid-cols-3">
                        <div className="p-4 bg-white rounded-lg border border-gray-400">
                            <h3 className="text-sm font-medium text-gray-500">Normal Rooms</h3>
                            <p className="mt-1 text-sm text-gray-500">{bookingStats.availableNormal}/{50} Available</p>
                            <p className="mt-2 text-md font-bold text-gray-500">
                                <span className="text-2xl text-[#F8B008]">$100</span> /day
                            </p>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-gray-400">
                            <h3 className="text-sm font-medium text-gray-500">Luxury Rooms</h3>
                            <p className="mt-1 text-sm text-gray-500">{bookingStats.availableLuxury}/{50} Available</p>
                            <p className="mt-2 text-md font-bold text-gray-500">
                                <span className="text-2xl text-[#F8B008]">$200</span> /day
                            </p>
                        </div>
                        <div className="p-4 bg-white rounded-lg border border-gray-400">
                            <h3 className="text-sm font-medium text-gray-500">Total Rooms</h3>
                            <p className="mt-1 text-sm text-gray-500">{roomStats.available}/{roomStats.total} Available</p>
                            <p className="mt-2 text-md font-bold text-gray-500">
                                <span className="text-2xl text-[#F8B008]">Starting from $100</span>
                            </p>
                        </div>
                    </div>
                </section>
     
                <section className="grid grid-cols-1 gap-40 mt-6 xl:grid-cols-2 mx-20">
                    <div className="p-4 bg-white rounded-2xl shadow">
                        <h3 className="text-lg font-medium text-gray-800">Room Status</h3>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Occupied Rooms:</span>
                                <span className="text-2xl font-bold text-[#F8B008]">{roomStats.occupied}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Available Rooms:</span>
                                <span className="text-2xl font-bold text-[#024635]">{roomStats.available}</span>
                            </div>
                            <div className="mt-6 bg-gray-200 h-2 rounded-full">
                                <div 
                                    className="bg-[#F8B008] h-2 rounded-full" 
                                    style={{ 
                                        width: `${(roomStats.occupied / roomStats.total) * 100}%` 
                                    }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-500 text-center mt-2">
                                {Math.round((roomStats.occupied / roomStats.total) * 100)}% Occupancy Rate
                            </p>
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
                                                <h3 className="font-medium">{feedback.name}</h3>
                                                <p className="text-sm text-gray-600">{feedback.email}</p>
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