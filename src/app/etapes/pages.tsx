import { apiRoutes } from "@/data/ROUTES";

const Step = async () => {
  const apiResult = await fetch(apiRoutes.STEP(1, 1));
  const steps = await apiResult.json();
};

export default Step;
