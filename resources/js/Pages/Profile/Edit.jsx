import ProfileHeader from '@/Layouts/ProfileHeader';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <ProfileHeader
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 flex items-center">
                    <FontAwesomeIcon icon={faUser} className="mr-4" />
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-2 bg-[#D9D9D9]">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow-lg rounded-3xl sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>

            <ToastContainer />
        </ProfileHeader>
    );
}
