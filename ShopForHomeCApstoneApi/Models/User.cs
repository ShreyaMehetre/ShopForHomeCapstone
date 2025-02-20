using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopForHomeCApstoneApi.Models;

public partial class User
{   
    [Key]
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int UserId { get; set; }
    [Required]
    public string FullName { get; set; } = null!;
    [EmailAddress]
    public string Email { get; set; } = null!;
    [Required]
    public string PasswordHash { get; set; } = null!;
    [Required]
    [ForeignKey("RoleId")]
    public int RoleId { get; set; }
   

    public DateTime? CreatedAt { get; set; }

    public virtual Role Role { get; set; }

    public virtual Cart? Carts { get; set; } 

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<UserCoupon> UserCoupons { get; set; } = new List<UserCoupon>();

    public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
}
