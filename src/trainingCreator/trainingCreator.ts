import { SelectGroupState } from "../pages/GeneratorWorkout";
import { exercises } from "./exercisesStorage";
import { creatorGroup } from "./creatorGroup";
import { generator } from "./generator";

export interface Exercises {
  workoutName: string;
  exercises: Array<string[]>;
}
export type ExercisesGroups = Record<string, Exercises>;
export function trainingCreator(parameters: SelectGroupState) {
  function addIntensity(basicIntensity: number, secondaryIntensity: number) {
    let basicIntensityGroup: number;
    let secondaryIntensityGroup: number;
    let secondaryRepetitionGroup: number;
    let basicRepetitionGroup: number;
    let newExercises: Record<string, Array<string[]>> = JSON.parse(
      JSON.stringify(exercises)
    );
    for (let key in newExercises) {
      newExercises[key] = newExercises[key].map((group, index) => {
        return group.map((groupItem) => {
          if (key === "back" || key === "legs" || key === "pectoral") {
            basicIntensityGroup = basicIntensity;
            secondaryIntensityGroup = secondaryIntensity;
            if (basicIntensity > 8) {
              basicRepetitionGroup = 4;
              secondaryRepetitionGroup = 5;
            } else if (basicIntensity <= 8 && basicIntensity >= 6) {
              basicRepetitionGroup = 5;
              secondaryRepetitionGroup = 4;
            } else {
              basicRepetitionGroup = 6;
              secondaryRepetitionGroup = 4;
            }
          } else if (
            key === "biceps" ||
            key === "triceps" ||
            key === "shoulder"
          ) {
            basicIntensityGroup = basicIntensity + 1;
            secondaryIntensityGroup = secondaryIntensity + 2;
            if (basicIntensity > 8) {
              basicRepetitionGroup = 3;
              secondaryRepetitionGroup = 5;
            } else if (basicIntensity <= 8 && basicIntensity >= 6) {
              basicRepetitionGroup = 4;
              secondaryRepetitionGroup = 3;
            } else {
              basicRepetitionGroup = 4;
              secondaryRepetitionGroup = 2;
            }
          } else if (key === "additional") {
            basicIntensityGroup = secondaryIntensity + 6;
            basicRepetitionGroup = 2;
          }

          if (index === 0) {
            return `${groupItem} ${basicRepetitionGroup}/${basicIntensityGroup}`;
          } else {
            return `${groupItem} ${secondaryRepetitionGroup}/${secondaryIntensityGroup}`;
          }
        });
      });
    }
    let group = creatorGroup(newExercises);
    switch (parameters.muscleGroup) {
      case "Ноги":
        return generator(
          group.backAndBiceps,
          group.pectoralAndTriceps,
          group.legs
        );
      case "Спина":
        return generator(
          group.back,
          group.pectoralAndTriceps,
          group.legsAndShoulder
        );
      case "Грудь":
        return generator(
          group.backAndBiceps,
          group.pectoral,
          group.legsAndShoulder
        );
      case "Стандарт":
        return generator(
          group.backAndBiceps,
          group.pectoralAndTriceps,
          group.legsAndShoulder
        );
    }
  }

  switch (parameters.purpose) {
    case "Набрать массу":
      switch (parameters.muscleGroup) {
        case "Ноги":
          return parameters.level === "Начинающий"
            ? addIntensity(8, 10)
            : addIntensity(6, 8);
        case "Спина":
          return parameters.level === "Начинающий"
            ? addIntensity(10, 12)
            : addIntensity(8, 9);
        case "Грудь":
          return parameters.level === "Начинающий"
            ? addIntensity(7, 10)
            : addIntensity(6, 10);
      }
      break;
    case "Повысить силовые":
      switch (parameters.muscleGroup) {
        case "Ноги":
          return parameters.level === "Начинающий"
            ? addIntensity(10, 12)
            : addIntensity(5, 7);
        case "Спина":
          return parameters.level === "Начинающий"
            ? addIntensity(8, 10)
            : addIntensity(6, 10);
        case "Грудь":
          return parameters.level === "Начинающий"
            ? addIntensity(8, 12)
            : addIntensity(4, 6);
      }
      break;
    case "Повысить выносливость":
      switch (parameters.muscleGroup) {
        case "Ноги":
          return parameters.level === "Начинающий"
            ? addIntensity(12, 15)
            : addIntensity(15, 20);
        case "Спина":
          return parameters.level === "Начинающий"
            ? addIntensity(12, 15)
            : addIntensity(12, 20);
        case "Грудь":
          return parameters.level === "Начинающий"
            ? addIntensity(10, 15)
            : addIntensity(15, 20);
      }
      break;
  }
}
