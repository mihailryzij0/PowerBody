import { WorkoutForm } from "../../components/FormCreateWorkout/FormCreateWorkout";

export interface Workout {
  workoutName: string;
  exercises: Array<string>;
}

type comment = {
  commentText: string;
  authorCommentId: string;
  authorCommentName: string;
};

export interface Post {
  authorId: string | null;
  author: string;
  image: string;
  vidio: string;
  description: string;
  rating: string;
  title: string;
  id: number;
  typeWorkout: string;
  workouts?: Array<Workout>;
  comments: Array<comment>;
}

export type Card = Omit<Post, "workouts">;

export interface CreatePostProps {
  postData: Required<WorkoutForm>;
  postKey: "vitamins" | "workouts";
}
