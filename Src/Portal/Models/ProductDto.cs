namespace Portal.Models
{
    public class ProductDto
    {
        public string ProductName { get; set; }
        public string ProductNumber { get; set; }
        public int OrderQty { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal UnitPriceDiscount { get; set; }
        public decimal LineTotal { get; set; }
    }
}