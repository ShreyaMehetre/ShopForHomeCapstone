using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ShopForHomeCApstoneApi.Models;

public class Role
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int RoleId { get; set; }  // Primary Key
    [Required]
    public string RoleName { get; set; }  // Admin, User, etc.

    // Navigation Property
    public virtual ICollection<User> Users { get; set; }
}
