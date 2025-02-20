using System;
using System.Collections.Generic;

namespace ShopForHomeCApstoneApi.Models;

public partial class SalesReport
{
    public int ReportId { get; set; }

    public DateTime ReportPeriodStart { get; set; }

    public DateTime ReportPeriodEnd { get; set; }

    public decimal TotalSales { get; set; }

    public DateTime? GeneratedAt { get; set; }
}
