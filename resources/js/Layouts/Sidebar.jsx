import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link} from '@inertiajs/react';

export default function Sidebar() {
    return (
<aside class="w-80 bg-white shadow-lg">
  <div class="p-6 text-center">
      <div className="flex justify-center items-center">
            <Link href="/">
                <div className="flex items-center"> 
                    <ApplicationLogo />
                </div>
            </Link>
        </div>
    <h2 class="text-2xl font-bold text-gray-800">Technopark Hotel</h2>
  </div>
  <nav class="mt-8">
    <ul>
      <li class="mb-4  px-10">
            <Link
              href={route('dashboard')}
              className={`flex items-center p-4 rounded-2xl ${
                  route().current('dashboard') ? 'bg-[#024635]' : 'hover:bg-gray-100'
              }`}
          >
              <img
                src={
                  route().current('dashboard')
                      ? '/dashboard-resources/active-dashboard-icon.svg' // Active state image
                      : '/dashboard-resources/dashboard-icon.svg' // Default image
              }
              alt="Dashboard Icon"
            
              />
              <span
                  className={`ml-3 text-center text-xl font-semibold ${
                      route().current('dashboard') ? 'text-[#F8B008]' : 'text-[#024635]'
                  }`}
              >
                  Dashboard
              </span>
          </Link>
      </li>

      <li className="mb-4 px-10">
            <Link
                href={route('frontdesk')}
                className={`flex items-center p-4 rounded-2xl ${
                    route().current('frontdesk') ? 'bg-[#024635]' : 'hover:bg-gray-100'
                }`}
            >
                <img
                  src={
                    route().current('frontdesk')
                        ? '/dashboard-resources/active-frontdesk-icon.svg' // Active state image
                        : '/dashboard-resources/frontdesk-icon.svg' // Default image
                }
                alt="Front Desk Icon"
              
                />
                <span
                    className={`ml-3 text-center text-xl font-semibold ${
                        route().current('frontdesk') ? 'text-[#F8B008]' : 'text-[#024635]'
                    }`}
                >
                    Front Desk
                </span>
            </Link>
        </li>


      <li class="mb-4  px-10">
      <Link
        href={route('guest')}
        className={`flex items-center p-4 rounded-2xl ${
            route().current('guest') ? 'bg-[#024635]' : 'hover:bg-gray-100'
        }`}
    >
        <img
           src={
            route().current('guest')
                ? '/dashboard-resources/active-guest-icon.svg' // Active state image
                : '/dashboard-resources/guest-icon.svg' // Default image
        }
        alt="Guest Icon"
       
        />
        <span
            className={`ml-3 text-center text-xl font-semibold ${
                route().current('guest') ? 'text-[#F8B008]' : 'text-[#024635]'
            }`}
        >
           Guest
        </span>
    </Link>
       
      </li>

      <li class="mb-4  px-10">
      <Link
        href={route('rooms')}
        className={`flex items-center p-4 rounded-2xl ${
            route().current('rooms') ? 'bg-[#024635]' : 'hover:bg-gray-100'
        }`}
    >
        <img
           src={
            route().current('rooms')
                ? '/dashboard-resources/active-rooms-icon.svg' // Active state image
                : '/dashboard-resources/rooms-icon.svg' // Default image
        }
        alt="Rooms Icon"
       
        />
        <span
            className={`ml-3 text-center text-xl font-semibold ${
                route().current('rooms') ? 'text-[#F8B008]' : 'text-[#024635]'
            }`}
        >
           Rooms
        </span>
    </Link>
       
      </li>

     
    
    </ul>
  </nav>
</aside>

);
}