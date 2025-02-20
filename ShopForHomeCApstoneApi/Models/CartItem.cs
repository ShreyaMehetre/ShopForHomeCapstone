using ShopForHomeCApstoneApi.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class CartItem
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CartItemId { get; set; }

    [Required]
    [ForeignKey("Cart")]
    public int CartId { get; set; } // Links to a single cart

    [Required]
    [ForeignKey("Product")]
    public int ProductId { get; set; } // Links to a single product

    [Required]
    public int Quantity { get; set; } // Quantity of this product in the cart

    // Navigation properties
    public virtual Cart Cart { get; set; } = null!;
    public virtual Product Product { get; set; } = null!;
}
