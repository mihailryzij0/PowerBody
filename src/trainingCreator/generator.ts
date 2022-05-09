import { Post, Workout } from "../store/slices/types";
import { Exercises } from "./trainingCreator";

export function generator(...exercisesGroups: Array<Exercises>) {
  let workout: Required<Post> = {
    id: "1",
    image: "",
    authorId: "",
    author: "PowerBody",
    description: "",
    title: "Индивидуальная тренировка",
    typeWorkout: "Стандарт",
    weeks: 0,
    workouts: [
      {
        workoutName: "",
        exercises: [],
      },
    ],
    video: "",
    comments: [],
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
