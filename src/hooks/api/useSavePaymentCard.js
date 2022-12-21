import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function useSavePayment() {
  const token = useToken();
  
  const {
    data: payment,
    loading: paymentLoading,
    error: paymentError,
    act: createPayment
  } = useAsync((data) => paymentApi.createPayment(data, token), false);
  
  return {
    payment,
    paymentLoading,
    paymentError,
    createPayment
  };
};
