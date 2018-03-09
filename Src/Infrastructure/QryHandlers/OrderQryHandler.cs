using Core.Abstractions;
using Core.Entities;
using Core.Queries;
using Dapper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Infrastructure.QryHandlers
{
    public class OrderQryHandler : IQueryHandler<OrderQry, Task<IEnumerable<Order>>>
    {
        readonly string connectionString;
        public OrderQryHandler(IOptions<OrderQryHandlerOptions> options)
        {
            this.connectionString = options.Value.ConnectionString;
        }
        public async Task<IEnumerable<Order>> Handle(OrderQry query)
        {
            var conn = new SqlConnection(connectionString);
            try
            {
                var p = new DynamicParameters();
                p.Add("@dateType", query.DateType, dbType: DbType.String, direction: ParameterDirection.Input);
                p.Add("@date", query.SelectedDate, dbType: DbType.Date, direction: ParameterDirection.Input);
                p.Add("@searchTerm", query.CustomerName, dbType: DbType.String, direction: ParameterDirection.Input);
                return await conn.QueryAsync<Order>("uspSalesOrderSearch", p, commandTimeout: 240, commandType: CommandType.StoredProcedure);
            }
            finally
            {
                conn?.Dispose();               
            }
        }
    }
}
