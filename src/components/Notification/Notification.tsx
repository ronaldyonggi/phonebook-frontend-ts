import './Notification.css';

interface NotificationProps {
  message: string;
  isError: boolean;
}

const Notification = ({message, isError} : NotificationProps) => {
  if (!message) return null;

  return (
    <div className={isError ? 'error' : 'success'}>
      {message}
    </div>
  )
}
export default Notification