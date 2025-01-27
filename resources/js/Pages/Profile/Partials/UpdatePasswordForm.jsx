import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Password updated successfully!',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                reset();
            },
            onError: (errors) => {
                Swal.fire({
                    title: 'Error',
                    text: 'Failed to update password.',
                    icon: 'error',
                    timer: 2000,
                    showConfirmButton: false
                });
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={`${className} max-w-2xl mx-auto p-6 bg-white`}>
            <header>
                <img 
                    src="profile-resources/Password.png" 
                    alt="Password Image" 
                    className="mx-auto mb-2 rounded-full w-24 h-24"
                />
                <h2 className="text-xl font-medium text-gray-900 text-center">
                    Update Password
                </h2>

                <p className="mt-2 text-sm text-gray-600 text-center">
                    Ensure your account is using a long, random password to stay secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div className="flex flex-col">
                    <InputLabel htmlFor="current_password" value="Current Password" />
                    <div className="relative">
                        <TextInput
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            type={showCurrentPassword ? "text" : "password"}
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                        />
                        <FontAwesomeIcon
                            icon={showCurrentPassword ? faEyeSlash : faEye}
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        />
                    </div>
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div className="flex flex-col">
                    <InputLabel htmlFor="password" value="New Password" />
                    <div className="relative">
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            type={showPassword ? "text" : "password"}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex flex-col">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <div className="relative">
                        <TextInput
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            type={showPasswordConfirmation ? "text" : "password"}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                        />
                        <FontAwesomeIcon
                            icon={showPasswordConfirmation ? faEyeSlash : faEye}
                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        />
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-center gap-4 mt-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                </div>
            </form>
        </section>
    );
}
