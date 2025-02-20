using System;
using System.Collections.Generic;

namespace ShopForHomeCApstoneApi.Models;

public partial class DiscountCoupon
{
    public int CouponId { get; set; }

    public string Code { get; set; } = null!;

    public decimal? DiscountPercentage { get; set; }

    public DateTime ExpiryDate { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<UserCoupon> UserCoupons { get; set; } = new List<UserCoupon>();
}
