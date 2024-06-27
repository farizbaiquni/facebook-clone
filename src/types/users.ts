export enum GenderNumberEnum {
  MALE = 1,
  FEMALE = 2,
}

export enum GenderTextEnum {
  MALE = "Male",
  FEMALE = "Female",
}

export type UserType = {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string | null;
  coverPhoto: string | null;
  bio: string | null;
  birthDate: Date;
  genderId: number;
};

export type UserCreateType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_picture: string | null;
  cover_photo: string | null;
  bio: string | null;
  birth_date: string;
  gender_id: GenderNumberEnum;
};
