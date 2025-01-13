'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useActionState } from 'react';
import { toast } from 'react-toastify';
import bookSpace from '@/app/actions/bookSpace';

const BookingForm = ( {space} ) => {

  const [state, formAction] = useActionState(bookSpace, {});

  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success('Space has been reserved!');
      router.push('/bookings');
    }
  }, [state]);


    return ( <div className="mt-6">
        <h2 className="text-xl font-bold">Reserve this Space</h2>
        <form action= {formAction} className="mt-4">
          <input type='hidden' name='space_id' value={space.$id}/>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="check_in_date"
                className="block text-sm font-medium text-gray-700"
              >
                Check-In Date
              </label>
              <input
                type="date"
                id="check_in_date"
                name="check_in_date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="check_in_time"
                className="block text-sm font-medium text-gray-700"
              >
                Check-In Time
              </label>
              <input
                type="time"
                id="check_in_time"
                name="check_in_time"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="check_out_date"
                className="block text-sm font-medium text-gray-700"
              >
                Check-Out Date
              </label>
              <input
                type="date"
                id="check_out_date"
                name="check_out_date"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="check_out_time"
                className="block text-sm font-medium text-gray-700"
              >
                Check-Out Time
              </label>
              <input
                type="time"
                id="check_out_time"
                name="check_out_time"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-950 hover:bg-gray-400 hover:text-black hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            > 
              Reserve Space
            </button>
          </div>
        </form>
      </div> );
}
 
export default BookingForm;