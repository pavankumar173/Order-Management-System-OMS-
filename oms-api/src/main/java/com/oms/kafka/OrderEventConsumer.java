package com.oms.kafka;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class OrderEventConsumer {
	@KafkaListener(topics = "${oms.kafka.topic:order-events}", groupId = "oms-consumer")
	public void onMessage(String message) {
		log.info("Order placed successfully: {}", message);
	}
} 