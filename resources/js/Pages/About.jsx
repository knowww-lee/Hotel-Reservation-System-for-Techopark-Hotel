import HeaderLayout from '@/Layouts/HeaderLayout';
import { Head } from '@inertiajs/react';
import AboutBody from "../Layouts/AboutBody";
import Footer from "../Layouts/Footer";

export default function About() {
    return (
        <>
            <Head title="About Us" />

            <div className="relative w-full h-screen z-0">
                <img
                    src="/about-us-resources/aboutus-cover.png" 
                    alt="Cover Image"
                    className="absolute top-0 left-0 object-cover w-full h-full z-0"
                />

                <HeaderLayout activeLink="about">
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
                        <p className="text-white text-lg md:text-xl mb-2" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
                            Where Everything Begins
                        </p>
                     
                        <h1 className="text-white text-4xl md:text-6xl font-bold" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
                            Know Our Story
                        </h1>
                    </div>
                </HeaderLayout>       
            </div>

            {/* Luxury Hotel and Resort Section */}
            <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-20 mb-2">
                <div className="relative w-full md:w-1/2 mb-6 md:mb-0">
                    <div className="bg-gradient-to-r from-[#F8B008] to-[#D9D9D9] absolute h-4/5 w-2/3 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10"></div>
                    <div className="flex justify-center h-70">
                        <img
                            src="/about-us-resources/aboutus-hotel.png" 
                            alt="Hotel interior"
                            className="w-auto h-[300px] md:h-[500px] object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-10">
                    <p className="text-md font-semibold text-yellow-500 uppercase text-center md:text-left">
                        Luxury Hotel and Resort
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold leading-snug mt-2 uppercase text-center md:text-left">
                        Affordable Best Hotel in City <br /> Santa Rosa, Laguna
                    </h1>
                    <p className="mt-2 text-justify text-sm md:text-xl tracking-widest">
                        Experience unparalleled hospitality at our <br/> award-winning hotel, where
                        every stay is a <br /> celebration of comfort and luxury. <br /> Recognized for
                        excellence, we pride <br /> ourselves on creating moments that leave <br /> a lasting
                        impression.
                    </p>
                </div>
            </div>

            {/* Hotel's Facilities */}
            <div className="bg-[#E7E2D5] py-8 md:py-16 z-0">
                <div className="flex justify-center">
                    <img src="/logo-and-icons/Logo.png" alt="Logo" className="h-24 md:h-48" />
                </div>

                <div className="text-center text-black text-xl md:text-2xl mb-2 font-semibold">
                    HOTEL'S FACILITIES
                </div>  

                <div className="text-center text-black text-sm md:text-lg mb-6">
                    Experience exceptional facilities crafted for relaxation and enjoyment throughout your stay
                </div>

                <div className="flex flex-wrap justify-center md:space-x-12 space-y-0">
                    <img src="/about-us-resources/Home-Services.svg" alt="Home Services Logo" className="w-24 h-24 md:w-40 md:h-40 lg:w-50 lg:h-50" />
                    <img src="/about-us-resources/Breakfast.svg" alt="Breakfast Logo" className="w-24 h-24 md:w-40 md:h-40 lg:w-50 lg:h-50" />
                    <img src="/about-us-resources/Swimming-Pool.svg" alt="Swimming Pool Logo" className="w-24 h-24 md:w-40 md:h-40 lg:w-50 lg:h-50" />
                    <img src="/about-us-resources/Smart-Key.svg" alt="Smart Key Logo" className="w-24 h-24 md:w-40 md:h-40 lg:w-50 lg:h-50" />
                </div>
            </div>

            {/* Customer Review Section */}
            <div className="bg-[#024635] p-6 md:p-20">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    <img src="/about-us-resources/Hotel-Room.png" alt="Hotel Room" className="shadow-lg"/>
                    <div className="text-white flex flex-col justify-center">
                        <p className="text-[#F8B008] font-bold text-md">Customer</p>
                        <h2 className="text-2xl font-semibold mt-2 uppercase">Technopark Hotel in <br /> Santa Rosa, Laguna</h2>
                        <p className="mt-4 text-md text-gray-200 leading-relaxed">
                            The staff at Technopark Hotel went above and beyond to make our three-day seminar truly exceptional.
                            Their warmth, professionalism, and attention to detail created an atmosphere of comfort and ease for everyone. 
                            We’re incredibly grateful for their unwavering support and hospitality throughout our stay.
                        </p>
                        <div className="flex items-center mt-4">
                            <img src="/about-us-resources/Profile-Logo.svg" alt="Profile Logo" />
                            <div className="ml-4">
                                <p className="font-semibold">Rose Anne Sere</p>
                                <div className="flex items-center">
                                    <hr className="w-1/4 border-gray-200 mr-2" /> 
                                    <p className="text-md text-gray-400">Customer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HOTEL’S ROOM & SUITES Section */}
            <div className="max-w-7xl mx-auto px-4 text-center mt-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 mx-4 md:mx-32 mb-6">
                    <div className="bg-[#D9D9D9] shadow-lg overflow-hidden border border-[#A39999] w-full md:w-[330px] h-[415px] mx-auto">
                        <img
                            src="/about-us-resources/Room1.png"
                            alt="Room 1"
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-2">
                            <p className="text-sm">December 10, 2024</p>
                            <h3 className="text-lg font-semibold text-gray-800">Best in Hotel Laguna</h3>
                            <div className="border-t border-[#A39999] mt-2 pt-2 flex">
                                <div className="flex-1 border-r border-[#A39999] pr-2 flex items-center"></div>
                                <div className="flex-1 pl-2 flex items-center">
                                    <div className="flex"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#D9D9D9] shadow-lg overflow-hidden border border-[#A39999] w-full md:w-[330px] h-[415px] mx-auto">
                        <img
                            src="/about-us-resources/Room2.png"
                            alt="Room 2"
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-2">
                            <p className="text-sm">December 10, 2024</p>
                            <h3 className="text-lg font-semibold text-gray-800">Best Travelling Spot</h3>
                            <div className="border-t border-[#A39999] mt-2 pt-2 flex">
                                <div className="flex-1 border-r border-[#A39999] pr-2 flex items-center"></div>
                                <div className="flex-1 pl-2 flex items-center">
                                    <div className="flex"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-[#D9D9D9] shadow-lg overflow-hidden border border-[#A39999] w-full md:w-[330px] h-[415px] mx-auto">
                        <img
                            src="/about-us-resources/Room3.png"
                            alt="Room 3"
                            className="w-full h-64 object-cover"
                        />
                        <div className="p-2">
                            <p className="text-sm">December 10, 2024</p>
                            <h3 className="text-lg font-semibold text-gray-800">Best in CALABARZON</h3>
                            <div className="border-t border-[#A39999] mt-2 pt-2 flex">
                                <div className="flex-1 border-r border-[#A39999] pr-2 flex items-center"></div>
                                <div className="flex-1 pl-2 flex items-center">
                                    <div className="flex"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <Footer />
        </>
    );
}