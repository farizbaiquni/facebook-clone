export enum ReactionsEnum {
  LIKE = 1,
  LOVE = 2,
  CARE = 3,
  HAHA = 4,
  WOW = 5,
  SAD = 6,
  ANGRY = 7,
}

export const reactionEnumToText = (id: ReactionsEnum): string => {
  switch (id) {
    case ReactionsEnum.LIKE:
      return "Like";
    case ReactionsEnum.LOVE:
      return "Love";
    case ReactionsEnum.CARE:
      return "Care";
    case ReactionsEnum.HAHA:
      return "Haha";
    case ReactionsEnum.WOW:
      return "Wow";
    case ReactionsEnum.SAD:
      return "Sad";
    case ReactionsEnum.ANGRY:
      return "Angry";
  }
};
