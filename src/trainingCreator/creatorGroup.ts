import { ExercisesGroups } from "./trainingCreator";

export const creatorGroup = (
  newExercises: Record<string, Array<string[]>>
): ExercisesGroups => {
  return {
    backAndBiceps: {
      workoutName: "Спина / Бицепс",
      exercises: [
        ...newExercises.back,
        ...newExercises.biceps,
        ...newExercises.additiona,
      ],
    },
    legsAndShoulder: {
      workoutName: "Ноги / Плечи",
      exercises: [
        ...newExercises.legs,
        ...newExercises.shoulder,
        ...newExercises.additiona,
      ],
    },
    pectoralAndTriceps: {
      workoutName: "Грудь / Трицепс",
      exercises: [
        ...newExercises.pectoral,
        ...newExercises.triceps,
        ...newExercises.additiona,
      ],
    },
    pectoral: {
      workoutName: "Грудь",
      exercises: [
        ...newExercises.pectoral,
        ...newExercises.additiona,
        ...newExercises.additiona,
      ],
    },
    legs: {
      workoutName: "Ноги",
      exercises: [
        ...newExercises.legs,
        ...newExercises.additiona,
        ...newExercises.additiona,
      ],
    },
    back: {
      workoutName: "Спина",
      exercises: [
        ...newExercises.back,
        ...newExercises.additiona,
        ...newExercises.additiona,
      ],
    },
  };
};
