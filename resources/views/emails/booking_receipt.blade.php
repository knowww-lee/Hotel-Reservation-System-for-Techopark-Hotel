<!DOCTYPE html>
<html>
<head>
    <title>Booking Receipt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px;
            background-color: #024635;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .header img {
            max-width: 100px;
            margin-bottom: 10px;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #024635;
            margin-bottom: 10px;
        }
        .highlight {
            background-color: #F8B008;
            color: #024635;
            padding: 12px;
            font-weight: bold;
            text-align: center;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        .details {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 4px;
        }
        .details ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        .details ul li {
            padding: 8px 0;
            border-bottom: 1px solid #ddd;
        }
        .details ul li:last-child {
            border-bottom: none;
        }
        .details ul li strong {
            color: #024635;
        }
        .footer {
            text-align: center;
            padding: 15px;
            background-color: #024635;
            color: #ffffff;
            border-radius: 0 0 8px 8px;
            font-size: 12px;
            margin-top: 20px;
        }
        .guidance {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #024635;
            font-weight: bold;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset('logo-and-icons/Logo.png') }}" alt="Hotel Logo">
            <h1>Booking Receipt</h1>
        </div>
        <div class="content">
            <h2>Thank you for your booking!</h2>
            <div class="highlight">
                Room Number: {{ $roomNumber }}
            </div>
            <p>Here are your booking details:</p>
            <div class="details">
                <ul>
                    <li><strong>Name:</strong> {{ $bookingDetails['name'] }}</li>
                    <li><strong>Email:</strong> {{ $bookingDetails['email'] }}</li>
                    <li><strong>Phone:</strong> {{ $bookingDetails['phone'] }}</li>
                    <li><strong>Check-in Date:</strong> {{ $bookingDetails['check_in'] }}</li>
                    <li><strong>Check-out Date:</strong> {{ $bookingDetails['check_out'] }}</li>
                    <li><strong>Room Type:</strong> {{ $bookingDetails['room_type'] }}</li>
                    <li><strong>Special Requests:</strong> {{ $bookingDetails['special_requests'] }}</li>
                </ul>
            </div>
            <p class="guidance">Please present this receipt to the receptionist upon arrival for a smooth check-in process.</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Technopark Hotel. All rights reserved.
        </div>
    </div>
</body>
</html>
