/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

//Create SQL query
var getAccountsTransactionsStatement = WL.Server.createSQLStatement( 
  "SELECT transactionId, fromAccount, toAccount, transactionDate, transactionAmount, transactionType " + 
  "FROM accounttransactions " + 
  "WHERE accounttransactions.fromAccount = ? OR accounttransactions.toAccount = ? " +
  "ORDER BY transactionDate DESC " + 
  "LIMIT 20;"
);

//Invoke prepared SQL query and return invocation result  
function getAccountTransactions1(accountId){
  return WL.Server.invokeSQLStatement({
    preparedStatement : getAccountsTransactionsStatement,
    parameters : [accountId, accountId]
  });
}


//Invoke stored SQL procedure and return invocation result
function getAccountTransactions2(accountId){
  return WL.Server.invokeSQLStoredProcedure({
    procedure : "getAccountTransactions",
    parameters : [accountId]
    
  });
}

/************************************************************************
 * Implementation code for procedure - 'procedure1'
 *
 *
 * @return - invocationResult
 */
/* 
var procedure1Statement = WL.Server.createSQLStatement("select COLUMN1, COLUMN2 from TABLE1 where COLUMN3 = ?");
function procedure1(param) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : procedure1Statement,
		parameters : [param]
	});
}
*/
/************************************************************************
 * Implementation code for procedure - 'procedure2'
 *
 *
 * @return - invocationResult
 */
/* 
function procedure2(param) {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : "storedProcedure2",
		parameters : [param]
	});
}
*/
