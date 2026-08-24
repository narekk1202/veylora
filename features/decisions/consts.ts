import {
  CATEGORY_COLOR,
  CATEGORY_NAME,
} from "@/shared/constants/catergories.consts";
import { DecisionCategory } from "./types";

export const CATEGORY_OPTIONS = (
  Object.keys(CATEGORY_NAME) as DecisionCategory[]
).map((id) => ({
  id,
  name: CATEGORY_NAME[id],
  color: CATEGORY_COLOR[id],
}));
