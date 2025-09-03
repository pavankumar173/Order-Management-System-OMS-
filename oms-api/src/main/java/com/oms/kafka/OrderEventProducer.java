package com.oms.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderEventProducer {
	private final KafkaTemplate<String, String> kafkaTemplate;

	@Value("${oms.kafka.topic:order-events}")
	private String topic;

	public void publish(String message) {
		kafkaTemplate.send(topic, message);
	}
} 