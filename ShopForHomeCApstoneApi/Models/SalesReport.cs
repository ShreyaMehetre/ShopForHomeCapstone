using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopForHomeCApstoneApi.Models;

public partial class SalesReport
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int ReportId { get; set; }
    [Required]
    public DateTime ReportPeriodStart { get; set; }
    [Required]
    public DateTime ReportPeriodEnd { get; set; }
    
    public decimal TotalSales { get; set; }
    [Required]
    public DateTime? GeneratedAt { get; set; }
}
