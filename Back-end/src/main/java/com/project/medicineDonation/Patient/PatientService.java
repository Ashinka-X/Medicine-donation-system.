package com.project.medicineDonation.Patient;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    @Autowired
    PatientRepository patientRepository;

    public void CreatePatient(Patient patient) {
        patientRepository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public void deletePatient(int id) {
        patientRepository.deleteById(id);
        patientRepository.findAll();
    }

    public ResponseEntity<Object> updatePatient(int id, Patient patient) {
        //check if employee exist in database
        Optional<Patient> patientObje = patientRepository.findById(id);
        Patient patientDetails = patientObje.get();
        if (patientObje != null) {
            return new ResponseEntity<>(patientRepository.save(patientDetails), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
