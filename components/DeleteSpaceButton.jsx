'use client';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import deleteSpace from '@/app/actions/deleteSpace';

const DeleteSpaceButton = ({spaceId}) => {
    
    const handleDelete = async () => {
        const confirmed = window.confirm("Are you sure you want to delete?");

        if (confirmed) {

            try {
                const response = await deleteSpace(spaceId);
                toast.success('Space deleted');

            } catch (error) {
                console.log("Failed to delete space", error);
                toast.error("Failed to delete space");

            }
        }
    };
    
    
    return ( 
         <button onClick={ handleDelete } className='bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700 hover:font-bold'>
          <FaTrash className='inline mr-1' /> Delete
        </button>
    );
};
 
export default DeleteSpaceButton;