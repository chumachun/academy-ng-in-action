export const HairColors = ['', 'black', 'blonde', 'red', 'darkbrown'] as const;
export type HairColor = (typeof HairColors)[number];

export interface UserDto {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  hairColor?: HairColor;
}

export interface User extends Omit<UserDto, 'id' | 'birthDate'> {
  id?: string;
  birthDate?: Date;
}

export const mapUser = (user: UserDto): User => ({ ...user, birthDate: user.birthDate ? new Date(user.birthDate) : undefined });
