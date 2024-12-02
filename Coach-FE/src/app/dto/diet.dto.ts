import {Diet} from "../model/diet";

export class DietDto{
  id?: number;
  memberId?: number;
  diets: Diet[] = [];
  fats?: number;
  sumCarbohydrates?: number;
  sumProteins?: number;
  sumFats?: number;
}
