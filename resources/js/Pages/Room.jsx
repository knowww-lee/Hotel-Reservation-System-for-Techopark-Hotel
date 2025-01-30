import HeaderLayout from '@/Layouts/HeaderLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Footer from "../Layouts/Footer";
import axios from 'axios';

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

    const [errorsState, setErrorsState] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleDateChange = (field, value) => {
        setData(field, value);
        
        // Validate dates
        const checkIn = new Date(field === 'check_in' ? value : data.check_in);
        const checkOut = new Date(field === 'check_out' ? value : data.check_out);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (field === 'check_in' && checkIn < today) {
            console.log('Invalid check-in date');
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
            console.log('Invalid date range');
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
            console.log('Missing required fields');
            Swal.fire({
                title: 'Error',
                text: 'Please fill in all required fields including dates',
                icon: 'error',
                confirmButtonColor: '#024635'
            });
            return;
        }

        // Validate email format
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(data.email)) {
            Swal.fire({
                title: 'Invalid Email',
                text: 'Please enter a valid email address',
                icon: 'error',
                confirmButtonColor: '#024635'
            });
            return;
        }

        // Validate phone number format
        const phoneRegex = /^09\d{9}$/;
        if (!phoneRegex.test(data.phone)) {
            Swal.fire({
                title: 'Invalid Phone Number',
                text: 'Phone number must be 11 digits and start with 09',
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

        axios.post('/bookings', bookingData)
            .then((response) => {
                console.log('Booking response:', response);
                const roomNumber = response.data.booking?.room_number || 'Not assigned';
                Swal.fire({
                    title: 'Booking Successful!',
                    html: `Thank you for choosing our hotel.<br>Your room number is: <strong>${roomNumber}</strong><br>Your booking has been confirmed.`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#024635'
                }).then(() => {
                    window.location.href = route('room');
                });
            })
            .catch((error) => {
                console.error('Booking error:', error);
                Swal.fire({
                    title: 'Error',
                    text: error.response?.data?.message || 'An error occurred while processing your booking.',
                    icon: 'error',
                    confirmButtonColor: '#024635'
                });
            });
    };

    // Function to handle input changes with validation
    const handleInputChange = (field, value) => {
        let processedValue = value;
        
        // For name field, only allow letters and spaces, and limit to 255 characters
        if (field === 'name') {
            processedValue = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 255);
        }
        // Remove spaces from email
        else if (field === 'email') {
            processedValue = value.replace(/\s/g, '');
        }
        // For phone field, only allow numbers and limit to 11 digits
        else if (field === 'phone') {
            processedValue = value.replace(/[^\d]/g, '').slice(0, 11);
        }
        
        setData(field, processedValue);
        // Clear error when user starts typing
        setErrorsState(prev => ({ ...prev, [field]: '' }));
    };

    // Function to validate fields on blur
    const handleBlur = (field, e) => {
        const value = data[field];
        let errorMessage = '';

        if (!value) {
            errorMessage = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        } else {
            switch (field) {
                case 'name':
                    if (value.length < 2) {
                        errorMessage = 'Name must be at least 2 characters long';
                    }
                    break;
                case 'email':
                    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                    if (!emailRegex.test(value)) {
                        errorMessage = 'Please enter a valid email address';
                    }
                    break;
                case 'phone':
                    const phoneRegex = /^09\d{9}$/;
                    if (!phoneRegex.test(value)) {
                        errorMessage = 'Phone number must be 11 digits and start with 09';
                    }
                    break;
            }
        }

        setErrorsState(prev => ({ ...prev, [field]: errorMessage }));
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-4">
                        <p className="text-white text-lg sm:text-xl mb-2" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
                            Unwind in style and sophistication
                        </p>
                    
                        <h1 className="text-white text-3xl sm:text-4xl md:text-6xl font-bold" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
                            Find your perfect room,<br />your home away from home
                        </h1>
                    </div>
                </HeaderLayout>
            </div>

            
            <div className="flex flex-row flex-wrap justify-center items-center py-4 md:py-8 bg-[#D9D9D9]">
                <div className="flex flex-col items-center mr-2 md:mr-8 mb-2 md:mb-0">
                    <div className="w-8 h-8 md:w-20 md:h-20 bg-[#024635] rounded-full flex items-center justify-center">
                        <img src="/services-resources/calendar-icon.svg" alt="Calendar Icon" className="w-4 md:w-8" />
                    </div>
                    <p className="mt-1 md:mt-2 text-center text-xs md:text-sm text-gray-700">Book<br />Now!</p>
                </div>
                
                <div className="flex flex-col items-center mr-2 md:mr-8 mb-2 md:mb-0">
                    <div className="bg-[#024635] rounded-full w-8 h-8 md:w-20 md:h-20 flex items-center justify-center">
                        <img src="/services-resources/bed-icon.svg" alt="Bed Icon" className="w-4 md:w-8" style={{ filter: 'invert(70%) sepia(100%) saturate(748%) hue-rotate(1deg) brightness(90%) contrast(100%)' }} />
                    </div>
                    <p className="mt-1 md:mt-2 text-center text-xs md:text-sm text-gray-700">Select <br /> Rooms & Rates</p>
                </div>

                <div className="flex flex-col items-center mr-2 md:mr-8 mb-2 md:mb-0">
                    <div className="bg-[#024635] rounded-full w-8 h-8 md:w-20 md:h-20 flex items-center justify-center">
                        <img src="/services-resources/guest-icon.svg" alt="Guest Icon" className="w-4 md:w-8" style={{ filter: 'invert(70%) sepia(100%) saturate(748%) hue-rotate(1deg) brightness(90%) contrast(100%)' }} />
                    </div>
                    <p className="mt-1 md:mt-2 text-center text-xs md:text-sm text-gray-700">Guest <br /> Information</p>
                </div>

                <div className="flex flex-col items-center mr-2 md:mr-8 mb-2 md:mb-0">
                    <div className="w-8 h-8 md:w-20 md:h-20 bg-white border-2 md:border-4 border-[#F8B008] rounded-full flex items-center justify-center">
                        <img src="/services-resources/check-icon.svg" alt="Check Icon" className="w-4 md:w-8" />
                    </div>
                    <p className="mt-1 md:mt-2 text-center text-xs md:text-sm text-gray-700">Booking <br /> Confirmation</p>
                </div>
            </div>

                <div className="p-6 bg-gray-100 min-h-screen">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
                            <div className="md:col-span-1 flex flex-col items-center">
                                <h2 className="text-xl md:text-3xl font-bold mb-4 text-center">
                                    {data.room_type === 'luxury' ? 'Luxury Room' : 'Normal Room'}
                                </h2>
                                <img
                                    src={data.room_type === 'luxury' 
                                        ? '/services-resources/luxury-room.jpg' 
                                        : '/services-resources/normal-room.jpg'}
                                    alt={data.room_type === 'luxury' 
                                        ? 'Luxury Room' 
                                        : 'Normal Room'}
                                    className="rounded-lg shadow-md w-full"
                                />
                            </div>

                            <div className="bg-[#EDC76D] rounded-2xl p-6 shadow-md w-full md:col-span-1">
                                <h2 className="text-lg font-bold mb-4">Guest Information</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="mt-4 space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Booking Details:</h3>
                                        <div className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                            <label className="block text-sm font-medium mb-1" htmlFor="check_in">
                                                Check-in Date
                                            </label>
                                            <input
                                                type="date"
                                                id="check_in"
                                                value={data.check_in}
                                                onChange={(e) => handleDateChange('check_in', e.target.value)}
                                                className="w-full rounded-lg px-3 py-2 border bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
                                                onChange={(e) => handleDateChange('check_out', e.target.value)}
                                                min={data.check_in}
                                                className="w-full px-3 py-2 border rounded-lg bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                                required
                                            />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1" htmlFor="room_type">
                                            Room Type
                                            </label>
                                            <select
                                            id="room_type"
                                            value={data.room_type}
                                            onChange={(e) => setData('room_type', e.target.value)}
                                            className="w-full px-3 py-2 border rounded-lg bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                            >
                                            <option value="normal">Normal Room (₱100/night)</option>
                                            <option value="luxury">Luxury Room (₱200/night)</option>
                                            </select>
                                        </div>
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
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        onBlur={(e) => handleBlur('name', e)}
                                        className={`w-full px-3 py-2 border rounded-lg bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${errorsState.name ? 'border-red-500' : ''}`}
                                        required
                                        maxLength={255}
                                        />
                                        <div className="mt-1">
                                            <p className="text-xs text-black">Only letters are allowed. {data.name.length}/255 characters</p>
                                            {errorsState.name && <p className="text-xs text-red-500">{errorsState.name}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            onBlur={(e) => handleBlur('email', e)}
                                            className={`w-full px-3 py-2 border rounded-lg bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${errorsState.email ? 'border-red-500' : ''}`}
                                            required
                                        />
                                        <div className="mt-1">
                                            <p className="text-xs text-black">Please enter a valid email address (e.g., user@example.com)</p>
                                            {errorsState.email && <p className="text-xs text-red-500">{errorsState.email}</p>}
                                        </div>
                                        </div>
                                        <div>
                                        <label className="block text-sm font-medium mb-1" htmlFor="phone">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            onBlur={(e) => handleBlur('phone', e)}
                                            className={`w-full px-3 py-2 border rounded-lg bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500 ${errorsState.phone ? 'border-red-500' : ''}`}
                                            required
                                            placeholder="09xxxxxxxxx"
                                        />
                                        <div className="mt-1">
                                            <p className="text-xs text-black">Must be 11 digits starting with 09</p>
                                            {errorsState.phone && <p className="text-xs text-red-500">{errorsState.phone}</p>}
                                        </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1" htmlFor="special_requests">
                                        Special Requests (Optional)
                                        </label>
                                        <textarea
                                        id="special_requests"
                                        value={data.special_requests}
                                        onChange={(e) => setData('special_requests', e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                                        rows="4"
                                        />
                                    </div>
                                    </div>

                                    <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-white text-black py-2 rounded-full hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
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
        </>
    );
}