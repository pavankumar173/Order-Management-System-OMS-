package com.oms.controller;

import com.oms.dto.AuthDtos.LoginRequest;
import com.oms.dto.AuthDtos.RegisterRequest;
import com.oms.service.AuthService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@WebMvcTest(AuthController.class)
class AuthControllerTest {
	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private AuthService authService;

	@Test
	void register_ok() throws Exception {
		String body = "{\"username\":\"u1\",\"password\":\"secret123\"}";
		Mockito.when(authService.register(new RegisterRequest("u1","secret123"))).thenReturn(null);
		mockMvc.perform(post("/api/auth/register").contentType(MediaType.APPLICATION_JSON).content(body))
				.andExpect(status().isOk());
	}

	@Test
	void login_ok() throws Exception {
		String body = "{\"username\":\"u1\",\"password\":\"secret123\"}";
		Mockito.when(authService.login(new LoginRequest("u1","secret123"))).thenReturn(new AuthService.LoginResult("token123", 1L));
		mockMvc.perform(post("/api/auth/login").contentType(MediaType.APPLICATION_JSON).content(body))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.token").value("token123"))
				.andExpect(jsonPath("$.userId").value(1));
	}
} 