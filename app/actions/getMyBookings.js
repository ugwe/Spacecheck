'use server';

import { createSessionClient } from "@/config/appwrite";
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';   
import { redirect } from "next/navigation";
import checkAuth from "./checkAuth";

async function getMyBookings() {

    const sessionCookie = cookies().get('appwrite-session');

    if(!sessionCookie) {
        redirect('/login');
    }

    try {
        const { databases } = await createSessionClient(sessionCookie.value);

        //get user id 
        const { user } = await checkAuth();

        if (!user) {
            return {
                error: "You must be logged in to view reservations"
            }
        }

        //to fetch users spaces 
        const { documents: bookings } = await databases.listDocuments(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
                process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_BOOKINGS,
                [Query.equal('user_id', user.id)]
      );
    
      return bookings;

    } catch (error) {
        console.log('Failed to get user reservations', error);
        
        return {
            error: "Failed to get bookings",
        };
    }
}

export default getMyBookings;