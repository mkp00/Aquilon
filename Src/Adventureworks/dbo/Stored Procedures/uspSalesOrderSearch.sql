USE Northwind
GO
CREATE PROCEDURE [dbo].[uspSalesOrderSearch]
	@dateType VARCHAR(10),
	@date DATE,
	@searchTerm nvarchar(128)
AS
DECLARE @params nvarchar(256) = '@date Date, @searchTerm nvarchar(128)'
DECLARE @sql nvarchar(max) = 'WITH search (Term) AS (SELECT ''%'' + value + ''%'' AS Term FROM (SELECT value FROM string_split(RTRIM(LTRIM(@searchTerm)), '' '')) splt)
SELECT so.SalesOrderID
,p.FirstName
,COALESCE(p.MiddleName, '''') AS MiddleName
,p.LastName
,COALESCE(so.AccountNumber, '''') AS AccountNumber
,a.AddressLine1
,COALESCE(a.AddressLine2, '''') AS AddressLine2
,a.City
,sp.StateProvinceCode
,a.PostalCode
,sm.Name AS ShipMethod
,SubTotal
,TaxAmt
,Freight
,TotalDue
,prod.Name AS ProductName
,prod.ProductNumber
,od.OrderQty
,od.UnitPrice
,od.UnitPriceDiscount
,od.LineTotal
FROM Northwind.Sales.SalesOrderHeader so
INNER JOIN Northwind.Sales.Customer c
ON so.CustomerID = c.CustomerID
INNER JOIN Northwind.Person.Person p
ON c.PersonID = p.BusinessEntityID
INNER JOIN Northwind.Purchasing.ShipMethod sm
ON sm.ShipMethodID = so.ShipMethodID
INNER JOIN Northwind.Person.Address a
ON a.AddressID = so.ShipToAddressID
INNER JOIN Northwind.Person.StateProvince sp
ON a.StateProvinceID = sp.StateProvinceID
INNER JOIN Northwind.Sales.SalesOrderDetail od
ON so.SalesOrderID = od.SalesOrderID
INNER JOIN Northwind.Production.Product prod
ON prod.ProductID = od.ProductID
WHERE so.OrderDate = @date AND (p.FirstName IN (SELECT FirstName FROM Northwind.Person.Person p INNER JOIN search AS s ON p.FirstName LIKE s.Term) OR p.LastName IN (SELECT LastName FROM Northwind.Person.Person p INNER JOIN search AS s ON p.LastName LIKE s.Term))
ORDER BY SalesOrderID'
IF @dateType = 'due'
SET @sql = REPLACE(@sql, 'so.OrderDate', 'so.DueDate')
IF @dateType = 'ship'
SET @sql = REPLACE(@sql, 'so.OrderDate', 'so.ShipDate')

EXECUTE sp_executesql @sql, @params, @date, @searchTerm
RETURN
GO