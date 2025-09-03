package com.oms.controller;

import com.oms.domain.Order;
import com.oms.domain.User;
import com.oms.dto.AuthDtos.OrderCreateRequest;
import com.oms.service.OrderService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(OrderController.class)
class OrderControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private OrderService orderService;

	@Test
	void create_ok() throws Exception {
		String body = "{\"userId\":1,\"productName\":\"p1\",\"quantity\":2,\"price\":10.5}";
		User u = User.builder().id(1L).username("u1").passwordHash("x").createdAt(Instant.now()).build();
		Order o = Order.builder().id(1L).user(u).productName("p1").quantity(2).price(new BigDecimal("10.50")).createdAt(Instant.now()).build();
		Mockito.when(orderService.createOrder(new OrderCreateRequest(1L, "p1", 2, new BigDecimal("10.5")))).thenReturn(o);
		mockMvc.perform(post("/api/orders").contentType(MediaType.APPLICATION_JSON).content(body))
				.andExpect(status().isOk());
	}

	@Test
	void list_ok() throws Exception {
		User u = User.builder().id(1L).username("u1").passwordHash("x").createdAt(Instant.now()).build();
		Order o = Order.builder().id(1L).user(u).productName("p1").quantity(2).price(new BigDecimal("10.50")).createdAt(Instant.now()).build();
		Mockito.when(orderService.getOrdersByUser(1L)).thenReturn(List.of(o));
		mockMvc.perform(get("/api/orders/user/1")).andExpect(status().isOk());
	}
} 