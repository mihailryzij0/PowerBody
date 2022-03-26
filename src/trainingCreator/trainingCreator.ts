import { SelectGroupState } from "../pages/IndividualWorkout";
import { exercises } from "./exercisStorage";
import { Post } from "../store/slices/cardsSlice";
import { creatorGroup } from "./creatorGroup";

interface Exercises {
  workoutName: string;
  exercises: Array<string[]>;
}
interface Workout {
  workoutName: string;
  exercises: string[];
}
export type ExercisesGroups = Record<string, Exercises>;
export function trainingCreator(parameters: SelectGroupState) {
  let group: ExercisesGroups = creatorGroup();

  function addIntensity(basicIntensity: number, secondaryIntensity: number) {
    let basicIntensityGroup: number;
    let secondaryIntensityGroup: number;
    let secondaryRepetitionGroup: number;
    let basicRepetitionGroup: number;
    for (let key in exercises) {
      exercises[key] = exercises[key].map((group, index) => {
        switch (key) {
          case "back" || "legs" || "pectoral":
            basicIntensityGroup = basicIntensity;
            secondaryIntensityGroup = secondaryIntensity;
            if (basicIntensity > 8) {
              basicRepetitionGroup = 5;
              secondaryRepetitionGroup = 6;
            } else if (basicIntensity < 8 && basicIntensity > 6) {
              basicRepetitionGroup = 6;
              secondaryRepetitionGroup = 5;
            } else {
              basicRepetitionGroup = 7;
              secondaryRepetitionGroup = 4;
            }
            break;
          case "biceps" || "triceps" || "shoulder":
            basicIntensityGroup = basicIntensity + 2;
            secondaryIntensityGroup = secondaryIntensity + 4;
            if (basicIntensity > 8) {
              basicRepetitionGroup = 4;
              secondaryRepetitionGroup = 5;
            } else if (basicIntensity < 8 && basicIntensity > 6) {
              basicRepetitionGroup = 4;
              secondaryRepetitionGroup = 3;
            } else {
              basicRepetitionGroup = 4;
              secondaryRepetitionGroup = 2;
            }
            break;
          case "additiona":
            secondaryIntensityGroup = secondaryIntensity + 6;
            if (basicIntensity > 8) {
              secondaryRepetitionGroup = 3;
            } else if (basicIntensity < 8 && basicIntensity > 6) {
              secondaryRepetitionGroup = 3;
            } else {
              secondaryRepetitionGroup = 2;
            }
            break;
        }
        return group.map((groupItem, i) => {
          if (index === 0) {
            return `${groupItem} ${basicRepetitionGroup} / ${basicIntensityGroup}`;
          } else {
            return `${groupItem} ${secondaryRepetitionGroup} / ${secondaryIntensityGroup}`;
          }
        });
      });
    }
    group = creatorGroup();
  }

  let workout: Post = {
    id: new Date().toString(),
    description: "",
    rating: "4",
    title: "Индивидульная тренировка",
    workouts: [
      {
        workoutName: "",
        exercises: [],
      },
    ],
  };

  function generator(...exercisesGroups: Array<Exercises>) {
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

  switch (parameters.purpose) {
    case "Набрать массу":
      switch (parameters.muscleGroup) {
        case "Ноги":
          parameters.level === "Начинающий"
            ? addIntensity(8, 10)
            : addIntensity(6, 8);

          return generator(group.legs, group.backAndBiceps, group.pectoral);
        case "Спина":
          parameters.level === "Начинающий"
            ? addIntensity(10, 12)
            : console.log(exercises);
          addIntensity(7, 8);
          return generator(
            group.back,
            group.pectoralAndTriceps,
            group.legsAndShoulder
          );
        case "Грудь":
          parameters.level === "Начинающий"
            ? addIntensity(7, 10)
            : addIntensity(6, 10);
          return generator(group.back, group.pectoral, group.legsAndShoulder);
      }
      break;
    case "Повысить силовые":
      switch (parameters.muscleGroup) {
        case "Ноги":
          parameters.level === "Начинающий"
            ? addIntensity(10, 12)
            : addIntensity(5, 7);
          return generator(group.back, group.pectoral, group.legsAndShoulder);
        case "Спина":
          parameters.level === "Начинающий"
            ? addIntensity(8, 10)
            : addIntensity(6, 10);
          return generator(group.back, group.pectoral, group.legsAndShoulder);
        case "Грудь":
          parameters.level === "Начинающий"
            ? addIntensity(8, 12)
            : addIntensity(4, 6);
          return generator(group.back, group.pectoral, group.legsAndShoulder);
      }
      break;
    case "Повысить выносливость":
      switch (parameters.muscleGroup) {
        case "Ноги":
          parameters.level === "Начинающий"
            ? addIntensity(12, 15)
            : addIntensity(15, 20);
          return generator(group.back, group.pectoral, group.legsAndShoulder);
          break;
        case "Спина":
          parameters.level === "Начинающий"
            ? addIntensity(12, 15)
            : addIntensity(12, 20);
          return generator(group.back, group.pectoral, group.legsAndShoulder);
        case "Грудь":
          parameters.level === "Начинающий"
            ? addIntensity(10, 15)
            : addIntensity(15, 20);
          return generator(group.back, group.pectoral, group.legsAndShoulder);
      }
      break;
  }
}
