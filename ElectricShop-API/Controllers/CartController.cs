using ElectricShop_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElectricShop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly DataContext _context;

        public CartController( DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartDevices>>> GetDevices()
        {
            if (_context.CartTable == null)
            {
                return NotFound();
            }
            return await _context.CartTable.ToListAsync();
        }

        [HttpPut("addToCart/{id}")]
        public async Task<IActionResult> PutDeviceInCart(int id)
        {
            var device = _context.Devices.Find(id);

            if (id != device.Id)
            {
                return BadRequest();
            }

            var newCartDevice = new CartDevices
            {
                Name = device.Name,
                Price = device.Price,
                Image = device.Image,
                ShortDescription = device.ShortDescription,
                FullDescription = device.FullDescription,
                CategoryId = device.CategoryId,
                RAM_ID = device.RAM_ID,
                MemoryId = device.MemoryId,
                Amount = device.Amount
            };

            _context.CartTable.Add(newCartDevice);
            GetTotalPrice();
            await _context.SaveChangesAsync();

            return Ok(newCartDevice);
        }

        [HttpGet("getTotalPrice")]
        public async Task<IActionResult> GetTotalPrice()
        {
            var totalPrice = _context.CartTable.ToList().Sum(p => p.Price);

            return Ok(totalPrice);
        }

        [HttpDelete("removeCartItem/{id}")]
        public async Task<IActionResult> DeleteDevice(int id)
        {
            if (_context.CartTable == null)
            {
                return NotFound();
            }
            var device = await _context.CartTable.FindAsync(id);
            if (device == null)
            {
                return NotFound();
            }

            _context.CartTable.Remove(device);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("removeAllCart")]
        public async Task<IActionResult> DeleteAllCart(int id)
        {
            if (_context.CartTable == null)
            {
                return NotFound();
            }

            var devices = await _context.CartTable.ToListAsync();

            foreach (var device in devices)
            {
                if (device == null)
                {
                    return NotFound();
                }

                _context.CartTable.Remove(device);
            }
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
