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

        public CartController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Device>>> GetDevicesInCart()
        {
            if (_context.DevicesInCart == null)
            {
                return NotFound();
            }
            return await _context.Devices.ToListAsync();
        }

        // GET: api/Devices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Device>> GetDeviceInCart(int id)
        {
            if (_context.Devices == null)
            {
                return NotFound();
            }
            var device = await _context.DevicesInCart.FindAsync(id);

            if (device == null)
            {
                return NotFound();
            }

            return device;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDeviceInCart(int id, Device device)
        {
            if (id != device.Id)
            {
                return BadRequest();
            }
            await _context.DevicesInCart.AddAsync(device);

            return NoContent();
        }

        private bool DeviceExists(int id)
        {
            return (_context.Devices?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}