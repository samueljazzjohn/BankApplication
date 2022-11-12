package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.models.Customer;
import com.example.models.Staff;

@Repository("StaffBean")
public interface staffRepository extends JpaRepository<Staff, Long> {

	@Query(value="select * from Staff where Staff.user_id= ?1", nativeQuery=true)
	Staff findByUserId(Long user_id);
}
