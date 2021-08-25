import EventApi from "../services/event";
import EnrollmentApi from "../services/enrollment";
import AuthApi from "../services/auth";
import CertificateAPI from "../services/certificate";

export default function useApi() {
  return {
    event: new EventApi(),
    enrollment: new EnrollmentApi(),
    auth: new AuthApi(),
    certificate: new CertificateAPI(),
  };
}
