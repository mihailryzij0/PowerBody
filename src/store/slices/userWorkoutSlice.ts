import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebaseAPI";
import { Post } from "./cardsSlice";



interface   userWorkout  {
  token:string
  workout:Post
   
}

const initialState={

}


export const setUserWorkout= createAsyncThunk(
  'userWorkout/setUserWorkout',
  async({workout, token}:userWorkout, {rejectWithValue, dispatch})=>{
       await setDoc(doc(db, 'userWorkout', `${token}`),workout)
  }
)

 const userWorkoutSlice = createSlice({
   name: 'userWorkout',
   initialState,
   reducers:{
      
   },
   extraReducers:{
    // [setUserWorkout.fulfilled]: (state, action) => {
    //   state.status = 'fulfilled'
    //   state.postData = action.payload
    // },
    // [setUserWorkout.pending]: (state) =>  {
    //   state.status = 'pending'
    // },
    // [setUserWorkout.rejected]: (state, action) => {
    //   state.status = 'pending'
    //   state.error = action.payload
    // },
   },
 });

 export const{}=
 userWorkoutSlice.actions;


export default userWorkoutSlice.reducer;