import Heading from '@/components/Heading';
import MySpaceCard from '@/components/MySpaceCard';
import getMySpaces from '@/app/actions/getMySpaces';

const MySpacesPage = async () => {
  const spaces = await getMySpaces();

  return (
    <>
      <Heading title='My Spaces' />
      {spaces.length > 0 ? (
        spaces.map((space) => <MySpaceCard key={space.$id} space={space} />)
      ) : (
        <p>You have no spaces yet</p>
      )}
    </>
  );
};

export default MySpacesPage;
