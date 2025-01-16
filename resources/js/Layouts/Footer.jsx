
const Footer = () => {
  
    return (
        <>
            <footer className="w-full">
            <div className="bg-[#024635] py-16">
                <div className="container mx-auto flex flex-col md:flex-row justify-between">
                    <div className="text-white mb-8 md:mb-0">
                        <div className="flex items-center w-3/4"> 
                        <img src="/logo-and-icons/Logo.png" alt="Logo" class="h-48" /> 
                        <h2 className="text-white text-2xl">
                            <span className="font-bold">TECHNOPARK</span><br />
                            HOTEL
                        </h2>
                        </div>
                    <p className="mt-4 text-lg">Experience the beauty of our hotel, <br /> where stunning spaces and <br /> exceptional service turn your dreams <br /> into reality and exceed expectations.</p>
                    </div>
                    <div className="text-white space-y-4">
                    <h3 className="text-2xl font-bold text-center mt-10 pt-8 pb-20">CONTACT INFO</h3>
                    <ul className="list-none text-lg space-y-4">
                        <li>
                            <div className="flex">
                            <img src="/footer-resources/email-icon.svg" alt="email icon" />
                            <a href="mailto:technopark@gmail.com" class="hover:underline ml-4">technopark@gmail.com</a>
                            </div>
                           
                        </li>
                        <li>
                            <div className="flex">
                            <img src="/footer-resources/telephone-icon.svg" alt="telephone icon" />
                            <a href="tel:0910-8733-244" class="hover:underline ml-4">0910-8733-244</a>
                            </div>
                            
                        </li>
                        <li>
                            <div className="flex">
                            <img src="/footer-resources/location-icon.svg" alt="telephone icon" />
                            <p className="ml-4">7359+667, Greenfield Pkwy, Santa Rosa, Laguna</p>
                            </div>
                            
                            </li>
                    </ul>
                    </div>
                    <div className="text-white space-y-4">
                    <h3 className="text-2xl font-bold mt-10 pt-8 pb-20">INFORMATION</h3>
                    <ul className="list-none text-lg space-y-4 text-center">
                        <li><a href="about" class="hover:underline">About Us</a></li>
                        <li><a href="/services" class="hover:underline">Services</a></li>
                        <li><a href="/services#bottom-section" class="hover:underline">Customer Support</a></li>
                    </ul>
                    </div>
                </div>
                </div>

                <div className="bg-white py-4">
                <div className="container mx-auto flex justify-between">
                    <p>&copy; 2025 Tech Park Hotel, All Rights Reserved.</p>
                    <p>Developed by: Dream Team ni Dom</p>
                </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;