import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketsApi from '../../services/ticketsApi';

export default function useTicketsTypes() {
  const token = useToken();
  
  const {
    data: ticketsTypes,
    loading: ticketsLoading,
    error: ticketsTypesError,
    act: getTicketsTypes
  } = useAsync(() => ticketsApi.getTicketsTypes(token));
  
  return {
    ticketsTypes,
    ticketsLoading,
    ticketsTypesError,
    getTicketsTypes
  };
}
