import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const errorToast = (error: any) => {
  if (!error) return;

  let errorToShow;
  const status = error?.status || error.response.status;

  if (typeof error === 'string') {
    errorToShow = error;
  } else {
    errorToShow =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      `Error status code: ${status}` ||
      'Something went wrong';
  }

  return toast.error(errorToShow, { toastId: errorToShow });
};
