import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getColectionFirebase } from '../../firebaseAPI';

interface Workout{
  workoutName:string;
  exercises:Array<string>
}
interface Post {
  description: string;
  rating:string;
  title:string;
  id:string
  workouts:Array<Workout>
}

interface State{
  postCard:{
    vitamins: Array<Omit<Post, 'workouts'>>
    workouts: Array<Omit<Post, 'workouts'>>
  },
  postData: Post
}

const initialState:State =  {
  postCard:{
    vitamins:[],
    workouts:[]
  },
  postData:{
    description: '',
    rating:'',
    title:'',
    id:'',
    workouts:[]
  }
}

export const getPostCards:any = createAsyncThunk(
  'worcoutList/getPostCards',
 async (_,{rejectWithValue, dispatch}) => {
   const result = await getColectionFirebase('postCards', 'cards')
    dispatch(setWorkoutPostsCard(result))
 }
)

export const getPostData:any = createAsyncThunk(
  'worcoutList/getPostData',
 async (postId,{rejectWithValue, dispatch}) => {
   const result = await getColectionFirebase('posts', `${postId}`)
    dispatch(setWorkoutPostData(result))
 }
)

const workoutListSlice = createSlice({
    name: 'worcoutList',
    initialState,
    reducers: {
        // setWorkout(state, action) {
        //   state.workouts.push(action.payload)
        // },
        setWorkoutPostsCard(state, action){
          state.postCard.vitamins = action.payload.vitamins
          state.postCard.workouts = action.payload.workouts
        },
        setWorkoutPostData(state, action){
          state.postData = action.payload
        }
        // removeWorkout(state, action) {
        //   state.workouts.filter(()=> )
        // },
    },
    extraReducers :{
      [getPostCards.fulfilled] :()=> console.log('fulfilled'),
      [getPostCards.pending]:()=> console.log('pending'),
      [getPostCards.rejected]:()=> console.log('rejected'),

      [getPostData.fulfilled] :()=> console.log('fulfilled'),
      [getPostData.pending]:()=> console.log('pending'),
      [getPostData.rejected]:()=> console.log('rejected'),
    },
});

export const { setWorkoutPostData, setWorkoutPostsCard } = workoutListSlice.actions;

export default workoutListSlice.reducer;