import { useQuery } from "react-query";
import axios from "axios";

const useGetMedicine = ({ medicineName, donorId }) => {
  const fetchDeliveryNote = async () => {
    const query = new URLSearchParams();
    if (medicineName) {
      query.append("medicineName", medicineName);
    }
    if (donorId) {
      query.append("donorId", donorId);
    }
    try {
      const data = await axios.get(
        `http://localhost:8080/GetMedicineDetails?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["medicineData", medicineName, donorId], fetchDeliveryNote, {
    refetchOnWindowFocus: false,
  });
};

export default useGetMedicine;
