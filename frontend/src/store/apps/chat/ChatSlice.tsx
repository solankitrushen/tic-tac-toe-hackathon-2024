import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Chat {
  userId: string;
  
}

interface StateType {

  user: Record<string, any>;

}

const initialState: StateType = {

  user: {},

};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
  
    user: (state, action: PayloadAction<Record<string, any>>) => {
      console.log('user', action.payload);
      state.user = action.payload;
    },
    },
  },
);

export const {  user } =
  chatSlice.actions;

export default chatSlice.reducer;
