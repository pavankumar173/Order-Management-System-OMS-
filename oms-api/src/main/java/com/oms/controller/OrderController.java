package com.oms.controller;

import com.oms.domain.Order;
import com.oms.dto.AuthDtos.OrderCreateRequest;
import com.oms.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
	private final OrderService orderService;

	@PostMapping
	public ResponseEntity<Order> createOrder(@Validated @RequestBody OrderCreateRequest request) {
		Order created = orderService.createOrder(request);
		return ResponseEntity.ok(created);
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<List<Order>> getOrders(@PathVariable Long userId) {
		return ResponseEntity.ok(orderService.getOrdersByUser(userId));
	}
} 