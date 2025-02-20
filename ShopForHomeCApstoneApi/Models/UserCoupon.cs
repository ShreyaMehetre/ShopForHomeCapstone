using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopForHomeCApstoneApi.Models;

public partial class UserCoupon
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Required]
    public int UserCouponId { get; set; }
    [Required]
    [ForeignKey("UserId")]
    public int UserId { get; set; }
    [Required]
    [ForeignKey("CouponId")]
    public int CouponId { get; set; }
    [Required]
    public bool? IsUsed { get; set; }
    [Required]
    public DateTime? AssignedAt { get; set; }

    public virtual DiscountCoupon Coupon { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
