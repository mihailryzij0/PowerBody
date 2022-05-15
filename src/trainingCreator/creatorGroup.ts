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
        ...newExercises.additional,
      ],
    },
    legsAndShoulder: {
      workoutName: "Ноги / Плечи",
      exercises: [
        ...newExercises.legs,
        ...newExercises.shoulder,
        ...newExercises.additional,
      ],
    },
    pectoralAndTriceps: {
      workoutName: "Грудь / Трицепс",
      exercises: [
        ...newExercises.pectoral,
        ...newExercises.triceps,
        ...newExercises.additional,
      ],
    },
    pectoral: {
      workoutName: "Грудь",
      exercises: [
        ...newExercises.pectoral,
        ...newExercises.additional,
        ...newExercises.additional,
      ],
    },
    legs: {
      workoutName: "Ноги",
      exercises: [
        ...newExercises.legs,
        ...newExercises.additional,
        ...newExercises.additional,
      ],
    },
    back: {
      workoutName: "Спина",
      exercises: [
        ...newExercises.back,
        ...newExercises.additional,
        ...newExercises.additional,
      ],
    },
  };
};
