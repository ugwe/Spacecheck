'use client';
import { useEffect } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Heading from '@/components/Heading';
import createSpace from '@/app/actions/createSpace';

const AddSpacePage = () => {
  const [state, formAction] = useActionState(createSpace, {});

  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success('Space created successfully!');
      router.push('/');
    }
  }, [state]);

  return (
    <>
      <Heading title='Add a Space' />
      <div className='bg-white shadow-lg rounded-lg p-6 w-full'>
        <form action={formAction}>
          <div className='mb-4'>
            <label
              htmlFor='name'
              className='block text-gray-700 font-bold mb-2'
            >
              Space Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='border rounded w-full py-2 px-3'
              placeholder='Enter a name for the space'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block text-gray-700 font-bold mb-2'
            >
              Description
            </label>
            <textarea
              id='description'
              name='description'
              className='border rounded w-full h-24 py-2 px-3'
              placeholder='Enter a description for the space'
              required
            ></textarea>
          </div>

          <div className='mb-4'>
            <label
              htmlFor='capacity'
              className='block text-gray-700 font-bold mb-2'
            >
              Capacity
            </label>
            <input
              type='number'
              id='capacity'
              name='capacity'
              className='border rounded w-full py-2 px-3'
              placeholder='Number of people the space can hold'
              required
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='location'
              className='block text-gray-700 font-bold mb-2'
            >
              Location
            </label>
            <input
              type='text'
              id='location'
              name='location'
              className='border rounded w-full py-2 px-3'
              placeholder='Location (Building, Floor, Space)'
              required
            />
          </div>


          <div className='mb-4'>
            <label
              htmlFor='amenities'
              className='block text-gray-700 font-bold mb-2'
            >
              Amenities
            </label>
            <input
              type='text'
              id='amenities'
              name='amenities'
              className='border rounded w-full py-2 px-3'
              placeholder='Amenities CSV (projector, whiteboard, etc.)'
              required
            />
          </div>



          <div className='mb-4'>
            <label
              htmlFor='times_available'
              className='block text-gray-700 font-bold mb-2'
            >
              Availability
            </label>
            <input
              type='text'
              id='times_available'
              name='times_available'
              className='border rounded w-full py-2 px-3'
              placeholder='Availability (Monday - Friday, 9am - 5pm)'
              required
            />
          </div>

          {/* <!-- Image Upload --> */}
          <div className='mb-8'>
            <label
              htmlFor='image'
              className='block text-gray-700 font-bold mb-2'
            >
              Image
            </label>

            <input
              type='file'
              id='image'
              name='image'
              className='border rounded w-full py-2 px-3'
            />
          </div>

          <div className='flex flex-col gap-5'>
            <button
              type='submit'
              className='bg-red-950 text-white px-4 py-2 rounded hover:bg-gray-400 hover:text-black hover:font-bold'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSpacePage;