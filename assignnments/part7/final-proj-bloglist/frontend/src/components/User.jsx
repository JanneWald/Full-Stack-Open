import { useParams } from 'react-router-dom';

const User = () => {
  const { id } = useParams();
  console.log('param id', id);
  return (
    <>
      <p>User</p>
    </>
  );
};

export default User;
