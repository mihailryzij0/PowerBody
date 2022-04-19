import { creatorGroup } from "./creatorGroup";
import { exercises } from "./exercisStorage";
import { generator } from "./generator";

describe("treningCreator", () => {
  let group = creatorGroup(exercises);
  it(
    "training is created for muscle groups" +
      "Спина, Грудь / Трицепс, Ноги / Плечи",
    () => {
      const { workouts } = generator(
        group.back,
        group.pectoralAndTriceps,
        group.legsAndShoulder
      );
      expect(workouts.length).toBe(18);
      expect(workouts[0].workoutName).toBe("Спина");
      expect(workouts[0].exercises.length).toBe(5);
      expect(workouts[1].workoutName).toBe("Грудь / Трицепс");
      expect(workouts[1].exercises.length).toBe(6);
      expect(workouts[2].workoutName).toBe("Ноги / Плечи");
      expect(workouts[2].exercises.length).toBe(6);
    }
  );
  it(
    "training is created for muscle groups" +
      "Грудь, Спина / Бицепс, Ноги / Плечи",
    () => {
      const { workouts } = generator(
        group.pectoral,
        group.backAndBiceps,
        group.legsAndShoulder
      );
      expect(workouts.length).toBe(18);
      expect(workouts[0].workoutName).toBe("Грудь");
      expect(workouts[0].exercises.length).toBe(5);
      expect(workouts[1].workoutName).toBe("Спина / Бицепс");
      expect(workouts[1].exercises.length).toBe(6);
      expect(workouts[2].workoutName).toBe("Ноги / Плечи");
      expect(workouts[2].exercises.length).toBe(6);
    }
  );
  it(
    "training is created for muscle groups" +
      "Спина / Бицепс, Грудь / Трицепс, Ноги / Плечи",
    () => {
      const { workouts } = generator(
        group.backAndBiceps,
        group.pectoralAndTriceps,
        group.legsAndShoulder
      );
      expect(workouts.length).toBe(18);
      expect(workouts[0].workoutName).toBe("Спина / Бицепс");
      expect(workouts[0].exercises.length).toBe(6);
      expect(workouts[1].workoutName).toBe("Грудь / Трицепс");
      expect(workouts[1].exercises.length).toBe(6);
      expect(workouts[2].workoutName).toBe("Ноги / Плечи");
      expect(workouts[2].exercises.length).toBe(6);
    }
  );
});
