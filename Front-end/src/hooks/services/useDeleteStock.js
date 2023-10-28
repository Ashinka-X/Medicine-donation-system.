import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeletePharmacy = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteStock = `http://localhost:8080/DeleteDonor/${id}`;

  return useMutation(
    (obj) =>
      axios.delete(deleteStock, JSON.stringify(obj)).then((x) => x.json()),
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

export default useDeletePharmacy;
