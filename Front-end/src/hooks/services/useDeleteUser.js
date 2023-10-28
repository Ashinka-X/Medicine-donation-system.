import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteUser = ({ id }) => {
  const QueryClient = useQueryClient();
  const deleteRepair = `http://localhost:8080/DeletePatient/${id}`;

  return useMutation(
    (obj) =>
      axios.delete(deleteRepair, JSON.stringify(obj)).then((x) => x.json()),
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

export default useDeleteUser;
