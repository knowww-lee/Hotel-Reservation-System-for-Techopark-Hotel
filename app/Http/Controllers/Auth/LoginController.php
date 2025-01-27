<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class LoginController extends Controller
{
    /**
     * Verify the user's name for security purposes after multiple failed login attempts.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function verifyName(Request $request)
    {
        try {
            // Validate the request
            $request->validate([
                'email' => 'required|email',
                'name' => 'required|string'
            ]);

            // Find the user by email
            $user = User::where('email', $request->email)->first();

            // Log the verification attempt
            Log::info('Name verification attempt', [
                'email' => $request->email,
                'provided_name' => $request->name,
                'user_found' => (bool)$user
            ]);

            if (!$user) {
                return back()->with([
                    'error' => 'User not found',
                    'type' => 'error',
                    'title' => 'Error!',
                    'message' => 'No user found with this email address.'
                ]);
            }

            // Compare the provided name with the stored name (case-insensitive)
            if (strtolower($user->name) !== strtolower($request->name)) {
                Log::warning('Failed name verification', [
                    'email' => $request->email,
                    'provided_name' => $request->name
                ]);

                return back()->with([
                    'error' => 'Incorrect name',
                    'type' => 'error',
                    'title' => 'Verification Failed',
                    'message' => 'The name you entered does not match our records.'
                ]);
            }

            Log::info('Successful name verification', [
                'email' => $request->email
            ]);

            return back()->with([
                'success' => true,
                'type' => 'success',
                'title' => 'Success!',
                'message' => 'Name verified successfully. You can now try logging in again.'
            ]);

        } catch (\Exception $e) {
            Log::error('Error during name verification', [
                'error' => $e->getMessage(),
                'email' => $request->email ?? null
            ]);

            return back()->with([
                'error' => 'Verification error',
                'type' => 'error',
                'title' => 'System Error',
                'message' => 'An error occurred during verification. Please try again.'
            ]);
        }
    }
}