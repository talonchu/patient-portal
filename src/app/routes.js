var rootPrefix = location.origin + '/';
if (rootPrefix.match("localhost")) {
    // rootPrefix = 'https://stlscvmg93211' + '/';
    rootPrefix = 'http://localhost:8088' + '/';
}


var Routes = {

//------Ellihealth 
    elliHealthLogin: 'intellivisit/pc/LegacyLogin.xhtml',
    elliHealthPatientDashboard: 'intellivisit/pc/PatientRedirect.xhtml?tabName=home&username={username}',
    elliHealthHealthProfile: 'intellivisit/pc/PatientRedirect.xhtml?tabName=healthProfile&username={username}',
    elliHealthQuickVisit: 'intellivisit/pc/PatientRedirect.xhtml?tabName=quickVisit&username={username}',

//------User API

    //---- User
    user: 'user-api/user/{username}',
    userGetVerificationCode: 'user-api/user/{username}/verification-code',
    userValidateVerificationCode: 'user-api/user/{username}/validate-code/{identificationCode}',

    //---- Auth
    login: 'user-api/auth/login',
    logout: 'user-api/auth/logout',

    //---- Forgot Password
    forgotPassword: 'user-api/forgot-password/{username}',
    forgotPasswordValidateQuestion: 'user-api/forgot-password/{username}/validate-question',
    forgotPasswordCommunicationPreferences: 'user-api/forgot-password/{username}/communication-preferences',
    forgotPasswordValidateIdentificationCode: 'user-api/forgot-password/{username}/validate-code/{identificationCode}',
    forgotPasswordChangePassword: 'user-api/forgot-password/{username}/validate-code/{identificationCode}/change-password',

    //----- Password Managmenet
    changePassword: "user-api/user/{username}/password",

    //----- Registration
    questionSet: "user-api/reference/question/{setId}",
    checkUserExist: "user-api/registration/user/{email}",
    register: "patient-api/patient",
    checkZipCode: "user-api/reference/state/zipcode/{zipCode}",
    
    //------commPreferences
    contactPreference: 'user-api/communication/{username}',
    
    //-----security
    saveSecurity: '/user-api/user/{username}/question',


//------ Patient API
    //Patient
    patientInformation: 'patient-api/patient/{username}',

    //Customer
    customer: 'patient-api/patient/{username}/customer?showAllEligible={showAllEligible}',
    setCustomer: 'patient-api/patient/{username}/customer/{customerId}',
    getCustomerLogo: 'patient-api/customer/{customerId}/logo',
    
    //Pharmacies
    userPharmaciesList: 'patient-api/patient/{username}/pharmacy',
    makeDefaultPharmacy: 'patient-api/patient/{username}/pharmacy/{id}',
    deletePharmacy: 'patient-api/patient/{username}/pharmacy/{id}',
    addPharmacy: 'patient-api/patient/{username}/pharmacy',

    //Account Information
    saveAccountInformation: 'patient-api/patient/{username}/account',
    
    //About Me
    setPrimaryProfile: 'patient-api/patient/{username}/profile',
    
    //----- Post Login Steps
    getPostLoginSteps : 'patient-api/patient/{username}/where-to',

    //Avatar
    avatar: 'patient-api/patient/{username}/avatar',

//------ Payment API
    //----- Payment Methods
    card: 'payment-api/{username}/card',
    singleCard : 'payment-api/{username}/card/{id}',
  
//------ Pharmacy API
    //Pharmacies
    searchedPharmaciesList: 'pharmacy-api/pharmacy/zip/{searchText}?page={currentPage}&perPage={pageSize}',
    

    // Build URL Helper Function
    buildURL: function (route, params) {
        "use strict";
        route = rootPrefix + route;
        $.each(params, function (key, value) {
            route = route.replace('{' + key + '}', value);
        });
        return route;
    }
};



