using Core.Abstractions;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Queries
{
    public class OrderQry : IQuery<Task<IEnumerable<Order>>>
    {
        public string DateType { get; set; }
        public DateTime SelectedDate { get; set; }
        public string CustomerName { get; set; }
    }
}
