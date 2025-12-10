import { toast } from "sonner";

const toastStyle = {
  backgroundColor: '#ef4444',
  color: '#ffffff',
  border: 'none'
};

export const toastError = (message: string) => {
  toast.error(message, { style: toastStyle });
};

export const toastSuccess = (message: string) => {
  toast.success(message, { style: { ...toastStyle, backgroundColor: '#22c55e' } });
};

export const toastWarning = (message: string) => {
  toast.warning(message, { style: { ...toastStyle, backgroundColor: '#f59e0b' } });
};

export const toastInfo = (message: string) => {
  toast.info(message, { style: { ...toastStyle, backgroundColor: '#3b82f6' } });
};
