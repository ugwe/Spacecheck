import Link from 'next/link';
import { FaEye } from 'react-icons/fa';
import DeleteSpaceButton from './DeleteSpaceButton';

const MySpaceCard = ({ space }) => {
  return (
    <div className='bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-center'>
      <div className='flex flex-col'>
        <h4 className='text-lg font-semibold'>{space.name}</h4>
      </div>
      <div className='flex flex-col sm:flex-row w-full sm:w-auto sm:space-x-2 mt-2 sm:mt-0'>
        <Link
          href={`/spaces/${space.$id}`}
          className='bg-red-950 text-white px-6 py-2 rounded mb-2 sm:mb-0 w-full sm:w-auto text-center hover:bg-gray-400 hover:font-bold hover:text-black'>
          <FaEye className='inline mr-1' /> View
        </Link>

        <DeleteSpaceButton spaceId={space.$id}/>

      </div>
    </div>
  );
};

export default MySpaceCard;