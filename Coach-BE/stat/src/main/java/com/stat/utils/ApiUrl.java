package com.stat.utils;

import lombok.experimental.UtilityClass;

@UtilityClass
public class ApiUrl {

    public final String API = "/api";
    public final String V1 = "/v1";

    @UtilityClass
    public class Stat {
        public final String BASE = "/stats";
        public final String WEIGHTS = BASE +  "/weights";
        public final String TRAININGS = BASE +  "/trainings";
        public final String NEXT_TRAININGS = BASE +  "/next-trainings";
        public final String DIETS = BASE +  "/diets";
        public final String MEMBER = BASE +  "/member";
        public final String PING = BASE +  "/ping";

    }
}
