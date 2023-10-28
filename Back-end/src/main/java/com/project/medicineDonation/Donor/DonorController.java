package com.project.medicineDonation.Donor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class DonorController {

    @Autowired
    DonorService donorService;


    @PostMapping("/registerDonor")
    private void CreateDonor(@RequestBody Donor donor){
        donorService.CreateDonor(donor);
    }

    @GetMapping("/GetDonorDetails")
    private List<Donor> getDonor( @RequestParam(required = false) String pharmacyName,@RequestParam(required = false) String location){
        return donorService.getAllDonors(pharmacyName,location);
    }

    @DeleteMapping("DeleteDonor/{id}")
    private void deleteDonor(@PathVariable int id){
         donorService.deleteDonor(id);
    }

    @PutMapping("UpdateDonorDetail/{id}")
    private ResponseEntity<Object> updateDonor(@PathVariable int id, @RequestBody Donor donor){
        return donorService.updateDonor(id,donor);
    }
}
