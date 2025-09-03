package com.oms.repository;

import com.oms.domain.Order;
import com.oms.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByUserOrderByCreatedAtDesc(User user);
} 