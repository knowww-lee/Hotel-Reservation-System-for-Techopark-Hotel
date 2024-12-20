import { Head } from '@inertiajs/react';
import HeaderLayout from '@/Layouts/HeaderLayout';

export default function Home() {
    return (
        <>
            <Head title="Home" />
            <HeaderLayout activeLink="home">
            </HeaderLayout>
        </>
    );
}
