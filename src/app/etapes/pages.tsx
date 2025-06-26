import { apiRoutes } from "@/data/ROUTES";

const Step = async () => {
  const apiResult = await fetch(apiRoutes.STEP(1, 1));
  const steps = await apiResult.json();
  console.log(steps);
};

export default Step;
