import { WorkoutForm } from "../../components/FormCreateWorkout/FormCreateWorkout";

export interface Workout {
  workoutName: string;
  exercises: Array<string>;
}

export type comment = {
  commentText: string;
  authorCommentId: string;
  authorCommentName: string;
};

export interface Post {
  authorId: string | null;
  author: string;
  image: string;
  video: string;
  description: string;
  title: string;
  id: string;
  typeWorkout: string;
  workouts?: Array<Workout>;
  comments: Array<comment>;
}

export type Card = Omit<Post, "workouts">;

export interface CreatePostProps {
  postData: Required<WorkoutForm>;
  postKey: "vitamins" | "workouts";
}
