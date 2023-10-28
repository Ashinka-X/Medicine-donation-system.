package com.project.medicineDonation.Donor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DonorRepository extends JpaRepository<Donor, Integer> , JpaSpecificationExecutor<Donor> {

}
