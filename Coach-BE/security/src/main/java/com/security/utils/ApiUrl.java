package com.security.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class ApiUrl {

    public final String API = "/api";
    public final String V1 = "/v1";

    @UtilityClass
    public class Security {
        public final String BASE = "/auth";
        public final String VALIDATE = BASE + "/validate";
        public final String REGISTER = BASE + "/register";
        public final String USER = BASE + "/user";
        public final String LOG_IN = BASE + "/log-in";
        public final String PING = BASE + "/ping";

    }
}