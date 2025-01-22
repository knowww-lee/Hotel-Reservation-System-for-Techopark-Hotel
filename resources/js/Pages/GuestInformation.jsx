import HeaderLayout from '@/Layouts/HeaderLayout';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import Footer from "../Layouts/Footer";
import ServicesBody from "../Layouts/ServicesBody";

export default function GuestInformation({ booking_data }) {
    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        phone: '',
        special_requests: '',
        check_in: booking_data.check_in,
        check_out: booking_data.check_out,
        room_type: booking_data.room_type,
        rooms: booking_data.rooms,
        guests: booking_data.guests,
        adults: booking_data.guests,
        children: 0,
        status: 'confirmed'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.name || !data.email || !data.phone) {
            Swal.fire({
                title: 'Error',
                text: 'Please fill in all required fields',
                icon: 'error',
                confirmButtonColor: '#024635'
            });
            return;
        }

        // First create guest, then create booking
        post('/store-guest-and-booking', {
            // Guest information
            name: data.name,
            email: data.email,
            phone: data.phone,
            // Booking information
            check_in: data.check_in,
            check_out: data.check_out,
            room_type: data.room_type,
            adults: 2,
            children: 0,
            special_requests: data.special_requests,
            status: 'confirmed'
        }, {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Booking Successful!',
                    text: 'Thank you for choosing our hotel. Your booking has been confirmed.',
                    icon: 'success',
                    confirmButtonColor: '#024635',
                    allowOutsideClick: false,
                    showConfirmButton: true,
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = route('home');
                    }
                });
            },
            onError: (errors) => {
                Swal.fire({
                    title: 'Error',
                    text: Object.values(errors)[0],
                    icon: 'error',
                    confirmButtonColor: '#024635'
                });
            }
        });
    };

    return (
        <>
            <Head title="Guest Information" />

            <div className="relative w-full h-screen z-0">
                <img
                    src="/services-resources/services-cover.png" 
                    alt="Cover Image"
                    className="absolute top-0 left-0 object-cover w-full h-full z-0"
                />

                <HeaderLayout activeLink="services">
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
                        <p className="text-white text-lg md:text-xl mb-2" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
                            Unwind in style and sophistication
                        </p>
                     
                        <h1 className="text-white text-4xl md:text-6xl font-bold" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
                            Complete your booking
                        </h1>
                    </div>
                </HeaderLayout>
            </div>

            <ServicesBody>
                <div className="flex justify-center items-center py-8 bg-[#D9D9D9]">
                    <div className="flex flex-col items-center mr-8">
                        <div className="size-20 bg-[#024635] rounded-full flex items-center justify-center">
                            <img src="/services-resources/calendar-icon.svg" alt="Calendar Icon" />
                        </div>
                        <p className="mt-2 text-center text-sm text-gray-700">Checking-in & <br /> Checking-out Date</p>
                    </div>
                    
                    <div className="flex flex-col items-center mr-8">
                        <div className="size-20 bg-[#024635] rounded-full flex items-center justify-center">
                            <img src="/services-resources/calendar-icon.svg" alt="Calendar Icon" />
                        </div>
                        <p className="mt-2 text-center text-sm text-gray-700">Select<br /> Rooms & Rates</p>
                    </div>

                    <div className="flex flex-col items-center mr-8">
                        <div className="size-20 bg-[#024635] rounded-full flex items-center justify-center">
                            <img src="/services-resources/guest-icon.svg" alt="Guest Icon" />
                        </div>
                        <p className="mt-2 text-center text-sm text-gray-700">Guest <br /> Information</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="size-20 bg-white border-4 border-[#F8B008] rounded-full flex items-center justify-center">
                            <img src="/services-resources/check-icon.svg" alt="Check Icon" />
                        </div>
                        <p className="mt-2 text-center text-sm text-gray-700">Booking <br /> Confirmation</p>
                    </div>
                </div>

                <div className="p-6 bg-gray-100 min-h-screen">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <img
                                    src="services-resources/deluxe-room.png" 
                                    alt="Delux Family Room"
                                    className="rounded-lg shadow-md"
                                />
                            </div>

                            <div className="bg-[#EDC76D] p-6 shadow-md">
                                <h2 className="text-lg font-bold mb-4">Guest Information</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Booking Details:</h3>
                                            <p><strong>Check-in:</strong> {booking_data.check_in}</p>
                                            <p><strong>Check-out:</strong> {booking_data.check_out}</p>
                                            <p><strong>Room Type:</strong> {booking_data.room_type === 'luxury' ? 'Luxury Room ($200/night)' : 'Normal Room ($100/night)'}</p>
                                            <p><strong>Number of Rooms:</strong> {booking_data.rooms}</p>
                                            <p><strong>Number of Guests:</strong> {booking_data.guests}</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1" htmlFor="guest_name">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="guest_name"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1" htmlFor="guest_email">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="guest_email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1" htmlFor="guest_phone">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="guest_phone"
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1" htmlFor="special_requests">
                                                Special Requests (Optional)
                                            </label>
                                            <textarea
                                                id="special_requests"
                                                value={data.special_requests}
                                                onChange={e => setData('special_requests', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                rows="4"
                                            />
                                        </div>
                                    </div>

                                    <br></br>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-white text-black py-2 rounded-md hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                                    >
                                        {processing ? 'Processing...' : 'CONFIRM BOOKING'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </ServicesBody>
        </>
    );
} 