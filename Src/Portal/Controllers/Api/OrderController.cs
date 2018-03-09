using Core.Abstractions;
using Core.Entities;
using Core.Queries;
using Portal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace Portal.Controllers.Api
{
    [RoutePrefix("services/v1")]
    public class OrderController : ApiController
    {
        IQueryHandler<OrderQry, Task<IEnumerable<Order>>> handler;
        public OrderController(IQueryHandler<OrderQry, Task<IEnumerable<Order>>> handler)
        {
            this.handler = handler;
        }

        [Route("orders")]
        [HttpGet]
        public async Task<IHttpActionResult> Get(string customername, string datetype, DateTime date)
        {
            var orders = await handler.Handle(new OrderQry() { CustomerName = customername, DateType = datetype, SelectedDate = date});

            var results = orders.GroupBy((o) => o.SalesOrderID).Select(og =>
            {
                int cnt = 0;
                var dto = new OrderDto() { Products = new List<ProductDto>() };
                foreach (var g in og)
                {
                    if (cnt == 0)
                    {
                        dto.SalesOrderID = g.SalesOrderID;
                        dto.FirstName = g.FirstName;
                        dto.MiddleName = g.MiddleName;
                        dto.LastName = g.LastName;
                        dto.AccountNumber = g.AccountNumber;
                        dto.AddressLine1 = g.AddressLine1;
                        dto.AddressLine2 = g.AddressLine2;
                        dto.City = g.City;
                        dto.StateProvinceCode = g.StateProvinceCode;
                        dto.PostalCode = g.PostalCode;
                        dto.ShipMethod = g.ShipMethod;
                        dto.SubTotal = g.SubTotal;
                        dto.TaxAmt = g.TaxAmt;
                        dto.Freight = g.Freight;
                        dto.TotalDue = g.TotalDue;
                    }

                    dto.Products.Add(new ProductDto()
                    {
                        ProductName = g.ProductName,
                        ProductNumber = g.ProductNumber,
                        OrderQty = g.OrderQty,
                        UnitPrice = g.UnitPrice,
                        UnitPriceDiscount = g.UnitPriceDiscount,
                        LineTotal = g.LineTotal
                    });

                    cnt++;
                }
                return dto;
            });

            return Json(results);
        }
    }
}
