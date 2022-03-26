import { exercises } from "./exercisStorage";
import { ExercisesGroups } from "./trainingCreator";

export const creatorGroup = (): ExercisesGroups => {
  return {
    backAndBiceps: {
      workoutName: "Спина / Бицепс",
      exercises: [
        ...exercises.back,
        ...exercises.biceps,
        ...exercises.additiona,
      ],
    },
    legsAndShoulder: {
      workoutName: "Ноги / Плечи",
      exercises: [
        ...exercises.legs,
        ...exercises.shoulder,
        ...exercises.additiona,
      ],
    },
    pectoralAndTriceps: {
      workoutName: "Грудь / Трицепс",
      exercises: [
        ...exercises.pectoral,
        ...exercises.triceps,
        ...exercises.additiona,
      ],
    },
    pectoral: {
      workoutName: "Грудь",
      exercises: [
        ...exercises.pectoral,
        ...exercises.additiona,
        ...exercises.additiona,
      ],
    },
    legs: {
      workoutName: "Ноги",
      exercises: [
        ...exercises.legs,
        ...exercises.additiona,
        ...exercises.additiona,
      ],
    },
    back: {
      workoutName: "Спина",
      exercises: [
        ...exercises.back,
        ...exercises.additiona,
        ...exercises.additiona,
      ],
    },
  };
};
