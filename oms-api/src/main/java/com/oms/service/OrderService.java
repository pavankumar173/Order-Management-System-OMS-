package com.oms.service;

import com.oms.domain.Order;
import com.oms.domain.User;
import com.oms.dto.AuthDtos.OrderCreateRequest;
import com.oms.repository.OrderRepository;
import com.oms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
	private final OrderRepository orderRepository;
	private final UserRepository userRepository;

	public Order createOrder(OrderCreateRequest req) {
		User user = userRepository.findById(req.userId())
				.orElseThrow(() -> new IllegalArgumentException("User not found"));
		Order order = Order.builder()
				.user(user)
				.productName(req.productName())
				.quantity(req.quantity())
				.price(req.price())
				.createdAt(Instant.now())
				.build();
		return orderRepository.save(order);
	}

	public List<Order> getOrdersByUser(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new IllegalArgumentException("User not found"));
		return orderRepository.findByUserOrderByCreatedAtDesc(user);
	}
} 