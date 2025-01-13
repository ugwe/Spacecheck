'use server';
import { createAdminClient } from '@/config/appwrite';
import checkAuth from './checkAuth';
import { ID } from 'node-appwrite';
import { revalidatePath } from 'next/cache';

async function createSpace(previousState, formData) {
  // Get databases instance
  const { databases, storage } = await createAdminClient();

  try {
    const { user } = await checkAuth();

    if (!user) {
      return {
        error: 'You must be logged in to add a space',
      };
    }

    // Uploading image
    let imageID;

    const image = formData.get('image');

    if (image && image.size > 0 && image.name !== 'undefined') {
      try {
        // Upload
        const response = await storage.createFile('spaces', ID.unique(), image);
        imageID = response.$id;
      } catch (error) {
        console.log('Error uploading image', error);
        return {
          error: 'Error uploading image',
        };
      }
    } else {
      console.log('No image file provided or file is invalid');
    }

    // Create space
    const newSpace = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_SPACES,
      ID.unique(),
      {
        user_id: user.id,
        name: formData.get('name'),
        description: formData.get('description'),
        capacity: formData.get('capacity'),
        location: formData.get('location'),
        amenities: formData.get('amenities'),
        times_available: formData.get('times_available'),
        image: imageID,
      }
    );
    revalidatePath('/', 'layout');

    return {
      success: true,
    };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response.message || 'An unexpected error has occured';
    return {
      error: errorMessage,
    };
  }
}

export default createSpace;