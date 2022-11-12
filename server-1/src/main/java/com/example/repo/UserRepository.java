package com.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.models.User;
//import com.example.models.User.Status;
import com.example.models.User.Type;

import java.math.BigDecimal;
import java.util.List;

import javax.transaction.Transactional;

@Transactional
@Repository("RepoBean")
public interface UserRepository extends JpaRepository<User, Long> {
	User findByEmail(String email);

	public List<User> findByType(Type type);
	
	@Modifying
	@Query(value="update User set User.status = ?1 where user_id = ?2", nativeQuery=true)
	public int loginStatus(String status,Long user_id);
	
	@Modifying
	@Query(value="update User set User.status = ?1 where user_id = ?2", nativeQuery=true)
	public int logoutStatus(String status,Long user_id);
//	
}
