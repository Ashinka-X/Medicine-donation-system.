import { useQuery } from "react-query";
import axios from "axios";

const useGetUsers = () => {
  const fetchRequest = async () => {
    try {
      const data = await axios.get(`http://localhost:8080/getPatientDetails`);

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["userDetails"], fetchRequest, {
    refetchOnWindowFocus: false,
  });
};

export default useGetUsers;
