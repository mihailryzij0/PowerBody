import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import workoutListReducer from './slices/workoutListSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        workouts: workoutListReducer
    }
});

export type AppDispatch =typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;