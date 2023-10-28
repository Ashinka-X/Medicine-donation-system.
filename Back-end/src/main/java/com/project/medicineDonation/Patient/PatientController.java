package com.project.medicineDonation.Patient;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PatientController {

    @Autowired
    PatientService patientService;


    @PostMapping("/registerUser")
    private void CreatePatient(@RequestBody Patient patient){
        patientService.CreatePatient(patient);
    }

    @GetMapping("/getPatientDetails")
    private List<Patient> getPatient(){
        return patientService.getAllPatients();
    }

    @DeleteMapping("DeletePatient/{id}")
    private void deletePatient(@PathVariable int id){
        patientService.deletePatient(id);
    }

    @PutMapping("UpdatePatientDetail/{id}")
    private ResponseEntity<Object> updatePatient(@PathVariable int id, @RequestBody Patient patient){
        return patientService.updatePatient(id,patient);
    }

}
