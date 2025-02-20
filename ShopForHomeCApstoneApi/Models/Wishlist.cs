using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopForHomeCApstoneApi.Models;

public partial class Wishlist
{
    [Required]
    [Key]
    public int WishlistId { get; set; }
    [Required]
    [ForeignKey("UserId")]
    public int UserId { get; set; }
    [Required]
    [ForeignKey("ProductId")]
    public int ProductId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Product Product { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
