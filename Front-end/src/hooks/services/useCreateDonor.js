import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useCreatePharmacy = () => {
  const QueryClient = useQueryClient();
  const projectUrl = "http://localhost:8080/registerDonor";

  return useMutation(
    async (obj) => await axios.post(projectUrl, obj),
    {
      onSuccess: async () => {
        QueryClient.invalidateQueries();
      },
    },
    {
      onError: async () => {
        console.log("error");
      },
    }
  );
};

export default useCreatePharmacy;
