/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

function getCitiesWeather(){
  var cityList = getCitiesList();
  for (var i = 0; i < cityList.resultSet.length; i++) {
    var yahooWeatherData = getCityWeather(cityList.resultSet[i].identifier);

    if (yahooWeatherData.isSuccessful)
      cityList.resultSet[i].weather = yahooWeatherData.rss.channel.item.description;
  }
  return cityList;
}

var getCitiesListStatement = WL.Server.createSQLStatement("select city, identifier, summary from weather;");

function getCitiesList() {
  return WL.Server.invokeSQLStatement({
    preparedStatement : getCitiesListStatement,
    parameters : []
  });
}

function getCityWeather(woeid){
  return WL.Server.invokeProcedure({
    adapter : 'HttpWeather',
    procedure : 'getYahooWeather',
    parameters : [woeid]
  });
}
