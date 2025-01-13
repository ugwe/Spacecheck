'use server';
import { createAdminClient } from "@/config/appwrite";
import { cookies } from 'next/headers';


async function createSession(previousState, formData) {

    const email = formData.get('email');
    const password = formData.get('password');


    if (!email || !password) {
        return {
            error: 'Please fill in all fields',
        };
    }

    //Get instance of an account

    const { account } = await createAdminClient();

    try {
        //session generation
        const session = await account.createEmailPasswordSession(email, password);

        //create cookie 
        await cookies().set('appwrite-session', session.secret, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            expires: new Date(session.expire),
            path: '/',
        });

        return {
            success: true,
        };

    } catch (error) {
       console.log('Authentication Error: ', error);

         return {
              error: 'Invalid credentials'
            };

    }
   //console.log(email,password);
}

export default createSession;