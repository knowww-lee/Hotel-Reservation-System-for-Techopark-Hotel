import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import HeaderLayout from '@/Layouts/HeaderLayout';
import { faBed, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, Link } from '@inertiajs/react';

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
                            ARRIVE AS A GUEST, LEAVE<br /> AS A FAMILY
                        </h1>

                        <Link href={route('about')}>
                            <SecondaryButton className="mt-12">
                                Discover More
                            </SecondaryButton>
                        </Link>
                    </div>
                </HeaderLayout>
            </div>

            <div className="relative z-20 flex justify-center" style={{ marginTop: '-4rem' }}>
                <div className="bg-[#024635] shadow-lg rounded-lg w-3/4 p-8 text-center relative">
                    {/*Line */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-1 bg-[#F8B008] rounded"></div>
                    
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-white text-2xl mb-6">Ready to experience luxury?</h2>
                        <Link href={route('services')}>
                            <PrimaryButton className="px-8 py-3">
                                Book Now
                            </PrimaryButton>
                        </Link>
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
                        HOTEL'S ROOM & SUITES
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Take your time to choose the perfect room<br /> that matches your comfort and style
                    </p>
                </div>

                {/*HOTEL'S ROOM & SUITES Section*/}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 mx-32 mb-6">
                    <div className="bg-[#D9D9D9] shadow-lg rounded-lg overflow-hidden border border-[#A39999] w-[330px] h-[415px]">
                        <img
                        src="/home-resources/hotelroom2.png"
                        alt="Room 1"
                        className="w-full h-64 object-cover"
                        />
                        <div className="p-2">
                            <p className="text-[#DB9A02] text-sm">LUXURY ROOM</p>
                            <h3 className="text-lg font-semibold text-gray-800">Double Suit Rooms</h3>
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

                    <div className="bg-[#D9D9D9] shadow-lg rounded-lg overflow-hidden border border-[#A39999] w-[330px] h-[415px]">
                        <img
                        src="/home-resources/hotelroom3.png"
                        alt="Room 2"
                        className="w-full h-64 object-cover"
                        />
                        <div className="p-2">
                            <p className="text-[#DB9A02] text-sm">LUXURY ROOM</p>
                            <h3 className="text-lg font-semibold text-gray-800">Superior Bed Rooms</h3>
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
                    
                    <div className="bg-[#D9D9D9] shadow-lg rounded-lg overflow-hidden border border-[#A39999] w-[330px] h-[415px]">
                        <img
                        src="/home-resources/hotelroom1.png"
                        alt="Room 3"
                        className="w-full h-64 object-cover"
                        />
                        <div className="p-2">
                        <p className="text-[#DB9A02] text-sm">LUXURY ROOM</p>
                        <h3 className="text-lg font-semibold text-gray-800">Delux Family Rooms</h3>
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

               {/*LUXURY HOTEL AND RESORT Section*/}
                <div className="mt-32 mx-32 flex flex-col md:flex-row items-center justify-between">
                    <div className="w-1/2 md:w-1/2">
                        <img 
                        src="/home-resources/besthotel1.png" 
                        alt="Example Image" 
                        className="w-auto h-[500px] object-cover rounded-lg shadow-lg" 
                        />
                    </div>
                    <div className="w-full md:w-1/2 mt-4 md:mt-0 pl-4 bg-whie p-8 rounded-lg shadow-lg m-4">
                        <p className="text-[#F8B008] text-lg font-semibold">LUXURY HOTEL AND RESORT</p>
                        <h2 className="text-2xl font-semibold text-black mt-2">AFFORDABLE BEST HOTEL IN CITY SANTA ROSA, LAGUNA</h2>
                        <p className="text-gray-600 mt-4">
                        Experience unparalleled hospitality at our award-winning hotel, where every stay is a celebration of comfort and luxury. Recognized for excellence, we pride ourselves on creating moments that leave a lasting impression.
                        </p>

                        <div className="mt-8 flex justify-between ">
                            <div className="flex flex-col items-start">
                                <div className="text-[#F8B008] text-3xl font-bold">
                                    250+
                                </div>
                                <div className="text-black text-md">
                                    Luxury Rooms
                                </div>
                            </div>

                            <div className="flex flex-col items-start">
                                <div className="text-[#F8B008] text-3xl font-bold">
                                    4.0
                                </div>
                                <div className="text-black text-md">
                                    Customer Ratings
                                </div>
                            </div>
                        </div>

                        <Link href={route('about')}>
                            <PrimaryButton className="mt-8">
                                About More
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>       
            </div>
            
        </>
    );
}