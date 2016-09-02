var CUSTOMER_SUPPORT_PHONE_NUMBER = "855-271-2227";
var GENERAL_SYSTEM_ERROR = "Please try again. If the issue persists, please contact customer support " + CUSTOMER_SUPPORT_PHONE_NUMBER + ".";
var SYSTEM_REGISTRATION_ERROR = "Registration failed. " + GENERAL_SYSTEM_ERROR;
var GENERAL_UPDATE_SUCCESS = "Update successful!";
var SYSTEM_UPDATE_ERROR = "Update failed. " + GENERAL_SYSTEM_ERROR;
var SYSTEM_ADD_ERROR = "Add failed. " + GENERAL_SYSTEM_ERROR;
var SYSTEM_DELETE_ERROR = "Delete failed. " + GENERAL_SYSTEM_ERROR;
var SYSTEM_SAVE_ERROR = "Save failed. " + GENERAL_SYSTEM_ERROR;
var IDENTIFICATION_CODE_SENT_SUCCESS = "A new identification code has been sent.";

// /////////////////////////////////////////////////////////////////////////////////////////////////////////

// ////////////////////////////////FORGOT
// PASSWORD///////////////////////////////////////////
var PASSWORD_VALIDATION_RULES = {
    MIN_LENGTH_NEW_PASSWORD: "At least 8 characters",
    REQUIRED_NUMERIC_IN_NEW_PASSWORD: "At least one number",
    REQUIRED_UPPERCASE_IN_NEW_PASSWORD: "At least one upper case letter",
    REQUIRED_USERNAME: "Username or Email is required!",
    USERNAME_NOT_FOUND: "Username or Email address is not found.",
    ANSWER_INCORRECT: "That answer is incorrect.",
    MINIMUM_CHARACTERS: "Contains minimum 1 character.",
    SELECT_COMMUNICATION_MODE: "Please select a communication method to receive the Identification Code.",
    IDENTIFICATION_CODE_REQUIRED: "Please enter an Identification Code.",
    IDENTIFICATION_CODE_INVALID: "Invalid identification code. Please try again.",
    IDENTIFICATION_CODE_EXPIRED: "Expired identification code. Please request a new identification code.",
    QUESTION_KEYS_NOT_FOUND: 'Security Question keys not found for the user. Please contact support via <a href="tel:' + CUSTOMER_SUPPORT_PHONE_NUMBER + '">Phone (' + CUSTOMER_SUPPORT_PHONE_NUMBER + ')</a> to resolve the issue.',
    QUESTIONS_NOT_FOUND: 'Security Question not found for the user. Please contact support via <a href="tel:' + CUSTOMER_SUPPORT_PHONE_NUMBER + '">Phone (' + CUSTOMER_SUPPORT_PHONE_NUMBER + ')</a> to resolve the issue.'
};

var ZIPCODE_VALIDATION_RULES = {
    REQUIRED_ZIPCODE: "Please Enter Zip Code.",
    ZIPCODE_FORMAT: "Zip Code must contain 5 numeric values.",
    ZIPCODE_INVALID: "Please input valid US Zip Code."
};

// //////////////////////////////////LOGIN/////////////////////////////////////////////////////////
var LOGIN_ERROR_MESSAGES = {
    INVALID_USERNAME_PASSWORD: "Invalid Username or Password",
    INVALID_ROLE_OF_PATIENT: "Invalid Username or Password. Clinicians please click here to <a href='{0}'>Login</a>."
};
// /////////////////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////UPDATE_PASSWORD/////////////////////////////////////////////////////////
var PASSWORD_UPDATE_SUCCESSFUL = GENERAL_UPDATE_SUCCESS;

var PASSWORD_ERROR_MESSAGES = {
    UPDATE_FAILED: "Password update failed, please correct your current password!",
    REQUIRED_CURRENT_PASSWORD: "Please enter your current password.",
    MIN_LENGTH_CURRENT_PASSWORD: "Current password is at least 8 characters.",
    INVALID_PASSWORD: "New password does not meet minimum security requirements.",
    MIN_LENGTH_NEW_PASSWORD: PASSWORD_VALIDATION_RULES.MIN_LENGTH_NEW_PASSWORD,
    REQUIRED_NUMERIC_IN_NEW_PASSWORD: PASSWORD_VALIDATION_RULES.REQUIRED_NUMERIC_IN_NEW_PASSWORD,
    REQUIRED_UPPERCASE_IN_NEW_PASSWORD: PASSWORD_VALIDATION_RULES.REQUIRED_UPPERCASE_IN_NEW_PASSWORD,
    PASSWORD_MISMATCH: "Password and Confirm Password do not match."
};
// /////////////////////////////////////////////////////////////////////////////////////////////////////////

