import { Head } from '@inertiajs/react';
import HeaderLayout from '@/Layouts/HeaderLayout';

export default function About() {
    return (
        <>
            <Head title="About Us" />
            <HeaderLayout activeLink="about">
            </HeaderLayout>
        </>
    );
}
