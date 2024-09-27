import {Goal} from "./goal";

export class Member {
  id?: number;
  userId?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: number;
  birthday?: string;
  goal?: Goal;
}
