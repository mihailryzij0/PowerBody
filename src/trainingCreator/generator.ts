import { Post, Workout } from "../store/slices/types";
import { Exercises } from "./trainingCreator";

export function generator(...exercisesGroups: Array<Exercises>) {
  let workout: Required<Post> = {
    id: new Date().valueOf(),
    image: "",
    authorId: "",
    author: "PowerBody",
    description: "",
    rating: "4",
    title: "Индивидульная тренировка",
    typeWorkout: "Стандарт",
    workouts: [
      {
        workoutName: "",
        exercises: [],
      },
    ],
    vidio: "",
  };
  let workouts: Array<Workout> = [];
  for (let i = 1; i <= 6; i++) {
    exercisesGroups.forEach((group) => {
      let newWorkout: Workout = {
        workoutName: group.workoutName,
        exercises: [],
      };
      let newGroup: Exercises["exercises"] = JSON.parse(
        JSON.stringify(group.exercises)
      );
      for (let j = 0; j < newGroup.length; j++) {
        let rand = Math.floor(Math.random() * newGroup[j].length);
        newWorkout.exercises.push(newGroup[j][rand]);
        newGroup[j].slice(rand, 1);
      }

      workouts.push(newWorkout);
    });
  }
  workout.workouts = workouts;
  return workout;
}
