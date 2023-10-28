package com.project.medicineDonation.Order;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class OrdersController {

    @Autowired
    OrdersService ordersService;


    @PostMapping("/addMedicine")
    private void createOrder(@RequestBody Orders orders){
        ordersService.createOrder(orders);
    }

    @GetMapping("/getOrders")
    private List<DetailsOrder> getOrder( @RequestParam(required = false) Integer patientId,@RequestParam(required = false)  Integer  pharmacyId){
        return ordersService.getAllOrders(patientId,pharmacyId);
    }

    @DeleteMapping("DeleteOrder/{id}")
    private void deleteOrder(@PathVariable int id){
        ordersService.deleteOrder(id);
    }

    @PutMapping("UpdateOrderDetail/{id}")
    private ResponseEntity<Object> updateOrder(@PathVariable int id){
        return ordersService.updateOrder(id);
    }
}
