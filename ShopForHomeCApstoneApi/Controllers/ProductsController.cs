using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShopForHomeCApstoneApi.Models;

namespace ShopForHomeCApstoneApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ShopForHomeDbContext _context;

        public ProductsController(ShopForHomeDbContext context)
        {
            _context = context;
        }

        // ✅ GET: api/Products - Get All Products (No Filtering)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetProducts()
        {
            if (_context.Products == null)
                return NotFound("No products found.");

            var products = await _context.Products
                                         .Include(p => p.Category) // ✅ Include category details
                                         .Select(p => new
                                         {
                                             p.ProductId,
                                             p.ProductName,
                                             p.Description,
                                             p.Price,
                                             p.Rating,
                                             p.StockQuantity,
                                             CategoryName = p.Category.CategoryName, // ✅ Fetch Category Name
                                             p.ImageUrl,
                                             p.CreatedAt
                                         })
                                         .ToListAsync();

            return Ok(products);
        }

        // ✅ GET: api/Products/5 - Get Single Product by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetProduct(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .Where(p => p.ProductId == id)
                .Select(p => new
                {
                    p.ProductId,
                    p.ProductName,
                    p.Description,
                    p.Price,
                    p.Rating,
                    p.StockQuantity,
                    CategoryName = p.Category.CategoryName,
                    p.ImageUrl,
                    p.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (product == null)
                return NotFound($"Product with ID {id} not found.");

            return Ok(product);
        }

        // ✅ POST: api/Products - Add a New Product
        
        [HttpPost]
        // ✅ POST: api/Products - Add a New Product
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            if (_context.Products == null)
                return Problem("Entity set 'ShopForHomeDbContext.Products' is null.");

            // ✅ Check if Product Name Already Exists
            if (await _context.Products.AnyAsync(p => p.ProductName == product.ProductName))
                return BadRequest("Product with this name already exists.");

            // ✅ Ensure `CategoryId` is valid
            var category = await _context.Categories.FindAsync(product.CategoryId);
            if (category == null)
                return BadRequest("Invalid CategoryId. Category does not exist.");

            // ✅ Remove Category Navigation Property to prevent validation errors
            product.Category = null;

            // ✅ Set default values
            product.CreatedAt = DateTime.UtcNow;

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // ✅ Return response with Category Name
            var response = new
            {
                product.ProductId,
                product.ProductName,
                product.Description,
                product.Price,
                product.Rating,
                product.StockQuantity,
                CategoryName = category.CategoryName, // ✅ Now returning CategoryName
                product.ImageUrl,
                product.CreatedAt
            };

            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, response);
        }



        // ✅ DELETE: api/Products/5 - Hard Delete Product
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound($"Product with ID {id} not found.");

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok($"Product ID {id} deleted successfully.");
        }

        [HttpGet("ByCategory/{categoryId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetProductsByCategory(int categoryId)
        {
            var products = await _context.Products
                                         .Where(p => p.CategoryId == categoryId)
                                         .Include(p => p.Category)
                                         .Select(p => new
                                         {
                                             p.ProductId,
                                             p.ProductName,
                                             p.Description,
                                             p.Price,
                                             p.Rating,
                                             p.StockQuantity,
                                             CategoryName = p.Category.CategoryName,
                                             p.ImageUrl,
                                             p.CreatedAt
                                         })
                                         .ToListAsync();

            return Ok(products);
        }

        // ✅ GET: api/Products/Filter - Filter Products by Rating and Category
        [HttpGet("Filter")]
        public async Task<ActionResult<IEnumerable<object>>> GetFilteredProducts(
            [FromQuery] int? categoryId = null,
            [FromQuery] double? minRating = null)
        {
            var query = _context.Products.Include(p => p.Category).AsQueryable();

            if (categoryId.HasValue)
                query = query.Where(p => p.CategoryId == categoryId.Value);
            if (minRating.HasValue)
                query = query.Where(p => p.Rating >= minRating.Value);

            var products = await query.Select(p => new
            {
                p.ProductId,
                p.ProductName,
                p.Description,
                p.Price,
                p.Rating,
                p.StockQuantity,
                CategoryName = p.Category.CategoryName,
                p.ImageUrl,
                p.CreatedAt
            }).ToListAsync();

            return Ok(products);
        }


        // ✅ PUT: api/Products/5 - Update an Existing Product
        // ✅ PUT: api/Products/{id} - Update Product
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, [FromBody] Product updatedProduct)
        {
            if (updatedProduct == null)
                return BadRequest("Invalid product data.");

            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
                return NotFound($"Product with ID {id} not found.");

            // ✅ Validate Category ID
            var category = await _context.Categories.FindAsync(updatedProduct.CategoryId);
            if (category == null)
                return BadRequest("Invalid CategoryId. Category does not exist.");

            // ✅ Update fields from the request
            existingProduct.ProductName = updatedProduct.ProductName;
            existingProduct.Description = updatedProduct.Description;
            existingProduct.Price = updatedProduct.Price;
            existingProduct.Rating = updatedProduct.Rating;
            existingProduct.StockQuantity = updatedProduct.StockQuantity;
            existingProduct.CategoryId = updatedProduct.CategoryId;
            existingProduct.ImageUrl = updatedProduct.ImageUrl;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Error updating product. Please try again.");
            }

            // ✅ Return response with Category Name
            var response = new
            {
                existingProduct.ProductId,
                existingProduct.ProductName,
                existingProduct.Description,
                existingProduct.Price,
                existingProduct.Rating,
                existingProduct.StockQuantity,
                CategoryName = category.CategoryName, // ✅ Generate Category Name Automatically
                existingProduct.ImageUrl,
                existingProduct.CreatedAt
            };

            return Ok(response);
        }


        [HttpGet("LowStock")]
        public async Task<ActionResult<IEnumerable<Product>>> GetLowStockProducts()
        {
            var lowStockProducts = await _context.Products
                                                 .Where(p => p.StockQuantity < 10)
                                                 .ToListAsync();

            return Ok(lowStockProducts);
        }
        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
