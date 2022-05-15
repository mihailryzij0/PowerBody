export const preloadedStateCards = {
  user: {
    idUser: "123testId",
    email: "test@gmail.com",
    isAuth: true,
    status: "fulfilled",
    error: null,
  },
  userData: {
    status: "setData-fulfilled",
    isAdmin: true,
    nickname: "Михаил Мирославович",
    avatarImg: "https://firebasestorage.googleapis.com/",
    error: null,
  },
  createPost: { status: "fulfilled" },
  ratings: { ratings: { "123": 4, "234": 5, "1": 5 } },

  cards: {
    postCards: {
      vitamins: [
        {
          title: "Курс",
          rating: "4",
          image: "https://firebasestorage.googleapis.com",
          author: "Михаил",
          typeWorkout: "Стандарт",
          authorId: "32345sdfbb",
        },
        {
          title: "Курс",
          rating: "4",
          image: "https://firebasestorage.googleapis.com",
          author: "Вася",
          typeWorkout: "На массу",
          authorId: "32345sdfbb",
        },
      ],
      workouts: [
        {
          title: "Тренировка",
          rating: "4",
          image: "https://firebasestorage.googleapis.com",
          author: "Михаил",
          typeWorkout: "Стандарт",
          authorId: "32345sdfbb",
        },
        {
          title: "Тренировка",
          rating: "4",
          image: "https://firebasestorage.googleapis.com",
          author: "Вася",
          typeWorkout: "На массу",
          authorId: "32345sdfbb",
        },
      ],
    },
    filteredCards: {
      vitamins: null,
      workouts: null,
      filteredParams: {
        author: "Весь список",
        typeWorkout: "Весь список",
      },
    },
    status: "",
    error: "",
  },
};
