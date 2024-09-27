import React from 'react';
import toastMessage, { Toaster } from 'react-hot-toast';
import { useTheme } from '@mui/material/styles';

function CustomToast(toast) {
  if (toast.status === 'success') {
    toastMessage.success(toast.message);
  } else {
    toastMessage.error(toast.message);
  }
}

export function CustomToaster() {
  const theme = useTheme();

  return (
    <>
      <Toaster
        toastOptions={{
          className: ' ',
          style: {
            padding: '10px',
            color: theme.palette.mode === 'dark' ? 'white' : 'black', // Adjust text color based on theme mode
            backgroundColor: theme.palette.mode === 'dark' ? '#171C23' : '#FFFFFF', // Adjust background color based on theme mode
            border: theme.palette.mode === 'dark' ? '1px solid #455670' : '1px solid #CCCCCC', // Adjust border color based on theme mode
          },
        }}
      />
    </>
  );
}

export default CustomToast;
