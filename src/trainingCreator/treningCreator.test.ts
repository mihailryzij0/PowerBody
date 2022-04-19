import { trainingCreator } from "./trainingCreator";

describe("treningCreator", () => {
  const parametrs = [
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
    parametrs.forEach((parametr) => {
      const workout = trainingCreator(parametr);
      expect(workout?.workouts?.length).toBe(18);
      expect(workout?.title).toBe("Индивидульная тренировка");
      expect(workout?.rating).toBe("4");
      expect(workout?.image).toBe("");
      expect(workout?.authorId).toBe("");
      expect(workout?.author).toBe("");
    });
  });
});
