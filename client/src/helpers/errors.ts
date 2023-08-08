import { errorToast } from '../utils/toast/errorToast';

interface ReduxErrorHandlerProps {
  error: any;
  rejectWithValue: (value: any) => any;
}

export const reduxErrorHandler = ({
  error,
  rejectWithValue,
}: ReduxErrorHandlerProps) => {
  errorToast(error);
  if (error.response && error.response.data.message) {
    return rejectWithValue(error.response.data.message);
  } else {
    return rejectWithValue(error.message);
  }
};
