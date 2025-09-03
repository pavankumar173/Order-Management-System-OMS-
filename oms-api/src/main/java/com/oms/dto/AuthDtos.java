package com.oms.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class AuthDtos {
	public record RegisterRequest(
			@NotBlank String username,
			@NotBlank @Size(min = 6) String password
	) {}

	public record LoginRequest(
			@NotBlank String username,
			@NotBlank String password
	) {}

	public record AuthResponse(
			String token
	) {}

	public record OrderCreateRequest(
			@NotNull Long userId,
			@NotBlank String productName,
			@NotNull @Min(1) Integer quantity,
			@NotNull @DecimalMin("0.0") BigDecimal price
	) {}
} 