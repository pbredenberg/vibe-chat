import { useParams } from 'react-router-dom';
import { PublicProfile } from '../pages/PublicProfile';


export const PublicProfileWrapper = () => {
  const { id } = useParams();

  if (!id) {
    return <div>User ID not found</div>;
  }

  // Check if id is a valid UUID
  if (!id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
    return <div>Invalid user ID format</div>;
  }

  return <PublicProfile userId={id} />;
};
