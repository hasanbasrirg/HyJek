function wlCommonInit(){

}

function getSecretData(){
  var resourceRequest = new WLResourceRequest("/adapters/DoubleStepAuthAdapter/getSecretData", WLResourceRequest.GET, 30000);
  resourceRequest.send().then(
    getSecretData_CallbackOK,
    getSecretData_CallbackFail
  );
}

function getSecretData_CallbackOK(response){
  $("#ResponseDiv").html(JSON.stringify(response.responseJSON));
}

function getSecretData_CallbackFail(response){
  $("#ResponseDiv").html(JSON.stringify(response.responseJSON));
}
