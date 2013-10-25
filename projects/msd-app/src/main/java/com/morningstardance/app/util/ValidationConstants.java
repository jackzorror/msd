package com.morningstardance.app.util;

public class ValidationConstants {

    public static final String VALID_PHONE_REGEX = "(^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$)*$";
    public static final String VALID_NAME_REGEX = "^[a-zA-Z_ '-]*$";
    public static final String VALID_EMAIL_REGEX = "(\\b[A-Z0-9a-z._%-]+@[A-Z0-9a-z.-]+\\.[A-Za-z]{2,4}\\b)*$";
    public static final String VALID_GENDER_REGEX = "^(m|M|male|Male|f|F|female|Female)*$";
    public static final String VALID_DIGIT_REGEX = "^[0-9]*$";
}
