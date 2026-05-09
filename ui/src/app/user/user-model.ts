export const hairColors = ['', 'black', 'blonde', 'red', 'darkbrown'] as const;
export type HairColor = (typeof hairColors)[number];

export interface UserDto {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  hairColor?: HairColor;
}

export interface UserModel extends Omit<UserDto, 'id' | 'birthDate'> {
  id?: string;
  birthDate?: Date;
}

export const mapUser = (user: UserDto): UserModel => ({
  ...user,
  birthDate: user.birthDate ? new Date(user.birthDate) : undefined,
});
