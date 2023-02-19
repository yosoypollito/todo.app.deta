import { configureStore } from "@reduxjs/toolkit";

import folderSlice from "@redux/slices/folder.slice";

const store = configureStore({
  reducer:{
    folder:folderSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
