import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import contactsReducer from '../slices/contactSlices';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
