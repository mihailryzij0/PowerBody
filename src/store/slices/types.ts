import { WorkoutForm } from "../../components/FormCreateWorkout/FormCreateWorkout";

export interface Workout {
  workoutName: string;
  exercises: Array<string>;
}

export interface Post {
  authorId: string | null;
  author: string;
  image: string;
  description: string;
  rating: string;
  title: string;
  id: number;
  workouts?: Array<Workout>;
}

export type Card = Omit<Post, "workouts">;

export interface CreatePostProps {
  postData: Required<WorkoutForm>;
  postKey: "vitamins" | "workouts";
}
