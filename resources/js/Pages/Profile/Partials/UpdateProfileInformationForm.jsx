    import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

    export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
    }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
        name: user.name,
        email: user.email,
        });

    const validateEmail = (email) => {
        if (email.includes(' ')) {
            return false;
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value.replace(/\s/g, ''); // Remove any spaces
        setData('email', value);
    };

    const submit = (e) => {
        e.preventDefault();

        // Validate email before submission
        if (!validateEmail(data.email)) {
            Swal.fire({
                title: 'Invalid Email',
                text: 'Please enter a valid email address',
                icon: 'error',
                confirmButtonColor: '#024635'
            });
            return;
        }

        patch(route('profile.update'), {
        onSuccess: () => {
            Swal.fire({
            title: 'Success!',
            text: 'Profile updated successfully!',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false
            });
        },
        onError: () => {
            Swal.fire({
            title: 'Error',
            text: 'Failed to update profile.',
            icon: 'error',
            timer: 2000,
            showConfirmButton: false
            });
        },
        });
    };

    useEffect(() => {
        if (status === 'verification-link-sent') {
        Swal.fire({
            title: 'Verification Link Sent',
            text: 'A new verification link has been sent to your email address.',
            icon: 'success',
            showConfirmButton: true
        });
        }
    }, [status]);

    return (
        <section className={`${className} max-w-2xl mx-auto p-6 bg-white`}>
        <header>
            <img 
            src="profile-resources/Profile.png" 
            alt="Profile Image" 
            className="mx-auto rounded-full w-24 h-24"
            />
            <h2 className="text-xl font-medium text-gray-900 text-center">
            Profile Information
            </h2>

            <p className="mt-2 text-sm text-gray-600 text-center">
            Update your account's profile information and email address.
            </p>
        </header>

        <form onSubmit={submit} className="mt-6 space-y-6">
            <div className="flex flex-col">
            <InputLabel htmlFor="name" value="Name" />
            <TextInput
                id="name"
                className="mt-1 block w-full"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                required
                isFocused
                autoComplete="name"
            />
            <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="flex flex-col">
            <InputLabel htmlFor="email" value="Email" />
            <TextInput
                id="email"
                type="email"
                className={`mt-1 block w-full ${data.email && !validateEmail(data.email) ? 'border-red-500' : ''}`}
                value={data.email}
                onChange={handleEmailChange}
                required
                autoComplete="username"
            />
            <InputError className="mt-2" message={errors.email} />
            {data.email && !validateEmail(data.email) && (
                <p className="text-xs text-red-600 mt-1">
                    Please enter a valid email address (e.g., user@example.com)
                </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
                Enter a valid email address that you have access to.
            </p>
            </div>

            {user.email_verified_at === null && (
            <div className="mt-2 text-sm text-red-600 flex items-center gap-x-1">
                <ExclamationCircleIcon className="h-5 w-5 text-red-600" />
                <span>Your email address is unverified.</span>
                <Link
                href={route('verification.send')}
                method="post"
                as="button"
                className="text-sm text-gray-600 underline hover:text-gray-900"
                >
                Click here to re-send the verification email.
                </Link>
            </div>
            )}

            {user.email_verified_at !== null && (
            <div className="mt-2 text-sm text-green-900 flex items-center gap-x-1">
                <CheckCircleIcon className="h-5 w-5 text-green-900" />
                Your email address is verified.
            </div>
            )}

            <div className="flex items-center justify-center gap-4 mt-4">
            <PrimaryButton disabled={processing || (data.email && !validateEmail(data.email))}>Save</PrimaryButton>
            </div>
        </form>
        </section>
    );
    }
