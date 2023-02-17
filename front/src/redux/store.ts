import { configureStore } from "@reduxjs/toolkit";

import listsSlice from "@redux/slices/lists.slice";

const store = configureStore({
  reducer:{
    lists:listsSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
