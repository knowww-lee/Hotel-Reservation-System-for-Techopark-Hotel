import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const [passwordRequirements, setPasswordRequirements] = useState({
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
        length: false
    });

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

    const validatePassword = (password) => {
        if (password.includes(' ')) {
            return {
                isValid: false,
                errors: {
                    space: 'Password cannot contain spaces'
                }
            };
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isLongEnough = password.length >= 8;

        setPasswordRequirements({
            uppercase: hasUpperCase,
            lowercase: hasLowerCase,
            number: hasNumbers,
            special: hasSpecialChar,
            length: isLongEnough
        });

        return {
            isValid: hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough,
            errors: {
                uppercase: !hasUpperCase ? 'Missing uppercase letter' : '',
                lowercase: !hasLowerCase ? 'Missing lowercase letter' : '',
                number: !hasNumbers ? 'Missing number' : '',
                special: !hasSpecialChar ? 'Missing special character' : '',
                length: !isLongEnough ? 'Password must be at least 8 characters' : ''
            }
        };
    };

    useEffect(() => {
        validatePassword(data.password);
    }, [data.password]);

    const updatePassword = (e) => {
        e.preventDefault();

        // Validate password
        const passwordValidation = validatePassword(data.password);
        if (!passwordValidation.isValid) {
            const errorMessages = Object.values(passwordValidation.errors)
                .filter(error => error !== '')
                .join('\n');
            
            Swal.fire({
                title: 'Invalid Password',
                html: errorMessages.replace(/\n/g, '<br>'),
                icon: 'error',
                confirmButtonColor: '#024635'
            });
            return;
        }

        // Validate password confirmation
        if (data.password !== data.password_confirmation) {
            Swal.fire({
                title: 'Password Mismatch',
                text: 'Password and confirmation do not match',
                icon: 'error',
                confirmButtonColor: '#024635'
            });
            return;
        }

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
                    <div className="text-xs text-gray-700 mt-2 bg-white p-3 rounded-lg shadow-sm">
                        Password requirements:
                        <ul className="mt-1 space-y-1">
                            <li className={`flex items-center ${passwordRequirements.length ? 'text-green-600' : 'text-red-600'}`}>
                                {passwordRequirements.length ? '✓' : '✗'} At least 8 characters
                            </li>
                            <li className={`flex items-center ${passwordRequirements.uppercase ? 'text-green-600' : 'text-red-600'}`}>
                                {passwordRequirements.uppercase ? '✓' : '✗'} At least one uppercase letter
                            </li>
                            <li className={`flex items-center ${passwordRequirements.lowercase ? 'text-green-600' : 'text-red-600'}`}>
                                {passwordRequirements.lowercase ? '✓' : '✗'} At least one lowercase letter
                            </li>
                            <li className={`flex items-center ${passwordRequirements.number ? 'text-green-600' : 'text-red-600'}`}>
                                {passwordRequirements.number ? '✓' : '✗'} At least one number
                            </li>
                            <li className={`flex items-center ${passwordRequirements.special ? 'text-green-600' : 'text-red-600'}`}>
                                {passwordRequirements.special ? '✓' : '✗'} At least one special character (!@#$%^&*(),.?":{}|&lt;&gt;)
                            </li>
                        </ul>
                    </div>
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
