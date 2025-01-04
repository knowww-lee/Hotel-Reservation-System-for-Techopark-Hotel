import { Head } from '@inertiajs/react';
import HeaderLayout from '@/Layouts/HeaderLayout';

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
            
        </>
    );
}
