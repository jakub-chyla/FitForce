import {Goal} from "./goal";
import {Weight} from "./weight";
import {Training} from "./training";

export class FullMemberResponse {
  memberId?: number;
  weights?: Weight[];
  trainings?: Training[];

}
