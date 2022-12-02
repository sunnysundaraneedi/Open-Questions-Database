import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
