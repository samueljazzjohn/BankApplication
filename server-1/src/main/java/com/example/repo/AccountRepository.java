package com.example.repo;

import java.math.BigDecimal;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.models.Account;
import com.example.models.Customer;

@Transactional
@Repository("AccountBean")
public interface AccountRepository extends JpaRepository<Account, Long> {
	
	@Query(value="select * from Account where account_number = ?1", nativeQuery=true)
	Account getAccount(Long accountNumber);
	
	@Query(value="select * from Account where Account.customer_id= ?1", nativeQuery=true)
	Account findByCustomerId(Long customer_id);
	
	@Modifying
	@Query(value="update Account set deposite = ( deposite + ?1 ) where account_number = ?2", nativeQuery=true)
	int depositeAmount(BigDecimal amount,Long accountNumber);
	
	@Modifying
	@Query(value="update Account set deposite = ( deposite - ?1 ) where  account_number = ?2", nativeQuery=true)
	int withdrawAmount(BigDecimal amount,Long accountNumber);

}
