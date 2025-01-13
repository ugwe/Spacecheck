import Heading from "@/components/Heading";
import BookedSpaceCard from "@/components/BookedSpaceCard";
import getMyBookings from "../actions/getMyBookings";


const BookingsPage = async () => {

    const bookings = await getMyBookings();


    return (
        <>
          <Heading title='My Reservations' />
          {bookings.length === 0 ? (
            <p className='text-gray-600 mt-4'>You have no reservations</p>
          ) : (
            bookings.map((booking) => (
              <BookedSpaceCard key={booking.$id} booking={booking} />
            ))
          )}
        </>
    );
};
 
export default BookingsPage;