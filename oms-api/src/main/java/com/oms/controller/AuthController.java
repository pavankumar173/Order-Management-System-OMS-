package com.oms.controller;

import com.oms.domain.User;
import com.oms.dto.AuthDtos.*;
import com.oms.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
	private final AuthService authService;

	@PostMapping("/register")
	public ResponseEntity<User> register(@Validated @RequestBody RegisterRequest request) {
		User created = authService.register(request);
		return ResponseEntity.ok(created);
	}

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@Validated @RequestBody LoginRequest request) {
		AuthService.LoginResult lr = authService.login(request);
		return ResponseEntity.ok(new AuthResponse(lr.token(), lr.userId()));
	}
} 