'use server';

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function getAllSpaces() {
    try {
        const { databases } = await createAdminClient();

      //to fetch spaces 
      const { documents: spaces } = await databases.listDocuments(
            'spacecheck',
            'spaces'
      );

      //revalidate cache for path 
      //revalidatePath('/', 'layout');
    
      return spaces;

    } catch (error) {
        console.log('Failed to get spaces', error);
        redirect('/error');
    }
}

export default getAllSpaces;