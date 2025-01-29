import HeaderLayout from '@/Layouts/HeaderLayout';
import { faBed, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, router, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import Footer from "../Layouts/Footer";

export default function Services() {
    const { data: contactData, setData: setContactData, post, processing, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleBookNow = (e) => {
        e.preventDefault();
        router.visit(route('room'), {
            preserveScroll: true
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('contact.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Message Sent!',
                    text: 'Thank you for contacting us. We will get back to you soon.',
                    icon: 'success',
                    confirmButtonColor: '#024635'
                });
                reset();
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
            <Head title="Services" />

            <div className="relative w-full h-screen z-0">
                <img
                    src="/services-resources/services-cover.png" 
                    alt="Cover Image"
                    className="absolute top-0 left-0 object-cover w-full h-full z-0"
                />

                <HeaderLayout activeLink="services">
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
                        <p className="text-white text-sm md:text-lg mb-2" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
                            Unwind in style and sophistication
                        </p>
                     
                        <h1 className="text-white text-2xl md:text-4xl lg:text-6xl font-bold" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
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
                    <p className="mt-1 md:mt-2 text-center text-xs md:text-sm text-gray-700">Checking-in & <br /> Checking-out Date</p>
                </div>
                
                <div className="flex flex-col items-center mr-2 md:mr-8 mb-2 md:mb-0">
                    <div className="w-8 h-8 md:w-20 md:h-20 bg-white border-2 md:border-4 border-[#F8B008] rounded-full flex items-center justify-center">
                        <img src="/services-resources/bed-icon.svg" alt="Bed Icon" className="w-4 md:w-8" />
                    </div>
                    <p className="mt-1 md:mt-2 text-center text-xs md:text-sm text-gray-700">Select <br /> Rooms & Rates</p>
                </div>

                <div className="flex flex-col items-center mr-2 md:mr-8 mb-2 md:mb-0">
                    <div className="w-8 h-8 md:w-20 md:h-20 bg-white border-2 md:border-4 border-[#F8B008] rounded-full flex items-center justify-center">
                        <img src="/services-resources/guest-icon.svg" alt="Guest Icon" className="w-4 md:w-8" />
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

                {/* Hotel's Facilities */}
        

                {/* Book Now Button */}
                <div className="flex flex-col items-center mb-4 md:mb-8 mt-2 md:mt-4"> 
                    <button
                        onClick={(e) => handleBookNow(e)}
                        className="bg-[#024635] text-white px-4 md:px-8 py-2 md:py-3 rounded-lg hover:bg-[#023625] transition-colors duration-200 font-semibold text-sm md:text-lg shadow-lg"
                    >
                        BOOK NOW
                    </button>
                </div>

            
            {/* Legend Section */}
            {/*}
             <div className="flex flex-col space-y-4 p-20 ml-40">
                <p className="text-2xl font-bold mb-8">LEGEND</p>
                <div className="flex items-center space-x-4">
                    <div className="h-10 w-20 bg-[#D9D9D9]"></div>
                    <span className="text-lg">Available Date</span>
                    <div className="h-10 w-20 bg-[#A39999]"></div>
                    <span className="text-lg">Not Available</span>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="h-10 w-20 bg-[#F8B008]"></div>
                    <span className="text-lg">Check-out Date</span>
                    <div className="h-10 w-20 bg-[#024635]"></div>
                    <span className="text-lg">Check-in Date</span>
                </div>
            </div>
            */}

                {/* Rooms Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 mt-4 md:mt-8 mx-2 md:mx-4 lg:mx-32 mb-4 md:mb-10">
                    <div className="bg-[#D9D9D9] shadow-lg rounded-lg overflow-hidden border border-[#A39999] w-full h-[300px] md:h-[415px]">
                        <img
                        src="/home-resources/hotelroom2.png"
                        alt="Room 1"
                        className="w-full h-40 md:h-64 object-cover"
                        />
                        <div className="p-2">
                            <p className="text-[#DB9A02] text-xs md:text-sm">LUXURY ROOM</p>
                            <h3 className="text-sm md:text-lg font-semibold text-gray-800">Double Suit Rooms</h3>
                            <p className="text-[#A39999] text-xs mt-1">1500 SQ.FT/Rooms</p>
                            <div className="border-t border-[#A39999] mt-2 pt-2 flex">
                                <div className="flex-1 border-r border-[#A39999] pr-2 flex items-center">
                                    <FontAwesomeIcon icon={faBed} className="text-[#A39999] mr-2" />
                                    <p className="text-xs text-[#A39999]">2 King Bed</p>
                                </div>
                                {/*stars */}
                                <div className="flex-1 pl-2 flex items-center">
                                    <div className="flex">
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02] mr-1" />
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02] mr-1" />
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02] mr-1" />
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02] mr-1" />
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#D9D9D9] shadow-lg rounded-lg overflow-hidden border border-[#A39999] w-full h-[300px] md:h-[415px]">
                        <img
                        src="/home-resources/hotelroom3.png"
                        alt="Room 2"
                        className="w-full h-40 md:h-64 object-cover"
                        />
                        <div className="p-2">
                            <p className="text-[#DB9A02] text-xs md:text-sm">LUXURY ROOM</p>
                            <h3 className="text-sm md:text-lg font-semibold text-gray-800">Superior Bed Rooms</h3>
                            <p className="text-[#A39999] text-xs mt-1">1500 SQ.FT/Rooms</p>
                            <div className="border-t border-[#A39999] mt-2 pt-2 flex">
                                <div className="flex-1 border-r border-[#A39999] pr-2 flex items-center">
                                    <FontAwesomeIcon icon={faBed} className="text-[#A39999] mr-2" />
                                    <p className="text-xs text-[#A39999]">2 King Bed</p>
                                </div>
                                {/*stars */}
                                <div className="flex-1 pl-2 flex items-center">
                                    <div className="flex">
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02] mr-1" />
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02] mr-1" />
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02] mr-1" />
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02] mr-1" />
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-[#D9D9D9] shadow-lg rounded-lg overflow-hidden border border-[#A39999] w-full h-[300px] md:h-[415px]">
                        <img
                        src="/home-resources/hotelroom1.png"
                        alt="Room 3"
                        className="w-full h-40 md:h-64 object-cover"
                        />
                        <div className="p-2">
                        <p className="text-[#DB9A02] text-xs md:text-sm">LUXURY ROOM</p>
                        <h3 className="text-sm md:text-lg font-semibold text-gray-800">Delux Family Rooms</h3>
                        <p className="text-[#A39999] text-xs mt-1">1500 SQ.FT/Rooms</p>
                            <div className="border-t border-[#A39999] mt-2 pt-2 flex">
                                <div className="flex-1 border-r border-[#A39999] pr-2 flex items-center">
                                <FontAwesomeIcon icon={faBed} className="text-[#A39999] mr-2" />
                                <p className="text-xs text-[#A39999]">2 King Bed</p>
                                </div>
                                <div className="flex-1 pl-2 flex items-center">
                                    <div className="flex">
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02] mr-1" />
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02] mr-1" />
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02] mr-1" />
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02] mr-1" />
                                        <FontAwesomeIcon icon={faStar} className="text-[#DB9A02]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div id="bottom-section" className="px-2 md:px-40 py-4 md:py-10 m-2 md:m-40">
                    <div className="flex flex-col md:flex-row justify-between border-2 border-grey-500">
                        <div className="w-full md:w-1/2 p-2 md:p-10">
                            <p className="text-[#F8B008] mb-2 md:mb-4 text-sm md:text-lg">CONTACT US</p>
                            <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">GET IN TOUCH WITH US</h2>
                            <p className="mb-4 md:mb-6 text-sm md:text-lg tracking-wide">
                                Reach out to us for personalized assistance,<br /> booking inquiries, or any special requests. <br /> We're here to ensure your stay is nothing <br /> short of exceptional.
                            </p>

                            <div className="flex items-center">
                                <img src="/services-resources/phone-icon.svg" alt="Phone Icon" className="w-4 md:w-6" />
                                <p className="text-[#A39999] ml-2 text-xs md:text-sm">Call Us Now</p>     
                            </div>
                            <a href="tel:0910-8733-244" className="ml-4 md:ml-10 underline text-xs md:text-sm">0910-8733-244</a>
                            <hr className="w-1/2 mt-2"/>

                            <div className="flex items-center mt-4">
                            <img src="/services-resources/email-icon.svg" alt="Email Icon" className="w-4 md:w-6" />
                                <p className="text-[#A39999] ml-2 text-xs md:text-sm">Sent us email</p>
                            </div>
                            <a href="mailto:technopark@gmail.com" className="ml-4 md:ml-10 underline text-xs md:text-sm">technopark@gmail.com</a>
                            <hr className="w-1/2 mt-2"/>

                            <div className="flex items-center mt-4">
                            <img src="/services-resources/location-icon.svg" alt="Location Icon" className="w-4 md:w-6" />
                                <p className="text-[#A39999] ml-2 text-xs md:text-sm">Our Location</p>
                            </div>
                            <p className="ml-4 md:ml-10 text-xs md:text-sm">7359+667, Greenfield Pkwy, Santa Rosa, Laguna</p>
                        </div>

                        <div className="w-full md:w-1/2 bg-[#024635] p-4 md:p-6 text-white">
                            <h2 className="text-[#F8B008] text-lg md:text-2xl font-semibold mb-2 md:mb-4 text-center">WHAT IS YOUR CONCERN?</h2>
                            <form onSubmit={handleSubmit} className="px-2 md:px-10">
                                <input 
                                    type="text" 
                                    placeholder="Your Name" 
                                    value={contactData.name}
                                    onChange={e => setContactData('name', e.target.value)}
                                    className="w-full p-2 md:p-3 mb-2 md:mb-4 border border-white bg-transparent focus:outline-none focus:border-green-400 placeholder-white text-xs md:text-sm"
                                    required
                                />
                                <input 
                                    type="email" 
                                    placeholder="Enter Your Email" 
                                    value={contactData.email}
                                    onChange={e => setContactData('email', e.target.value)}
                                    className="w-full p-2 md:p-3 mb-2 md:mb-4 border border-gray-300 bg-transparent focus:outline-none focus:border-green-400 placeholder-white text-xs md:text-sm"
                                    required
                                />
                                <select
                                    id="subject"
                                    value={contactData.subject}
                                    onChange={e => setContactData('subject', e.target.value)}
                                    className="w-full px-2 md:px-3 py-1 md:py-2 border rounded-md bg-[#024635] text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-xs md:text-sm"
                                    required
                                >
                                    <option value="">Select a subject</option>
                                    <option value="Booking Inquiry">Booking Inquiry</option>
                                    <option value="Room Information">Room Information</option>
                                    <option value="Feedback">Feedback</option>
                                </select>
                                <textarea 
                                    rows="2" md:rows="4" 
                                    placeholder="Write Message" 
                                    value={contactData.message}
                                    onChange={e => setContactData('message', e.target.value)}
                                    className="w-full p-2 md:p-3 mb-2 md:mb-4 border border-white bg-transparent focus:outline-none focus:border-green-400 placeholder-white text-xs md:text-sm"
                                    required
                                ></textarea>
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="bg-[#F8B008] text-white px-2 md:px-4 py-1 md:py-2 hover:bg-yellow-500 w-full disabled:opacity-50 text-xs md:text-sm"
                                >
                                    {processing ? 'SENDING...' : 'SEND MESSAGE'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <Footer></Footer>
        </>
    );
}