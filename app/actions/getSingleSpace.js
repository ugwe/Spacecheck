'use server';

import { createAdminClient } from '@/config/appwrite';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function getSingleSpace(id) {
    try {
        const { databases } = await createAdminClient();

      //to fetch space 
      const space = await databases.getDocument(
            'spacecheck',
            'spaces',
            id
      );

      //revalidate cache for path 
      //revalidatePath('/', 'layout');

      return space;
      
    } catch (error) {
        console.log('Failed to get space', error);
        redirect('/error');
    }
}

export default getSingleSpace;