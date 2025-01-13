'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';   
import { redirect } from "next/navigation";

async function getMySpaces() {

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
    
      return spaces;

    } catch (error) {
        console.log('Failed to get user spaces', error);
        redirect('/error');
    }
}

export default getMySpaces;