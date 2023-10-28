package com.project.medicineDonation.Donor;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Donor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String pharmacyName;


    private String location;

    private String phoneNumber;

    private String email;

    private String password;

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }


    public void setId(int id) {
        this.id = id;
    }



    public void setEmail(String email) {
        this.email = email;
    }

    public void setPharmacyName(String pharmacyName) {
        this.pharmacyName = pharmacyName;
    }

    public String getPharmacyName() {
        return pharmacyName;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public int getId() {
        return id;
    }




    public String getLocation() {
        return location;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }


}
