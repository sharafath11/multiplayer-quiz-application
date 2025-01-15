import { toast } from 'react-toastify';

export const showToast = (type, message) => {
  const commonStyle = {
    color: '#fff',
  };

  switch (type) {
    case 'ok':
      toast.success(message, {
        style: {
          ...commonStyle,
          backgroundColor: '#4caf50',
        },
      });
      break;
    case 'err':
      toast.error(message, {
        style: {
          ...commonStyle,
          backgroundColor: '#FFB6C1',
        },
      });
      break;
    case 'info':
      toast.info(message, {
        style: {
          ...commonStyle,
          backgroundColor: '#2196f3',
        },
      });
      break;
    case 'warning':
      toast.warning(message, {
        style: {
          ...commonStyle,
          backgroundColor: '#ff9800',
        },
      });
      break;
    default:
      toast(message, {
        style: {
          ...commonStyle,
          backgroundColor: '#607d8b',
        },
      });
  }
};
