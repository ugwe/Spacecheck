import Heading from '@/components/Heading';
import BookingForm from '@/components/BookingForm';
import Image from  'next/image';
import Link from 'next/link';
import {FaChevronCircleLeft} from 'react-icons/fa';
import getSingleSpace from '@/app/actions/getSingleSpace';

const SpacePage = async ({ params }) => {
    const { id } = params;
    const space = await getSingleSpace(id);

    if (!space) {
        return <Heading title = 'Space not found'/>
    }

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_SPACES;

    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${space.image}/view?project=${projectId}`;

    const imageSrc = space.image ? imageUrl : '/images/no_image.jpeg';


    return (
        <>
            <Heading title = {space.name}/>
            <div className="bg-white shadow rounded-lg p-6">
        <Link
          href="/"
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <FaChevronCircleLeft className='inline mr-1'/>
          <span className="ml-2">Back to Spaces</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:space-x-6">
          <Image
            src={imageSrc}
            alt={space.name}
            width={400}
            height={100}
            className="w-full sm:w-1/3 h-64 object-cover rounded-lg"
          />

          <div className="mt-0 sm:mt-10 sm:flex-1">
            <p className="text-gray-600 mb-4 font-bold">
              {space.description}
            </p>

            <ul className="space-y-2">
              <li>
                <span className="font-semibold text-gray-800">Location:</span> {space.location}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Availability: </span>
                {space.times_available}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Capacity: </span>
                {space.capacity}
              </li>
              <li>
                <span className="font-semibold text-gray-800">Amenities: </span> 
                {space.amenities}
              </li>
            </ul>
          </div>
        </div>

        <BookingForm space={space}/>
        
      </div>
    </>
    );
};
 
export default SpacePage;