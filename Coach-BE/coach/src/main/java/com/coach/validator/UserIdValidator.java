package com.coach.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UserIdValidator implements ConstraintValidator<ValidUserId, Long> {

    @Override
    public boolean isValid(Long userId, ConstraintValidatorContext context) {
        // Check if userId is equal to 2L
        return userId != null && userId.equals(2L);
    }
}