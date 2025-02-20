using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopForHomeCApstoneApi.Models;

public partial class OrderItem
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int OrderItemId { get; set; }
    [Required]
    [ForeignKey("OrderId")]
    public int OrderId { get; set; }
    [Required]
    [ForeignKey("ProductId")]
    public int ProductId { get; set; }
    [Required]

    public int? Quantity { get; set; }
    [Required]

    public decimal Price { get; set; }


    public virtual Order Order { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
