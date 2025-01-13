'use server';
import { createSessionClient } from "@/config/appwrite";
import { cookies } from 'next/headers';


async function destroySession() {
    //Retrieve session cookie 

    //added await in the line below
    const sessionCookie = await cookies().get('appwrite-session');

    if (!sessionCookie) {

        return {
            error: 'No session cookie found',
        };
     }

    try {

        // const user = await account.get(); // Assuming `account.get()` fetches the current user
        // if (!user || !user.$id) {
        //     return {
        //         error: 'User not authenticated',
        //     };
        // }


        const { account } = await createSessionClient(sessionCookie.value);

        //Delete session
        await account.deleteSession('current');

        //clear session cookie
        cookies().delete('appwrite-session');

        return {
            success: true,
        };

    } catch (error) {
        console.error('Logout Error: ', error);

         return {
              error: 'Error deleting session',
        };
    }
}

export default destroySession;