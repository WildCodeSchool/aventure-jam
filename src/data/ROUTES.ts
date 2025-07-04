const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const apiRoutes = {
  INFOS: `${apiUrl}/api/infos`,
  HISTORY: (id: number) => `${apiUrl}/api/histories/${id}`,
  STEP: (historyId: number, stepId: number) =>
    `${apiUrl}/api/histories/${historyId}/steps/${stepId}`,
  CHOICES: (historyId: number, stepId: number) =>
    `${apiUrl}/api/histories/${historyId}/steps/${stepId}/choices`,
};

const appRoutes = {
  INFOS: `${appUrl}/infos`,
  INFOS_ID: (id: number) => `${appUrl}/infos/${id}`,
  INFOS_ADD: `${appUrl}/infos/ajouter-info`,
  INFOS_EDIT: (id: number) => `${appUrl}/infos/${id}/editer-info`,
  HISTORY: (historyId: number) => `/histoire/${historyId}`,
  STEP: (historyId: number, stepId: number) =>
    `/histoire/${historyId}/etape/${stepId}`,
};

export { apiRoutes, appRoutes };
