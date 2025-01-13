import SpaceCard from '@/components/SpaceCard';
import Heading from '@/components/Heading';
import getAllSpaces from './actions/getAllSpaces';

export default async function Home() {

  const spaces = await getAllSpaces();

  return (
    <>
      <Heading title='Available Spaces' />
      {spaces.length > 0 ? ( 
        spaces.map((space) => <SpaceCard space={space} key={space.$id} />)
      ) : (
          <p>No spaces available at this time. Willing to try outdoors?</p>
        )}
    </>
  );
}
