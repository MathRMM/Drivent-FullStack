import api from './api';

export async function createActivity(token, activityId) {
  const response = await api.post(`/activities/${activityId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
