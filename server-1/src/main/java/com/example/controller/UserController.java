package com.example.controller;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.Map;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.models.Account;
import com.example.models.Customer;
import com.example.models.Staff;
import com.example.models.User;
import com.example.models.User.Type;
import com.example.repo.AccountRepository;
import com.example.repo.UserRepository;
import com.example.repo.customerRepository;
import com.example.repo.staffRepository;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.util.JSONPObject;

import java.util.List;

@SpringBootApplication
@RestController
public class UserController {

	@Autowired
	private UserRepository repo;
	
	@Autowired
	private staffRepository staffRepo;
	
	@Autowired
	private customerRepository customerRepo;
	
	@Autowired
	AccountRepository accountRepo;
	
	@RequestMapping("")
	public String demo() {
		return "Hi";
	}
	
	@CrossOrigin(origins ="http://localhost:3000", allowedHeaders = "Requestor-Type")
	@RequestMapping(path="login",method = RequestMethod.GET)
	public Map<String,User> login(@RequestParam String email,@RequestParam String password) {
		System.out.println("______Email"+email);
		try {
			User savedUser = repo.findByEmail(email);
//			Status online = Status.ONLINE;
			repo.loginStatus("ONLINE",savedUser.getUser_id());
			System.out.println(savedUser.getEmail());
			System.out.println(savedUser.getPassword());
			if(savedUser.getPassword().equals(password)) {
				HashMap<String,User> map = new HashMap<String,User>();
				map.put("user", savedUser);
				return map;	
			}
			HashMap<String,User> map = new HashMap<String,User>();
			map.put("user", new User());
			return map;	
		}catch(Exception e) {
			HashMap<String,User> map = new HashMap<String,User>();
			map.put("user", new User());
			return map;
		}

	}
	
	@CrossOrigin(origins ="http://localhost:3000", allowedHeaders = "Requestor-Type")
	@RequestMapping(path="logout",method = RequestMethod.PATCH)
	public String logout(@RequestParam Long user_id) {
		try {
			System.out.println("logout");
//			Status offline = Status.OFFLINE;
//			System.out.print(offline);
			repo.logoutStatus("OFFLINE",user_id);
			return "Success";
		}catch(Exception e) {
			return "Failed";
		}
	}
	
	@CrossOrigin(origins ="http://localhost:3000", allowedHeaders = "Requestor-Type")
	@RequestMapping(path="register-staff",method = RequestMethod.POST)
	public Map<String,Staff> registerStaff(User user,Staff staff) {
		try {
			System.out.print(user.getStatus());
			User savedUser = repo.save(user);
			staff.setUser(savedUser);
			Staff savedStaff = staffRepo.save(staff);
			
			HashMap<String,Staff> map = new HashMap<String,Staff>();
			map.put("user", savedStaff);
			return map;			
		}catch(Exception e) {
			HashMap<String,Staff> map = new HashMap<String,Staff>();
			map.put("user", new Staff());
			return map;
		}

	}
	
	@CrossOrigin(origins ="http://localhost:3000", allowedHeaders = "Requestor-Type")
	@RequestMapping(path="users",method = RequestMethod.GET)
	public Map<String,List<User>> getUsers() {
		
//		try {
			Type type=Type.CUSTOMER;
			List<User> savedUser = repo.findByType(type);
			
			HashMap<String,List<User>> map = new HashMap<String,List<User>>();
			map.put("user", savedUser);
			return map;		
//		}catch(Exception e) {
//			HashMap<String,List<User>> map = new HashMap<String,List<User>>();
//			User sample=new User();
//			map.put("user", List<User>);
//			return map;
//		}

	}
	
	@CrossOrigin(origins ="http://localhost:3000", allowedHeaders = "Requestor-Type")
	@RequestMapping(path="all-customers",method = RequestMethod.GET)
	public Map<String,List<Customer>> getAllCustomers() {
		
			List<Customer> savedUser = customerRepo.findAll();
			
			HashMap<String,List<Customer>> map = new HashMap<String,List<Customer>>();
			map.put("customer", savedUser);
			return map;		

	}
	
	@CrossOrigin(origins ="http://localhost:3000", allowedHeaders = "Requestor-Type")
	@RequestMapping(path="staff-details",method = RequestMethod.GET)
	public Map<String,Staff> getStaffDetails(@RequestParam Long user_id) {
		
			Staff savedUser = staffRepo.findByUserId(user_id);
			
			HashMap<String,Staff> map = new HashMap<String,Staff>();
			map.put("staff", savedUser);
			return map;		

	}
	
	
	
	
//	@CrossOrigin(origins ="http://localhost:3000", allowedHeaders = "Requestor-Type")
//	@RequestMapping(path="customers",method = RequestMethod.GET)
//	public Map<String,List<Customer>> getCustomers() {
//		
////		try {
//			List<Customer> savedUser = repo.findAll();
//			
//			HashMap<String,List<Customer>> map = new HashMap<String,List<Customer>>();
//			map.put("user", savedUser);
//			return map;		
////		}catch(Exception e) {
////			HashMap<String,List<User>> map = new HashMap<String,List<User>>();
////			User sample=new User();
////			map.put("user", List<User>);
////			return map;
////		}
//
//	}
	
