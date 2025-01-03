package com.member.utils;

import lombok.experimental.UtilityClass;

import java.time.LocalDate;

@UtilityClass
public class Helper {

    public String convertLocalDateToSimpleStringDate(LocalDate localDate){
        return localDate.toString().split("T")[0];
    }
}