// ////////////////////////////////CONTACT
// PREFERENCE///////////////////////////////////////////
var CONTACT_UPDATE_SUCCESSFUL = GENERAL_UPDATE_SUCCESS;

var CONTACT_ERROR_MESSAGES = {
    REQUIRED_CONTACT_METHOD: "Please select at least one of the contact methods.",
    REQUIRED_PHONE_TYPE: "Please select a Phone Number Type.",
    REQUIRED_PHONE_NUMBER: "Please enter a phone number.",
    INVALID_FORMAT_PHONE_NUMBER: "Phone number must be 10 digits.",
    REQUIRED_PIN: "Please enter a PIN.",
    INVALID_PIN: "Invalid entry. Please check your PIN or request a new PIN.",
    PIN_GENERATION_FAILURE: "Identification Code not generated. Please try again."
};
// /////////////////////////////////////////////////////////////////////////////////////////////////////////

// ////////////////////////////////ACCOUNT
// INFORMATION///////////////////////////////////////////
var ACCOUNT_INFORMATION_ERROR_MESSAGES = {
    PHONE_NUMBER_FORMAT: "Phone number must be 10 digits.",
    REQUIRED_MOBILE_PHONE: "This field is required.",
    REQUIRED_ADDRESS1: "This field is required.",
    REQUIRED_CITY: "This field is required.",
    REQUIRED_STATE: "Please Enter State.",
    REQUIRED_ZIPCODE: ZIPCODE_VALIDATION_RULES.REQUIRED_ZIPCODE,
    ZIPCODE_FORMAT: ZIPCODE_VALIDATION_RULES.ZIPCODE_FORMAT,
    ZIPCODE_INVALID: ZIPCODE_VALIDATION_RULES.ZIPCODE_INVALID
};
// /////////////////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////SECURITY///////////////////////////////////////////
var SECURITY_ERROR_MESSAGES = {
    REQUIRED_QUESTION1: "Please select a question from the list.",
    REQUIRED_QUESTION2: "Please select Question 2.",
    REQUIRED_ANSWER: "Please enter Security Question answer.",
    SAME_QUESTION: "The two questions can't be the same.",
    SAME_ANSWER: "The two answers can't be the same."
};
// /////////////////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////REGISTER///////////////////////////////////////////
var REGISTER_ERROR_MESSAGES = {
    REQUIRED_GENDER: "Please select gender",
    REQUIRED_FIRST_NAME: "First name must contain at least 1 character.",
    INVALID_FIRST_NAME: "Invalid First Name",
    INVALID_LENGTH_LAST_NAME: "Last name must contain at least 2 characters.",
    INVALID_LAST_NAME: "Invalid Last Name",
    REQUIRED_DATE_OF_BIRTH: "Date of birth is required.",
    INVALID_FORMAT_DATE: "Date format should be mm/dd/yyyy",
    INVALID_DATE: "Invalid Date",
    AT_LEAST_THIREEN_YEARS_OLD_DATE: "The age can't be under 13 years old.",
    REQUIRED_ZIP_CODE: "Please input Zip Code.",
    INVALID_LENGTH_ZIP_CODE: "Zip Code must contain 5 numeric values.",
    INVALID_US_ZIP_CODE: "Please input valid US Zip Code.",
    REQUIRED_EMAIL: "This field is required.",
    IN_USE_EMAIL: "This email is already in use.",
    INVALID_EMAIL: "Please use a valid email address.",
    NOT_MATCH_CONFIRM_EMAIL_EMAIL: "Email addresses do not match.",
    INVALID_PASSWORD: "Password does not meet minimum security requirements.",
    REQUIRED_QUESTION1: "Please select a question from the list.",
    REQUIRED_ANSWER1: "Please enter Security Question answer.",
    REQUIRED_QUESTION2: "Please select Question 2.",
    REQUIRED_ANSWER2: "Please enter Security Question answer.",
    SAME_QUESTIONS: "The two questions can't be the same.",
    SAME_ANSWERS: "The two answers can't be the same.",
    INVALID_SOCIAL_SECURITY_NUMBER: "Social Security Number must contain 4 numeric values.",
    REQUIRED_SOCIAL_SECURITY_NUMBER: "This field is required.",
    MIN_LENGTH_NEW_PASSWORD: PASSWORD_VALIDATION_RULES.MIN_LENGTH_NEW_PASSWORD,
    REQUIRED_NUMERIC_IN_NEW_PASSWORD: PASSWORD_VALIDATION_RULES.REQUIRED_NUMERIC_IN_NEW_PASSWORD,
    REQUIRED_UPPERCASE_IN_NEW_PASSWORD: PASSWORD_VALIDATION_RULES.REQUIRED_UPPERCASE_IN_NEW_PASSWORD
};
// /////////////////////////////////////////////////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////////////////////////////////////////////////////

