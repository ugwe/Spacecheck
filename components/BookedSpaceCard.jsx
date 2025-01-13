import Link from 'next/link';
import CancelBookingButton from './CancelBookingButton';


const BookedSpaceCard = ({ booking }) => {

    const { space_id:space } = booking;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
    
        // Get month
        const options = { month: 'short' };
        const month = date.toLocaleString('en-US', options, { timeZone: 'UTC' });
    
        // Get day
        const day = date.getUTCDate();
    
        // Format time in UTC 12-hour
        const timeOptions = {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
          timeZone: 'UTC',
        };
    
        const time = date.toLocaleString('en-US', timeOptions);
    
        // Formatted string
        return `${month} ${day} at ${time}`;
      };


    return (

    <div className='bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center'>
      <div>
        <h4 className='text-lg font-semibold'>{space.name}</h4>
        <p className='text-sm text-gray-600'>
          <strong>Check In:</strong> {formatDate(booking.check_in)}
        </p>
        <p className='text-sm text-gray-600'>
          <strong>Check Out:</strong> {formatDate(booking.check_out)}
        </p>
      </div>
      <div className='flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0'>
        <Link
          href={`/spaces/${space.$id}`}
          className='bg-red-950 text-white px-8 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-gray-400 hover:font-bold hover:text-black'
        >
          View Space
        </Link>
        <CancelBookingButton bookingId={booking.$id} />
      </div>
    </div>
  );
}
 
export default BookedSpaceCard;