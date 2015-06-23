var busyIndicator = null;
var citiesList = null;

function wlCommonInit(){
  busyIndicator = new WL.BusyIndicator("AppBody");
  $('#citiesList').change(citySelectionChange);
  getCitiesList();
}

function getCitiesList() {
  busyIndicator.show();
  var resourceRequest = new WLResourceRequest("/adapters/SqlWeather/getCitiesWeather", WLResourceRequest.GET, 30000);
  resourceRequest.send().then(
    getCitiesListSuccess,
    getCitiesListFailure
  );

  /*
  var invocationData = {
      adapter:    'SqlWeather',
      procedure:  'getCitiesWeather',
  };
  WL.Client.invokeProcedure(invocationData,{
      onSuccess : getCitiesListSuccess,
      onFailure : getCitiesListFailure
  });
  */
}

function getCitiesListSuccess(response) {
  if (response.responseJSON.resultSet.length == 0)
    getCitiesListFailure();
  else {
    citiesList = response.responseJSON.resultSet;
    fillCitiesList();
  }
}

function getCitiesListFailure(response) {
  WL.Logger.debug("CityWeather::getCitiesListFailure");
  busyIndicator.hide();
  WL.SimpleDialog.show("CityWeather",
    "Can't get cities list. Check database connection", [{
      text : 'Reload app',
      handler : WL.Client.reloadApp
    }]
  );
}

function fillCitiesList(){
  $('#citiesList').empty();
  for (var i = 0; i < citiesList.length; i++) {
    var elem = $("<option/>").html(citiesList[i].city);
    $('#citiesList').append(elem);
  }
  busyIndicator.hide();
  citySelectionChange();
}

function citySelectionChange() {
  var index = $('#citiesList').prop("selectedIndex");
  var citySumm = citiesList[index].summary;
  var cityWeather = citiesList[index].weather;
  $('#info').html(cityWeather + "<br>" + citySumm.slice(0, 200) + "...");
}
