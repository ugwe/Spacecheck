'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';   
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function deleteSpace(spaceId) {

    const sessionCookie = cookies().get('appwrite-session');

    if(!sessionCookie) {
        redirect('/login');
    }

    try {
        const { account, databases } = await createSessionClient(sessionCookie.value);

        //get user id 
        const user = await account.get();
        const userId = user.$id;

        //to fetch users spaces 
        const { documents: spaces } = await databases.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SPACES,
                [Query.equal('user_id', userId)]
      );
      
      //space to delete

      const spaceToDelete = spaces.find(space => space.$id === spaceId);

      //delete space

      if (spaceToDelete) {
          await databases.deleteDocument(
              process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
              process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SPACES,
              spaceToDelete.$id
          );


          //reval my space and all spaces
        revalidatePath('/spaces/my', 'layout');
        revalidatePath('/', 'layout');
        
        return {
            success:true
        };
      } else {
        return {
            error: 'Space not found'
                };
            }
    } catch (error) {
        console.log('Failed to delete space', error);
        

        return {
            error: 'Failed to delete space'
        };
    }
}

export default deleteSpace;