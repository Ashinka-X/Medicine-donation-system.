import { useQuery } from "react-query";
import axios from "axios";

const useGetPharmacyDetails = ({
  pharmacyName,
  location,
  email,
  phoneNumber,
}) => {
  const fetchRequest = async () => {
    const query = new URLSearchParams();
    if (pharmacyName) {
      query.append("pharmacyName", pharmacyName);
    }
    if (location) {
      query.append("location", location);
    }
    try {
      const data = await axios.get(
        `http://localhost:8080/GetDonorDetails?${query.toString()}`
      );

      return data.data;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return useQuery(["pharmacyDetails", pharmacyName, location], fetchRequest, {
    refetchOnWindowFocus: false,
  });
};

export default useGetPharmacyDetails;
