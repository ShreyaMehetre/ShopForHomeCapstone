using Microsoft.EntityFrameworkCore;

namespace ShopForHomeCApstoneApi.Models
{
    public class ShopForHomeDbContext : DbContext
    {
        public ShopForHomeDbContext(DbContextOptions<ShopForHomeDbContext> options)
            : base(options)
        {
        }

        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartItem> CartItems { get; set; } // ✅ Added CartItem Table
        public DbSet<Category> Categories { get; set; }
        public DbSet<DiscountCoupon> DiscountCoupons { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<SalesReport> SalesReports { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserCoupon> UserCoupons { get; set; }
        public DbSet<Wishlist> Wishlists { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ✅ One-to-One: Each User has only one Cart
            modelBuilder.Entity<Cart>()
                .HasOne(c => c.User)
                .WithOne(u => u.Carts)
                .HasForeignKey<Cart>(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // ✅ Many-to-Many: Cart <-> CartItem <-> Product
            modelBuilder.Entity<CartItem>()
                .HasKey(ci => ci.CartItemId); // Primary key for CartItem

            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Cart)
                .WithMany(c => c.CartItems)
                .HasForeignKey(ci => ci.CartId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CartItem>()
                .HasOne(ci => ci.Product)
                .WithMany(p => p.CartItems)
                .HasForeignKey(ci => ci.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            // ✅ Unique constraint to prevent duplicate Product in the same Cart
            modelBuilder.Entity<CartItem>()
                .HasIndex(ci => new { ci.CartId, ci.ProductId })
                .IsUnique();

            // ✅ Unique Category Name
            modelBuilder.Entity<Category>()
                .HasIndex(c => c.CategoryName)
                .IsUnique();

            // ✅ Unique Discount Coupon ID
            modelBuilder.Entity<DiscountCoupon>()
                .HasIndex(d => d.CouponId)
                .IsUnique();

            // ✅ Default values for CreatedAt fields
            modelBuilder.Entity<Order>()
                .Property(o => o.CreatedAt)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Product>()
                .Property(p => p.CreatedAt)
                .HasDefaultValueSql("getdate()");

            modelBuilder.Entity<Cart>()
                .Property(c => c.CreatedAt)
                .HasDefaultValueSql("getdate()");

            // ✅ Wishlist should have unique User-Product combinations
            modelBuilder.Entity<Wishlist>()
                .HasIndex(w => new { w.UserId, w.ProductId })
                .IsUnique();

            // ✅ UserCoupon should have unique User-Coupon combinations
            modelBuilder.Entity<UserCoupon>()
                .HasIndex(uc => new { uc.UserId, uc.CouponId })
                .IsUnique();

            // ✅ Define Role-User Relationship (One-to-Many)
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            // ✅ Seed Default Roles
            modelBuilder.Entity<Role>().HasData(
                new Role { RoleId = 1, RoleName = "Admin" },
                new Role { RoleId = 2, RoleName = "User" }
            );

            // ✅ Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, CategoryName = "Furniture" },
                new Category { CategoryId = 2, CategoryName = "Home Décor" },
                new Category { CategoryId = 3, CategoryName = "Lighting" }
            );

            // ✅ Seed Products
            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    ProductId = 1,
                    ProductName = "Wooden Dining Table",
                    Description = "Solid wood dining table with modern design.",
                    Price = 15000,
                    CategoryId = 1, // Furniture
                    StockQuantity = 20,
                    Rating = 4.5,
                    ImageUrl = "https://example.com/dining-table.jpg"
                },
                new Product
                {
                    ProductId = 2,
                    ProductName = "Decorative Wall Mirror",
                    Description = "Elegant wall mirror for home décor.",
                    Price = 3500,
                    CategoryId = 2, // Home Décor
                    StockQuantity = 30,
                    Rating = 4.2,
                    ImageUrl = "https://example.com/wall-mirror.jpg"
                },
                new Product
                {
                    ProductId = 3,
                    ProductName = "LED Ceiling Light",
                    Description = "Energy-efficient LED ceiling light.",
                    Price = 2200,
                    CategoryId = 3, // Lighting
                    StockQuantity = 50,
                    Rating = 4.8,
                    ImageUrl = "https://example.com/led-light.jpg"
                }
            );
        }
    }
}
