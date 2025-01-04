import { Head } from '@inertiajs/react';
import HeaderLayout from '@/Layouts/HeaderLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <div className="relative w-full h-screen z-0">
                <img
                    src="/home-resources/home-cover.png" 
                    alt="Cover Image"
                    className="absolute top-0 left-0 object-cover w-full h-full z-0"
                />
                <HeaderLayout activeLink="home">
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
                        <p className="text-white text-lg md:text-xl mb-2">
                            Unwind in style and sophistication
                        </p>
                     
                        <h1 className="text-white text-4xl md:text-6xl font-bold">
                            ARRIVE AS A GUEST LEAVE<br /> AS A FAMILY
                        </h1>

                        <SecondaryButton className="mt-12">
                            Discover More
                        </SecondaryButton>

                    </div>
                </HeaderLayout>
            </div>

            <div className="relative z-20 flex justify-center" style={{ marginTop: '-4rem' }}>
                <div className="bg-[#024635] shadow-lg rounded-lg w-3/4 p-8 text-center relative">
                    {/*Line */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-[#F8B008] rounded"></div>
                    
                    <div className="grid grid-cols-5 gap-4 mt-6 text-left text-white">

                        {/* Check In */}
                        <div className="flex flex-col items-start border-r border-white pr-4">
                            <label htmlFor="check-in" className="text-sm mb-2">
                                Check In
                            </label>
                            <input
                                id="check-in"
                                type="date"
                                className="bg-transparent text-white border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-[#F8B008]"
                            />
                        </div>
                        

                        {/* Check Out */}
                        <div className="flex flex-col items-start border-r border-white pr-4">
                            <label htmlFor="check-out" className="text-sm mb-2">
                                Check Out
                            </label>
                            <input
                                id="check-out"
                                type="date"
                                className="bg-transparent text-white border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-[#F8B008]"
                            />
                        </div>

                        {/* Rooms */}
                        <div className="flex flex-col items-start border-r border-white pr-4">
                            <label htmlFor="rooms" className="text-sm mb-2">
                                Rooms
                            </label>
                            <input
                                id="rooms"
                                type="number"
                                min="1"
                                className="bg-transparent text-white border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-[#F8B008]"
                            />
                        </div>

                        {/* Guests */}
                        <div className="flex flex-col items-start">
                            <label htmlFor="guests" className="text-sm mb-2">
                                Guests
                            </label>
                            <input
                                id="guests"
                                type="number"
                                min="1"
                                className="bg-transparent text-white border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:border-[#F8B008]"
                            />
                        </div>

                        {/* Book Now Button */}
                        <div className="flex justify-center items-center col-span-1">
                            <PrimaryButton>
                                Book Now
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#E2E6E5] py-16 -mt-32 z-0">
                <div className="max-w-7xl mx-auto px-4 text-center mt-32">
                    <img
                        src="/logo-and-icons/Logo.png"
                        alt="Logo"
                        className="h-24 w-24 mx-auto mb-4" 
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">
                        HOTEL’S ROOM & SUITES
                    </h2>
                    <p className="mt-4 text-gray-600">
                    Take your time to choose the perfect room<br /> that matches your comfort and style
                    </p>
                </div>
            </div>
        </>
    );
}
