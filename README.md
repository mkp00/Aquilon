Technologies:
  Visual Studio 2017,
  .NET 4.7,
  TypeScript 2.7,
  Angularjs 1.6,
  Node 9.7.1,
  NPM 5.7.1,
  Sql Server 2016,
  
  WebPack for module loading. Distribution files and node_modules are included in repo otherwise have to build from command line:
  'npm run build' 
  
  Stored procedure is in Adventurworks project, /dbo/Stored Procedures/ folder and is named uspSalesOrderSearch.
  
  Caveats:
  Need Identity server for login.; 
  WebApi needs LoggingFilter and ExceptionFilter.; 
  Need instrumentation for client side. Currently using alert and console. Application insights and toastr would be preferable.; 
  Need further testing of JwtAthenticationFilter. Wrote code but did not apply filter to the OrdersController.;  
  Tested app with OrderDate = '2014-06-30', CustomerName = 'Van', DateType = 'order'. Need futher testing with other date type (ship, due)
  Did not add pagination to the Orders Detail table and no max record count applied to query so potential for memory overflow for nonspecific query resulting in many values. i.e. '2014-06-30', CustomerName = 'a', DateType = 'order'
