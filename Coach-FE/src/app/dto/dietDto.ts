import {Diet} from "../model/Diet";

export class DietDto{
  id?: number;
  memberId?: number;
  diets: Diet[] = [];
  fats?: number;
  sumCarbohydrates?: number;
  sumProteins?: number;
  sumFats?: number;
}
