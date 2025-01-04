import { Head } from '@inertiajs/react';
import HeaderLayout from '@/Layouts/HeaderLayout';
import SecondaryButton from '@/Components/SecondaryButton';

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
            
        </>
    );
}
