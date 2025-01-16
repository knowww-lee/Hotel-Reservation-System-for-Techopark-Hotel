import { Head } from '@inertiajs/react';
import AdminDashboard from "../Layouts/AdminDashboard";


export default function FrontDesk() {
    return (
        <>
            <Head title="Front Desk" />

            <AdminDashboard>         


<section class="py-4 px-4 bg-white rounded-2xl shadow-lg">
  <h2 class="mb-4 text-lg font-semibold text-gray-800">Overview</h2>
  <div class="grid grid-cols-4 gap-6">
    <div>
      <p class="text-sm text-gray-500">Today's</p>
      <p class="text-md font-semibold text-gray-500">Check-in <span class="ml-2 text-2xl font-bold text-[#F8B008]">23</span></p>
    </div>
    <div>
      <p class="text-sm text-gray-500">Today's</p>
      <p class="text-md font-semibold text-gray-500">Check-out <span class="ml-2 text-2xl font-bold text-[#F8B008]">13</span></p>
      
    </div>
    <div>
      <p class="text-sm text-gray-500">Total</p>
      <p class="text-md font-semibold text-gray-500">Total <span class="ml-2 text-2xl font-bold text-[#F8B008]">10</span></p>
    </div>
    <div>
      <p class="text-sm text-gray-500">Total</p>
      <p class="text-md font-semibold text-gray-500">Total <span class="ml-2 text-2xl font-bold text-[#F8B008]">90</span></p>
    </div>
  </div>
</section>

    <section class="p-4 bg-white rounded-lg shadow mt-6">
    <h2 class="mb-4 text-lg font-semibold text-gray-800">Rooms</h2>
    <div class="grid grid-cols-1 gap-40 mt-6 lg:grid-cols-2 xl:grid-cols-3">
        <div class="p-4 bg-white rounded-lg border border-gray-400">
          <h3 class="text-sm font-medium text-gray-500">Single Sharing</h3>
          <p class="mt-1 text-sm text-gray-500">2/30 Available</p>
          <p class="mt-2 text-md font-bold text-gray-500"> <span className="text-2xl text-[#F8B008]"> $568</span> /day</p>
        </div>
        <div class="p-4 bg-white rounded-lg border border-gray-400">
        <h3 class="text-sm font-medium text-gray-500">Single Sharing</h3>
          <p class="mt-1 text-sm text-gray-500">2/30 Available</p>
          <p class="mt-2 text-md font-bold text-gray-500"> <span className="text-2xl text-[#F8B008]"> $568</span> /day</p>
        </div>
        <div class="p-4 bg-white rounded-lg border border-gray-400">
        <h3 class="text-sm font-medium text-gray-500">Single Sharing</h3>
          <p class="mt-1 text-sm text-gray-500">2/30 Available</p>
          <p class="mt-2 text-md font-bold text-gray-500"> <span className="text-2xl text-[#F8B008]"> $568</span> /day</p>
        </div>
    </div>
       
      </section>
     
      <section class="grid grid-cols-1 gap-40 mt-6 xl:grid-cols-2 mx-20">
        <div class="p-4 bg-white rounded-2xl shadow ">
          <h3 class="text-lg font-medium text-gray-800">Room Status</h3>
          <ul class="mt-4 space-y-2 text-sm text-gray-600">
            <li className="font-semibold">Occupied Rooms: 104</li>
            <li>Clean: 90</li>
            <li>Dirty: 4</li>
            <li>Inspected: 60</li>
          </ul>
         
          <ul class="mt-4 space-y-2 text-sm text-gray-600">
            <li className="font-semibold">Available Rooms: 104</li>
            <li>Clean: 90</li>
            <li>Dirty: 4</li>
            <li>Inspected: 60</li>
          </ul>
        </div>
        <div class="p-4 bg-white rounded-2xl shadow ">
          <h3 class="text-lg font-medium text-gray-800">Customer Feedback</h3>
          <ul class="mt-4 space-y-2 text-sm text-gray-600">
            <li > <span className="font-semibold">Mark:</span>  <br /> Food could be better (A201)</li>
            <li ><span className="font-semibold">Mark:</span> <br />Facilities are not enough (A101)</li>
            <li ><span className="font-semibold">Mark:</span>  <br /> Room cleaning could improve (A301)</li>
          </ul>
        </div>
      </section>
            </AdminDashboard>
              
        </>
    );
}