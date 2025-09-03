package com.oms.service;

import com.oms.domain.User;
import com.oms.dto.AuthDtos.LoginRequest;
import com.oms.dto.AuthDtos.RegisterRequest;
import com.oms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class AuthService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	private final Map<String, Long> tokenToUserId = new ConcurrentHashMap<>();

	public User register(RegisterRequest req) {
		if (userRepository.existsByUsername(req.username())) {
			throw new IllegalArgumentException("Username already exists");
		}
		User user = User.builder()
				.username(req.username())
				.passwordHash(passwordEncoder.encode(req.password()))
				.createdAt(Instant.now())
				.build();
		return userRepository.save(user);
	}

	public String login(LoginRequest req) {
		Optional<User> userOpt = userRepository.findByUsername(req.username());
		User user = userOpt.orElseThrow(() -> new IllegalArgumentException("Invalid credentials"));
		if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
			throw new IllegalArgumentException("Invalid credentials");
		}
		String token = UUID.randomUUID().toString();
		tokenToUserId.put(token, user.getId());
		return token;
	}

	public Optional<Long> resolveUserId(String token) {
		return Optional.ofNullable(tokenToUserId.get(token));
	}
} 