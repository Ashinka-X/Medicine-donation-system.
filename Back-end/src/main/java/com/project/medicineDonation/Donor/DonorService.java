package com.project.medicineDonation.Donor;


import com.project.medicineDonation.Donor.Donor;
import com.project.medicineDonation.Donor.Donor;
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
public class DonorService {

    @Autowired
    DonorRepository donorRepository;

    public void CreateDonor(Donor donor) {
        donorRepository.save(donor);
    }

    public List<Donor> getAllDonors(String pharmacyName,String location) {
        List<Donor> donorList = new ArrayList<Donor>();
        donorRepository.findAll(Specification.where(pharmacyNameEquals(pharmacyName)).and(locationEquals(location))).forEach(updated -> donorList.add((Donor) updated));
        return donorList;
    }

    private Specification<Donor> pharmacyNameEquals(final String pharmacyName) {
        return StringUtils.isEmpty(pharmacyName) ? null : (root, query, builder) -> builder.equal(root.get("pharmacyName"), pharmacyName);
    }

    private Specification<Donor> locationEquals(final String location) {
        return StringUtils.isEmpty(location) ? null : (root, query, builder) -> builder.equal(root.get("location"), location);
    }

    public void deleteDonor(int id) {
         donorRepository.deleteById(id);
    }

    public ResponseEntity<Object> updateDonor(int id, Donor donor) {
        //check if employee exist in database
        Optional<Donor> donorObje = donorRepository.findById(id);
        Donor donorDetails = donorObje.get();
        if (donorObje != null) {
            donorDetails.setEmail(donor.getEmail());
//            donorDetails.setFirstName(donor.getFirstName());
            donorDetails.setId(donor.getId());
//            donorDetails.setLastName(donor.getLastName());
//            donorDetails.setNationalIdentityNumber(donor.getNationalIdentityNumber());
            donorDetails.setLocation(donor.getLocation());
            return new ResponseEntity<>(donorRepository.save(donor), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
