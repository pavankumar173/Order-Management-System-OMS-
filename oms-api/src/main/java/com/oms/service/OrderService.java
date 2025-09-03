package com.oms.service;

import com.oms.domain.Order;
import com.oms.domain.User;
import com.oms.dto.AuthDtos.OrderCreateRequest;
import com.oms.kafka.OrderEventProducer;
import com.oms.repository.OrderRepository;
import com.oms.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
	private final OrderRepository orderRepository;
	private final UserRepository userRepository;
	private final OrderEventProducer orderEventProducer;
	private final ObjectMapper objectMapper = new ObjectMapper();

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
		Order saved = orderRepository.save(order);
		try {
			String payload = objectMapper.writeValueAsString(new OrderEvent(saved.getId(), user.getId(), saved.getProductName(), saved.getQuantity(), saved.getPrice().toPlainString(), saved.getCreatedAt().toString()));
			orderEventProducer.publish(payload);
		} catch (Exception ignored) {}
		return saved;
	}

	public List<Order> getOrdersByUser(Long userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new IllegalArgumentException("User not found"));
		return orderRepository.findByUserOrderByCreatedAtDesc(user);
	}

	private record OrderEvent(Long orderId, Long userId, String productName, Integer quantity, String price, String createdAt) {}
} 