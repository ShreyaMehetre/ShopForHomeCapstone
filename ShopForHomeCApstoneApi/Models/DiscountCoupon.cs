using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ShopForHomeCApstoneApi.Models;

public partial class DiscountCoupon
{
    [Key]
    [Required]
    public int CouponId { get; set; }

    [Required]
    public decimal? DiscountPercentage { get; set; }
    [Required]
    public DateTime ExpiryDate { get; set; }
    [Required]
    public bool? IsActive { get; set; }

    public virtual ICollection<UserCoupon> UserCoupons { get; set; } = new List<UserCoupon>();
}