// //////////////////////////////POST-LOGIN///////////////////////////////////////////
var PHONE_DETAILS_ERROR_MESSAGES = {
    REQUIRED_PHONE_TYPE: "Please select phone number type",
    REQUIRED_PHONE_NUMBER: "Phone number required"
};
// //////////////////////////////////ABOUT
// ME/////////////////////////////////////////////////////////
var PRIMARY_PROFILE_UPDATE_SUCCESSFUL = GENERAL_UPDATE_SUCCESS;

var PRIMARY_PROFILE_ERROR_MESSAGES = {
    REQUIRED_MARTIAL_STATUS: "Please select martial status.",
    REQUIRED_FEET: "Please select feet.",
    REQUIRED_INCHES: "Please select inches.",
    REQUIRED_WEIGHT_IN_LBS: "Please enter weight.",
    INVALID_WEIGHT_IN_LBS: "Invalid weight.",
    REQUIRED_GENDER: "Please select gender."
};
// //////////////////////////////////FORGOT
// PASSWORD/////////////////////////////////////////////////////////
var FORGOT_PASSWORD_ERROR_MESSAGES = {
    MIN_LENGTH_NEW_PASSWORD: PASSWORD_VALIDATION_RULES.MIN_LENGTH_NEW_PASSWORD,
    REQUIRED_NUMERIC_IN_NEW_PASSWORD: PASSWORD_VALIDATION_RULES.REQUIRED_NUMERIC_IN_NEW_PASSWORD,
    REQUIRED_UPPERCASE_IN_NEW_PASSWORD: PASSWORD_VALIDATION_RULES.REQUIRED_UPPERCASE_IN_NEW_PASSWORD
};
// //////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////////////////////////////////PAYMENT METHODS
// /////////////////////////////////////////////////////////
var PAYMENT_METHODS_ADD_SUCCESS = "Payment Method has been added.";
var PAYMENT_METHODS_DELETE_SUCCESS = "Payment Method has been deleted.";
var PAYMENT_METHODS_UPDATE_SUCCESS = "Payment Method has been updated.";

var PAYMENT_METHODS_ERROR_MESSAGES = {
    REQUIRED_ADDRESS1: "This field is required.",
    REQUIRED_CITY: "This field is required.",
    REQUIRED_STATE: "This field is required.",
    REQUIRED_CVV: "Please Enter CVV.",
    REQUIRED_NAME_ON_CARD: "Please Enter Name on Card",
    INVALID_CVV: "Security code is invalid.",
    REQUIRED_CARD_NUMBER: "Please Enter Card Number.",
    INVALID_CARD_NUMBER: "Please enter valid Card Number.",
    REQUIRED_EXPIRE_MONTH: "Please Select Expiration Month.",
    REQUIRED_EXPIRE_YEAR: "Please Select Expiration Year.",
    REQUIRED_ZIPCODE: ZIPCODE_VALIDATION_RULES.REQUIRED_ZIPCODE,
    ZIPCODE_FORMAT: ZIPCODE_VALIDATION_RULES.ZIPCODE_FORMAT,
    ZIPCODE_INVALID: ZIPCODE_VALIDATION_RULES.ZIPCODE_INVALID
};
// //////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////PHARMACIES
// //////////////////////////////////////////////////////////////
var PHARMACIES_ADD_SUCCESS = "Pharmacy has been added.";
var PHARMACIES_DELETE_SUCCESS = "Pharmacy has been deleted.";

var PHARMACIES_ERROR_MESSAGES = {
    REQUIRED_SEARCH_TEXT: "Please enter zip code.",
    CONFLICT_ADD_PHARMACY: "This pharmacy has already been added to your preferred pharmacy list.",
    REQUIRED_PHARMACY: "Please select a pharmacy.",
    INVALID_SEARCH_TEXT: "No pharmacies found. Please search using a different zip code.",
    INVALID_LENGTH_ZIP_CODE: "Zip Code must contain 5 numeric values.",
    INVALID_US_ZIP_CODE: "Please input valid US Zip Code."
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////ALLACCESS
////////////////////////////////////////////////////////////////
var ALLACCESS_ERROR_MESSAGES = {
 REQUIRED_CUSTOMER: "Please select a Provider.",
 REQUIRED_TERMS_AND_CONDITIONS: "Please agree to the terms and conditions."
};