import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activitiesApi from '../../services/activitiesApi';

export default function useActivities() {
  const token = useToken();
  
  const {
    data: activity,
    loading: activityLoading,
    error: activityError,
    act: createActivity
  } = useAsync((activityId) => activitiesApi.createActivity(token, activityId), false);
  
  return {
    activity,
    activityLoading,
    activityError,
    createActivity
  };
}
