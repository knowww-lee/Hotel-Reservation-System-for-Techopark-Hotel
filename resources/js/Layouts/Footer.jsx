const Footer = () => {
    return (
        <footer className="w-full">
            <div className="bg-[#024635] py-8 md:py-16">
                <div className="container mx-auto flex flex-col md:flex-row justify-between">
                    <div className="text-white mb-8 md:mb-0">
                        <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
                            <img src="/logo-and-icons/Logo.png" alt="Logo" className="h-20 md:h-32" />
                            <h2 className="text-white text-lg md:text-2xl mt-4 md:mt-0 md:ml-4 text-center md:text-left">
                                <span className="font-bold">TECHNOPARK</span><br />
                                HOTEL
                            </h2>
                        </div>
                        <p className="mt-4 text-sm md:text-lg text-center md:text-left">
                            Experience the beauty of our hotel, <br /> where stunning spaces and <br /> exceptional service turn your dreams <br /> into reality and exceed expectations.
                        </p>
                    </div>

                    <div className="text-white space-y-2 mt-4 md:mt-0">
                        <h3 className="text-lg md:text-2xl font-bold text-center md:text-left mt-2 pt-8 pb-5">CONTACT INFO</h3>
                        <ul className="list-none text-sm md:text-lg space-y-4">
                            <li>
                                <div className="flex items-center justify-center md:justify-start">
                                    <img src="/footer-resources/email-icon.svg" alt="email icon" className="h-5 w-5" />
                                    <a href="mailto:technopark@gmail.com" className="hover:underline ml-4">technopark@gmail.com</a>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center justify-center md:justify-start">
                                    <img src="/footer-resources/telephone-icon.svg" alt="telephone icon" className="h-5 w-5" />
                                    <a href="tel:0910-8733-244" className="hover:underline ml-4">0910-8733-244</a>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center justify-center md:justify-start">
                                    <img src="/footer-resources/location-icon.svg" alt="location icon" className="h-5 w-5" />
                                    <p className="ml-4">7359+667, Greenfield Pkwy, Santa Rosa, Laguna</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="text-white space-y-4 mt-4 md:mt-0">
                        <h3 className="text-lg md:text-2xl font-bold mt-2 pt-8 pb-5 text-center md:text-left">INFORMATION</h3>
                        <ul className="list-none text-sm md:text-lg space-y-4 text-center md:text-left">
                            <li><a href="about" className="hover:underline">About Us</a></li>
                            <li><a href="/services" className="hover:underline">Services</a></li>
                            <li><a href="/services#bottom-section" className="hover:underline">Customer Support</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-white py-4">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                    <p className="text-center md:text-left text-sm md:text-base">&copy; 2025 Tech Park Hotel, All Rights Reserved.</p>
                    <p className="text-center md:text-right text-sm md:text-base">Developed by: Dream Team ni Dom</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
