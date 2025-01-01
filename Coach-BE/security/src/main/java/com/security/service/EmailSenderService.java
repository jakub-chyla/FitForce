package com.security.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailSenderService {

    private final JavaMailSender mailSender;

    public void sendEmail(String recipient, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("fit.force.email@gmail.com");
        message.setTo(recipient);
        message.setText("aaa");
        message.setSubject(subject);

        try {
            mailSender.send(message);
        } catch (Exception e) {

        }

        System.out.println(message);
    }
}
