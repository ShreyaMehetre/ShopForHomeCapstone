using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopForHomeCApstoneApi.Models;

public partial class Order
{    [Required]
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int OrderId { get; set; }
    [Required]
    [ForeignKey("UserId")]
    public int UserId { get; set; }
    [Required]
    public decimal TotalAmount { get; set; }
    [Required]
    public decimal? DiscountAmount { get; set; }
    [Required]
    public decimal FinalAmount { get; set; }

    public string? OrderStatus { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual User User { get; set; } = null!;
}
