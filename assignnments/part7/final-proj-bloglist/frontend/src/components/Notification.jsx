import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return <div>{notification && <Alert> {notification} </Alert>}</div>;
};

export default Notification;
