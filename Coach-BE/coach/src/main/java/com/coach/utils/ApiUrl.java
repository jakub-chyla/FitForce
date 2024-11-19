package com.coach.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class ApiUrl {

    public final String API = "/api";
    public final String V1 = "/v1";

    @UtilityClass
    public class Member {
        public final String BASE = "/members";
        public final String GET_MEMBER = BASE + "/{user-id}";
        public final String WITH_NAME = "/with-name";
    }
}
