package com.project.medicineDonation.Order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface DetailsOrderRepository  extends JpaRepository<DetailsOrder, Integer>, JpaSpecificationExecutor<DetailsOrder> {
}
