package com.member.validator;

import com.member.model.UserCredential;
import com.member.repository.UserCredentialRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class AdminValidator implements ConstraintValidator<ValidAdmin, Long> {

    private final UserCredentialRepository userCredentialRepository;

    @Override
    public boolean isValid(Long userId, ConstraintValidatorContext context) {
        UserCredential user = userCredentialRepository.findById(userId).get();
        return userId != null && user.getRole().equals("ADMIN");
    }
}