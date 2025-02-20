using System;
using System.Collections.Generic;

namespace ShopForHomeCApstoneApi.Models;

public partial class StockAlert
{
    public int AlertId { get; set; }

    public int ProductId { get; set; }

    public int StockLevel { get; set; }

    public string? AlertStatus { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Product Product { get; set; } = null!;
}
