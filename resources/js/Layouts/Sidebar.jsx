import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link} from '@inertiajs/react';

export default function Sidebar() {
    return (
<aside class="w-80 bg-white shadow-lg">
  <div class="p-6 text-center">
      <div className="flex shrink-0 items-center">
                                <Link href="/">
                                   
                                        <div className="flex items-center w-3/4"> 
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                            <h2 className="text-white text-2xl">
                                                <span className="font-bold">TECHNOPARK</span><br />
                                                HOTEL
                                            </h2>
                                        </div>
                                </Link>
        </div>
    <h2 class="text-2xl font-bold text-gray-800">Technopark Hotel</h2>
  </div>
  <nav class="mt-8">
    <ul>
      <li class="mb-4  px-10">
        <a href="#" class="flex items-center p-4 text-gray-800 bg-[#024635] rounded-2xl">
        <img
                    src="/dashboard-resources/dashboard-icon.svg" 
                    alt="Dashboard Icon"
                    className=""
        />
          <span class="ml-3 text-[#F8B008] text-center text-xl font-semibold">Dashboard</span>
        </a>
      </li>

      <li class="mb-4  px-10">
        <a href="#" class="flex items-center p-4 text-gray-600 hover:bg-gray-100 rounded-lg">
        <img
                    src="/dashboard-resources/frontdesk-icon.svg" 
                    alt="Front Desk Icon"
                    className=""
        />
          <span class="ml-3 text-[#024635] text-center text-xl font-semibold">Front Desk</span>
        </a>
      </li>

      <li class="mb-4  px-10">
        <a href="#" class="flex items-center p-4 text-gray-600 hover:bg-gray-100 rounded-lg">
        <img
                    src="/dashboard-resources/guest-icon.svg" 
                    alt="Guest Icon"
                    className=""
        />
          <span class="ml-3 text-[#024635] text-center text-xl font-semibold">Guest</span>
        </a>
      </li>

      <li class="mb-4  px-10">
        <a href="#" class="flex items-center p-4 text-gray-600 hover:bg-gray-100 rounded-lg">
        <img
                    src="/dashboard-resources/rooms-icon.svg" 
                    alt="Rooms Icon"
                    className=""
        />
          <span class="ml-3 text-[#024635] text-center text-xl font-semibold">Rooms</span>
        </a>
      </li>
    
    </ul>
  </nav>
</aside>

);
}