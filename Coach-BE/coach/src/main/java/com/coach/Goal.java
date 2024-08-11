package com.coach;

public enum Goal {

    LOSE_WEIGHT("Lose weight"),
    GAIN_MUSCLES("Gain muscles");

    private final String value;

    Goal(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

}
