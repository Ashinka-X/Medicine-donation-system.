package com.project.medicineDonation.Medicine;

import com.project.medicineDonation.Medicine.Medicine;
import com.project.medicineDonation.Order.DetailsOrder;
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
public class MedicineService {

    @Autowired
    MedicineRepository medicineRepository;

    public void CreateMedicine(Medicine medicine) {
        medicineRepository.save(medicine);
    }

    public List<Medicine> getAllMedicines(String medicineName,Integer donorId) {
        List<Medicine> medicineOrder = new ArrayList<Medicine>();
         medicineRepository.findAll(Specification.where(medicineNameEquals(medicineName)).and(donorIdEquals(donorId))).forEach(updated -> medicineOrder.add((Medicine) updated));
         return medicineOrder;
    }
    private Specification<Medicine> donorIdEquals(final Integer donorId) {
        return(root, query, builder) -> {
            if (donorId != null) {
                return builder.equal(root.get("donorId"), donorId);
            } else {
                return null;
            }
        };
    }

    private Specification<Medicine> medicineNameEquals(final String medicineName) {
        return StringUtils.isEmpty(medicineName) ? null : (root, query, builder) -> builder.equal(root.get("medicineName"), medicineName);
    }

    public void deleteMedicine(int id) {
        medicineRepository.deleteById(id);
    }

    public ResponseEntity<Object> updateMedicine(int id, Medicine medicine) {
        //check if employee exist in database
        Optional<Medicine> medicineObje = medicineRepository.findById(id);
        Medicine medicineDetails = medicineObje.get();
        if (medicineObje != null) {
            return new ResponseEntity<>(medicineRepository.save(medicineDetails), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
