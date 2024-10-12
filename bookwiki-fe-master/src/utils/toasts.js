import {toast} from 'react-toastify'
 
const successToast = (message) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    theme: "dark",
  });
 
const errorToast = (message) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "colored",
  });
 
  const defaultToast = (message) =>
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "light",
  });
 
export { successToast, errorToast, defaultToast};