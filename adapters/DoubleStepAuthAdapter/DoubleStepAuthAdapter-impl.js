/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

var userIdentity;

function onAuthRequired(headers, errorMessage){
  errorMessage = errorMessage ? errorMessage : null;
  return {
    authRequired: true,
    authStep: 1,
    errorMessage: errorMessage
  };
}

function submitAuthStep1(username, password){
  if (username === "user" && password === "user"){
    WL.Logger.debug("Step 1 :: SUCCESS");
    userIdentity = {
        userId: username,
        displayName: username,
        attributes: {}
    };

    return {
      authRequired: true,
      authStep: 2,
      question: "What is your pet's name?",
      errorMessage : ""
    };

  }

  else{
    WL.Logger.debug("Step 1 :: FAILURE");
    return onAuthRequired(null, "Invalid login credentials");
  }
}

function submitAuthStep2(answer){
  if (answer === "Lassie"){
    WL.Logger.debug("Step 2 :: SUCCESS");
    WL.Server.setActiveUser("DoubleStepAuthRealm", userIdentity);
    WL.Logger.debug("Authorized access granted");

    return {
      authRequired: false
    };
  }

  else{
    WL.Logger.debug("Step 2 :: FAILURE");
    return onAuthRequired(null, "Wrong security question answer");
  }

}

function getSecretData(){
  return {
    secretData: "Very very very very secret data"
  };
}

function onLogout(){
  WL.Logger.debug("Logged out");
}
