import HeaderLayout from '@/Layouts/HeaderLayout';
import { Head } from '@inertiajs/react';
import Footer from "../Layouts/Footer";
import ServicesBody from "../Layouts/ServicesBody";

export default function Services() {
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
                    <div class="size-20 bg-white border-4 border-[#F8B008] rounded-full flex items-center justify-center">
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
        {/* Image and Booking Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Room Image */}
          <div className="md:col-span-2">
            <img
              src="" 
              alt="Delux Family Room"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Booking Form */}
          <div className="bg-[#EDC76D] p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Booking</h2>
            <form className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="checkin">
                Check In : Date
                </label>
                <input
                type="date"
                id="checkin"
                className="w-full px-3 py-2 border rounded-md bg-green-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="checkout">
                Check Out : Date
                </label>
                <input
                type="date"
                id="checkout"
                className="w-full px-3 py-2 border rounded-md bg-green-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="adult">
                Adult : No.
                </label>
                <input
                type="number"
                id="adult"
                className="w-full px-3 py-2 border rounded-md bg-green-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="children">
                Children : No.
                </label>
                <input
                type="number"
                id="children"
                className="w-full px-3 py-2 border rounded-md bg-green-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>


              <br></br>
              <button
                type="submit"
                className="w-full bg-white text-black py-2 rounded-md hover:bg-yellow-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                CONFIRM
              </button>
            </form>
          </div>
        </div>

        {/* Room Details */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Room Description */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">Delux Family Rooms</h1>
            <p className="text-gray-700 mb-6">
              Experience ultimate comfort in our Deluxe Room, featuring elegant decor, premium bedding, modern amenities, and stunning views. Whether you’re here to relax or recharge, this room is your perfect retreat.
            </p>

            {/* Check In and Check Out Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-xl font-bold flex items-center mb-2">
                  <span className="mr-2"></span> Check In
                </h2>
                <ul className="text-gray-700">
                  <li>Check-in from 9:00 AM - anytime</li>
                  <li>Early check-in subject to availability</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold flex items-center mb-2">
                  <span className="mr-2"></span> Check Out
                </h2>
                <ul className="text-gray-700">
                  <li>Check-out before noon</li>
                  <li>Check-out from 9:00 AM - anytime</li>
                </ul>
              </div>
            </div>

            {/* House Rules */}
            <div>
              <h2 className="text-xl font-bold mb-2">House Rules</h2>
              <p className="text-gray-700">
                To ensure a pleasant stay for everyone, we kindly ask guests to maintain a peaceful environment and respect other guests’ privacy. Smoking is strictly prohibited in all rooms and designated non-smoking areas. Please inform the front desk of any visitors, as unregistered guests are not allowed overnight. Lastly, we encourage guests to handle hotel property with care to help us maintain a comfortable space for all.
              </p>
            </div>

            {/* Children & Extra Beds */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-2">Children & Extra Beds</h2>
              <p className="text-gray-700">
                Children of all ages are warmly welcomed at our hotel, and we strive to make their stay enjoyable. Complimentary cribs are available for infants upon request, subject to availability. Extra beds can be arranged for older children or additional guests for an added fee. Please inform us in advance to ensure we can accommodate your family’s needs seamlessly.
              </p>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-bold mb-2">Amenities</h2>
            <ul className="text-gray-700">
              <li>2 - 5 Persons</li>
              <li>Free Wifi Available</li>
              <li>Swimming pools</li>
              <li>Gym Facilities</li>
              <li>Breakfast</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
                 {/* Footer Section */}
               <Footer></Footer>
            </ServicesBody>
              
        </>
    );
}