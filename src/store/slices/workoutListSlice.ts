import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getColectionFirebase } from '../../firebaseAPI';

// interface worcautItem {
//   workoutName: string,
//   exercises: Array<string>
// }
// type worcout = Array<worcautItem>

//  export type state = [
//     {
//        technique:string
//       workout: worcout
//       rating: number
//     }
//   ]


const initialState =  {
  workouts:[]
}

export const getPost:any = createAsyncThunk(
  'worcoutList/getPost',
 async (_,{rejectWithValue, dispatch}) => {
   const result = await getColectionFirebase()
    dispatch(setWorkouts(result))
   console.log(result)
 }
)

const workoutListSlice = createSlice({
    name: 'worcoutList',
    initialState,
    reducers: {
        // setWorkout(state, action) {
        //   state.workouts.push(action.payload)
        // },
        setWorkouts(state, action){
          state.workouts = action.payload.workouts
        }
        // removeWorkout(state, action) {
        //   state.workouts.filter(()=> )
        // },
    },
    extraReducers :{
      [getPost.fulfilled] :()=> console.log('fulfilled'),
      [getPost.pending]:()=> console.log('pending'),
      [getPost.rejected]:()=> console.log('rejected'),
    }
});

export const { setWorkouts} = workoutListSlice.actions;

export default workoutListSlice.reducer;