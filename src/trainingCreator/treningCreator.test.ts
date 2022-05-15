import { trainingCreator } from "./trainingCreator";

describe("treningCreator", () => {
  const parameters = [
    {
      level: "Начинающий",
      purpose: "Повысить силовые",
      muscleGroup: "Грудь",
    },
    {
      level: "Средний",
      purpose: "Повысить выносливость",
      muscleGroup: "Спина",
    },
    {
      level: "Начинающий",
      purpose: "Повысить выносливость",
      muscleGroup: "Спина",
    },
    {
      level: "Начинающий",
      purpose: "Набрать массу",
      muscleGroup: "Ноги",
    },
    {
      level: "Средний",
      purpose: "Набрать массу",
      muscleGroup: "Ноги",
    },
    {
      level: "Средний",
      purpose: "Набрать массу",
      muscleGroup: "Грудь",
    },
  ];

  it("a training session for 18 days is being created", () => {
    parameters.forEach((parameter) => {
      const workout = trainingCreator(parameter);
      expect(workout?.workouts?.length).toBe(18);
      expect(workout?.title).toBe("Индивидуальная тренировка");
      expect(workout?.image).toBe("");
      expect(workout?.authorId).toBe("");
      expect(workout?.author).toBe("PowerBody");
    });
  });
});
