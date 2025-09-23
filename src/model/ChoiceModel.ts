export interface ChoiceModel {
  id: number;
  text: string;
  stepId: number;
  objectId: number | null;
  linkToStepId: number;
  takeOrGive: number | null;
}
