import toast from "react-hot-toast";
import useAuthStore from "../../stores/auth";

function toastError(
  error: HttpError,
  dict: Dict,
  handlers?: ToastErrorHandlers,
) {
  if (!error.data) {
    toast.error(dict.errors.unexpected);
    return;
  }

  const { logout } = useAuthStore.getState();

  const defaultHandlers: ToastErrorHandlers = {
    400: () => toast.error(dict.errors.unexpected),
    401: () => {
      toast.error(dict.errors.invalidCredentials);
      logout();
    },
  };

  if (handlers?.[error.status]) {
    return handlers[error.status]();
  }

  if (defaultHandlers[error.status]) {
    return defaultHandlers[error.status]();
  }

  if (Array.isArray(error.data.message)) {
    toast.error(error.data.message?.[0] ?? dict.errors.unexpected);
  } else {
    toast.error(error.data.message ?? dict.errors.unexpected);
  }
}

export default toastError;
