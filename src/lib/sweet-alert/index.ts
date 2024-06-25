import Swal, { SweetAlertIcon } from 'sweetalert2';

export const showMessageSuccess = (message: string) => {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    timer: 3000,
    showConfirmButton: false
  });
};

export const showMessageError = (message: string) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    timer: 3000,
    showConfirmButton: false
  });
};

export const showMessageWarning = (message: string) => {
  Swal.fire({
    icon: 'warning',
    title: 'Warning',
    text: message,
    timer: 3000,
    showConfirmButton: false
  });
};

export const showMessageInfo = (message: string) => {
  Swal.fire({
    icon: 'info',
    title: 'Info',
    text: message,
    timer: 3000,
    showConfirmButton: false
  });
};

export const showLoading = (message: string) => {
  Swal.fire({
    title: 'Loading',
    text: message,
    didOpen: () => {
      Swal.showLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: false
  });
};

export const updateLoading = (message: string, icon: SweetAlertIcon = 'success') => {
    Swal.fire({
      icon: icon,
      title: 'Finished',
      text: message,
      timer: 3000,
      showConfirmButton: false
    });
  };
