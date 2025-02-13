import { configureStore } from '@reduxjs/toolkit';
import { pageSlice } from './pageReducer';
import { dataSlice } from './dataReducer';

export const store = configureStore({
    reducer: {
        page: pageSlice.reducer,
        data: dataSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
