package com.project.medicineDonation.Order;


import com.project.medicineDonation.Donor.Donor;
import com.project.medicineDonation.Donor.DonorRepository;
import com.project.medicineDonation.Medicine.Medicine;
import com.project.medicineDonation.Medicine.MedicineRepository;
import com.project.medicineDonation.Patient.Patient;
import com.project.medicineDonation.Patient.PatientRepository;
import io.micrometer.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class OrdersService {

    @Autowired
    OrdersRepository ordersRepository;

    @Autowired
    MedicineRepository medicineRepository;

    @Autowired
    DonorRepository donorRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    DetailsOrderRepository detailsOrderRepository;

    public void createOrder(Orders orders) {
        Optional<Medicine> medicineObj = medicineRepository.findById(orders.getMedicineId());
        Medicine medicine = medicineObj.get();

        Optional<Patient> patientObj = patientRepository.findById(orders.getPatientId());
        Patient patient = patientObj.get();

        Optional<Donor> donorObj = donorRepository.findById(medicine.getDonorId());
        Donor donor = donorObj.get();

        DetailsOrder detailsOrder = new DetailsOrder();

        detailsOrder.setExpiryDate(medicine.getExpiryDate());
        detailsOrder.setMedicineName(medicine.getMedicineName());
        detailsOrder.setMedicinePrescription(medicine.getPrescription());
        detailsOrder.setPatientName(patient.getName());
        detailsOrder.setPatientPhoneNumber(patient.getPhoneNumber());
        detailsOrder.setPharmacyEmail(donor.getEmail());
        detailsOrder.setPharmacyLocation(donor.getLocation());
        detailsOrder.setPatientId(patient.getId());
        detailsOrder.setPharmacyName(donor.getPharmacyName());
        detailsOrder.setPharmacyId(donor.getId());
        detailsOrder.setIsDelivered(false);
        detailsOrderRepository.save(detailsOrder);
        medicineRepository.deleteById(orders.getMedicineId());
    }

    public List<DetailsOrder> getAllOrders(Integer patientId, Integer pharmacyId) {
        List<DetailsOrder> detailsOrder = new ArrayList<DetailsOrder>();
        detailsOrderRepository.findAll(Specification.where(patientIdEquals(patientId)).and(pharmacyIdEquals(pharmacyId))).forEach(updated -> detailsOrder.add((DetailsOrder) updated));
        return detailsOrder;
    }

    private Specification<DetailsOrder> pharmacyIdEquals(final Integer pharmacyId) {
        return(root, query, builder) -> {
            if (pharmacyId != null) {
                return builder.equal(root.get("pharmacyId"), pharmacyId);
            } else {
                return null;
            }
        };
    }

    private Specification<DetailsOrder> patientIdEquals(final Integer patientId) {
        return(root, query, builder) -> {
            if (patientId != null) {
                return builder.equal(root.get("patientId"), patientId);
            } else {
                return null;
            }
        };

    }

    public void deleteOrder(int id) {
        ordersRepository.deleteById(id);
    }

    public ResponseEntity<Object> updateOrder(int id) {
        //check if employee exist in database
        Optional<DetailsOrder> orderObje = detailsOrderRepository.findById(id);
        DetailsOrder ordersDetails = orderObje.get();
        DetailsOrder detailsOrder = new DetailsOrder();

        detailsOrder.setExpiryDate(ordersDetails.getExpiryDate());
        detailsOrder.setMedicineName(ordersDetails.getMedicineName());
        detailsOrder.setMedicinePrescription(ordersDetails.getMedicinePrescription());
        detailsOrder.setPatientName(ordersDetails.getPatientName());
        detailsOrder.setPatientPhoneNumber(ordersDetails.getPatientPhoneNumber());
        detailsOrder.setPharmacyEmail(ordersDetails.getPharmacyEmail());
        detailsOrder.setPharmacyLocation(ordersDetails.getPharmacyLocation());
        detailsOrder.setPatientId(ordersDetails.getPatientId());
        detailsOrder.setPharmacyName(ordersDetails.getPharmacyName());
        detailsOrder.setPharmacyId(ordersDetails.getPharmacyId());
        detailsOrder.setId(ordersDetails.getId());
        detailsOrder.setIsDelivered(true);
        if (orderObje != null) {
            return new ResponseEntity<>(detailsOrderRepository.save(detailsOrder), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
