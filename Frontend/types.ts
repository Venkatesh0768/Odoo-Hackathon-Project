
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: number;
  name: string;
  email: string;
  location?: string;
  profilePhoto?: string;
  isPublic: boolean;
  isBanned: boolean;
  role: UserRole;
  skills: Skill[];
}

export enum SkillType {
  OFFERED = 'Offered',
  WANTED = 'Wanted',
}

export interface Skill {
  id: number;
  skillName: string;
  skillType: SkillType;
  user: { id: number };
}

export enum SwapStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

export interface SwapRequest {
  id: number;
  sender: User;
  receiver: User;
  offeredSkill: Skill & { user: User };
  requestedSkill: Skill & { user: User };
  status: SwapStatus;
  createdAt: string;
}

export interface Feedback {
  id: number;
  swapRequestId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Availability {
  day: string;
  time: string;
}
