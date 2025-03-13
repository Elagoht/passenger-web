type ToastErrorHandlers = Record<number, () => void>;

type HttpError = {
  status: number;
  data: SingleError | MultipleError;
};

type SingleError = {
  message: string;
};

type MultipleError = {
  message: string[];
};
