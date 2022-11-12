package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.models.Customer;

@Repository("CustomerBean")
public interface customerRepository extends JpaRepository<Customer, Long> {

	@Query(value="select * from Customer where Customer.user_id= ?1", nativeQuery=true)
	Customer findByUserId(Long user_id);
}
