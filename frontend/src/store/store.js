import { configureStore } from '@reduxjs/toolkit';

import CustomizerReducer from './customizer/CustomizerSlice';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
  
  },
  devTools: process.env.NODE_ENV !== 'production',
});