	@CrossOrigin(origins ="http://localhost:3000", allowedHeaders = "Requestor-Type")
	@RequestMapping(path="register-customer",method = RequestMethod.POST)
	public Map<String,Customer> registerCustomer(User user,Customer customer) {
		
//		User savedUser = repo.save(user);
//		customer.setUser(savedUser);
//		Customer Savedcustomer=customerRepo.save(customer);
		try {
			
			User savedUser = repo.save(user);
			customer.setUser(savedUser);
			Customer Savedcustomer=customerRepo.save(customer);
		
			Account account=new Account();
			account.setDeposite(new BigDecimal("0.0"));
			account.setCustomer(customer);
			accountRepo.save(account);
			
			HashMap<String,Customer> map = new HashMap<String,Customer>();
			map.put("customer", Savedcustomer);
			return map;			
		}catch(Exception e) {
			HashMap<String,Customer> map = new HashMap<String,Customer>();
			map.put("customer", new Customer());
			return map;
		}

	}
	
	
	@CrossOrigin(origins ="http://localhost:3000", allowedHeaders = "Requestor-Type")
	@RequestMapping(path="customer-details",method = RequestMethod.GET)
	public Map<String,Customer> getCustomerDetails(@RequestParam Long user_id) {
		try {
			
			System.out.println(user_id);
			Customer customer = customerRepo.findByUserId(user_id);
			System.out.println(customer.getCustomerId());
			System.out.println(customer.getCustomerName());
			HashMap<String,Customer> map = new HashMap<String,Customer>();
			map.put("customer", customer);
			return map;			
		}catch(Exception e) {
			HashMap<String,Customer> map = new HashMap<String,Customer>();
			map.put("customer", new Customer());
			return map;
		}

	}
	
	@CrossOrigin(origins ="http://localhost:3000", allowedHeaders = "Requestor-Type")
	@RequestMapping(path="account-balance",method = RequestMethod.GET)
	public Map<String,Account> getBalance(@RequestParam Long customer_id) {
		try {
			
			System.out.println(customer_id);
			Account account = accountRepo.findByCustomerId(customer_id);
			System.out.println(account.getDeposite());
			HashMap<String,Account> map = new HashMap<String,Account>();
			map.put("account", account);
			return map;			
		}catch(Exception e) {
			HashMap<String,Account> map = new HashMap<String,Account>();
			map.put("account", new Account());
			return map;
		}

	}
	
	@CrossOrigin(origins ="http://localhost:3000", allowedHeaders = "Requestor-Type")
	@RequestMapping(path="deposite",method = RequestMethod.PATCH)
	public Map<String,String> deposite(@RequestParam Long accountNumber,@RequestParam BigDecimal amount) {
		try {
			
			System.out.println(amount);
			accountRepo.depositeAmount(amount,accountNumber);
			HashMap<String,String> map = new HashMap<String,String>();
			map.put("Messsage", "Update Successfully");
			Account account= accountRepo.getAccount(accountNumber);
			map.put("Messsage", "Update Successfully");
			map.put("Amount", account.getDeposite().toString());
			return map;			
		}catch(Exception e) {
			System.out.print("Error"+e);
			HashMap<String,String> map = new HashMap<String,String>();
			map.put("Message", "Error");
			return map;
		}
	}
	
	@CrossOrigin(origins ="http://localhost:3000", allowedHeaders = "Requestor-Type")
	@RequestMapping(path="withdraw",method = RequestMethod.PATCH)
	public Map<String,String> withdraw(@RequestParam Long accountNumber,@RequestParam BigDecimal amount) {
		try {
			System.out.println(amount);
			accountRepo.withdrawAmount(amount,accountNumber);
			HashMap<String,String> map = new HashMap<String,String>();
			Account account= accountRepo.getAccount(accountNumber);
			map.put("Messsage", "Update Successfully");
			map.put("Amount", account.getDeposite().toString());
			return map;			
		}catch(Exception e) {
			System.out.print("Error"+e);
			HashMap<String,String> map = new HashMap<String,String>();
			map.put("Message", "Error");
			return map;
		}

	}
	
	
}
