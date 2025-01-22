import HeaderLayout from '@/Layouts/HeaderLayout';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import Footer from "../Layouts/Footer";
import ServicesBody from "../Layouts/ServicesBody";

export default function Room({ auth, check_in, check_out, room_type }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        special_requests: '',
        check_in: check_in || '',
        check_out: check_out || '',
        room_type: room_type || 'normal',
        adults: 2,
        children: 0,
        status: 'confirmed'
    });

    const handleDateChange = (field, value) => {
        setData(field, value);
        
        // Validate dates
        const checkIn = new Date(field === 'check_in' ? value : data.check_in);
        const checkOut = new Date(field === 'check_out' ? value : data.check_out);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (field === 'check_in' && checkIn < today) {
            Swal.fire({
                title: 'Invalid Date',
                text: 'Check-in date cannot be in the past',
                icon: 'error',
                confirmButtonColor: '#024635'
            });
            setData('check_in', '');
            return;
        }

        if (checkOut && checkIn >= checkOut) {
            Swal.fire({
                title: 'Invalid Date Range',
                text: 'Check-out date must be after check-in date',
                icon: 'error',
                confirmButtonColor: '#024635'
            });
            setData(field, '');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.name || !data.email || !data.phone || !data.check_in || !data.check_out) {
            Swal.fire({
                title: 'Error',
                text: 'Please fill in all required fields including dates',
                icon: 'error',
                confirmButtonColor: '#024635'
            });
            return;
        }

        const bookingData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            special_requests: data.special_requests || '',
            check_in: data.check_in,
            check_out: data.check_out,
            room_type: data.room_type,
            adults: data.adults,
            children: data.children,
            status: 'confirmed'
        };

        post('/bookings', bookingData, {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Booking Successful!',
                    text: 'Thank you for choosing our hotel. Your booking has been confirmed.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    window.location.href = route('home');
                });
            },
            onError: (errors) => {
                console.error('Booking error:', errors);
                Swal.fire({
                    title: 'Error',
                    text: Object.values(errors)[0] || 'An error occurred while processing your booking.',
                    icon: 'error',
                    confirmButtonColor: '#024635'
                });
            }
        });
    };

    return (
        <>
            <Head title="Room" />
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
                            Find your perfect room,<br />your home away from home
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
                        <div className="size-20 bg-white border-4 border-[#F8B008] rounded-full flex items-center justify-center">
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
                                    src={room_type === 'luxury' ? 'services-resources/luxury-room.png' : 'services-resources/deluxe-room.png'}
                                    alt={room_type === 'luxury' ? 'Luxury Room' : 'Normal Room'}
                                    className="rounded-lg shadow-md w-full"
                                />
                            </div>

                            <div className="bg-[#EDC76D] p-6 shadow-md">
                                <h2 className="text-lg font-bold mb-4">Guest Information</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2">Booking Details:</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-1" htmlFor="check_in">
                                                        Check-in Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="check_in"
                                                        value={data.check_in}
                                                        onChange={e => handleDateChange('check_in', e.target.value)}
                                                        className="w-full px-3 py-2 border rounded-md bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-1" htmlFor="check_out">
                                                        Check-out Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="check_out"
                                                        value={data.check_out}
                                                        onChange={e => handleDateChange('check_out', e.target.value)}
                                                        min={data.check_in}
                                                        className="w-full px-3 py-2 border rounded-md bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                        required
                                                    />
                                                </div>
                                                <p><strong>Room Type:</strong> {room_type === 'luxury' ? 'Luxury Room ($200/night)' : 'Normal Room ($100/night)'}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1" htmlFor="name">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1" htmlFor="email">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="w-full px-3 py-2 border rounded-md bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-1" htmlFor="phone">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
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

                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <h1 className="text-3xl font-bold mb-4">Delux Family Rooms</h1>
                                <p className="text-gray-700 mb-6">
                                    Experience ultimate comfort in our Deluxe Room, featuring elegant decor, premium bedding, modern amenities, and stunning views. Whether you're here to relax or recharge, this room is your perfect retreat.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div>
                                        <h2 className="text-xl font-bold flex items-center mb-2">
                                            <img src="services-resources/check-in-icon.svg" alt="" />
                                            <span className="mr-2"></span> Check In
                                        </h2>
                                        <ul className="text-gray-700">
                                            <div className="flex">
                                                <img src="services-resources/yellow-check-icon.svg" alt="" />
                                                <li>Check-in from 9:00 AM - anytime</li>
                                            </div>

                                            <div className="flex">
                                                <img src="services-resources/yellow-check-icon.svg" alt="" />
                                                <li>Early check-in subject to availability</li>
                                            </div>
                                        </ul>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold flex items-center mb-2">
                                            <img src="services-resources/check-out-icon.svg" alt="" />
                                            <span className="mr-2"></span> Check Out
                                        </h2>
                                        <ul className="text-gray-700">
                                            <div className="flex">
                                                <img src="services-resources/yellow-check-icon.svg" alt="" />
                                                <li>Check-out before noon</li>
                                            </div>

                                            <div className="flex">
                                                <img src="services-resources/yellow-check-icon.svg" alt="" />
                                                <li>Check-out from 9:00 AM - anytime</li>
                                            </div>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold mb-2">House Rules</h2>
                                    <p className="text-gray-700">
                                        To ensure a pleasant stay for everyone, we kindly ask guests to maintain a peaceful environment and respect other guests' privacy. Smoking is strictly prohibited in all rooms and designated non-smoking areas. Please inform the front desk of any visitors, as unregistered guests are not allowed overnight. Lastly, we encourage guests to handle hotel property with care to help us maintain a comfortable space for all.
                                    </p>
                                </div>

                                <div className="mt-8">
                                    <h2 className="text-xl font-bold mb-2">Children & Extra Beds</h2>
                                    <p className="text-gray-700">
                                        Children of all ages are warmly welcomed at our hotel, and we strive to make their stay enjoyable. Complimentary cribs are available for infants upon request, subject to availability. Extra beds can be arranged for older children or additional guests for an added fee. Please inform us in advance to ensure we can accommodate your family's needs seamlessly.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-2">Amenities</h2>
                                <ul className="text-gray-700">
                                    <div className="flex">
                                        <img src="services-resources/amenity-person.svg" alt="" />
                                        <li>2 - 5 Persons</li>
                                    </div>
                                    
                                    <div className="flex">
                                        <img src="services-resources/amenity-wifi.svg" alt="" />
                                        <li>Free Wifi Available</li>
                                    </div>
                                   
                                    <div className="flex">
                                        <img src="services-resources/amenity-pool.svg" alt="" />
                                        <li>Swimming pools</li>
                                    </div>
                                   
                                    <div className="flex">
                                        <img src="services-resources/amenity-gym.svg" alt="" />
                                        <li>Gym Facilities</li>
                                    </div>
                                   
                                    <div className="flex">
                                        <img src="services-resources/amenity-breakfast.svg" alt="" />
                                        <li>Breakfast</li>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </ServicesBody>
        </>
    );
}