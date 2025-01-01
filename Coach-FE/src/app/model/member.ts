import {Goal} from "./goal";

export class Member {
  id?: number;
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: number;
  avatar?: number;
  birthday?: string;
  goal?: Goal;
}
