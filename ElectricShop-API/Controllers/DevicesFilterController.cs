using ElectricShop_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElectricShop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevicesFilterController : ControllerBase
    {
        private readonly DataContext _context;

        public DevicesFilterController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("filterByCategory/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Device>>> GetDevicesWithCategory(int categoryId)
        {
            if (_context.Devices == null)
            {
                return NotFound();
            }

            return await _context.Devices.Where(x => x.CategoryId == categoryId).ToListAsync();
        }

        [HttpGet("filterByRam/{ram_Id}")]
        public async Task<ActionResult<IEnumerable<Device>>> GetDevicesWithRam(int ram_Id)
        {
            if (_context.Devices == null)
            {
                return NotFound();
            }

            return await _context.Devices.Where(x => x.RAM_ID == ram_Id).ToListAsync();
        }

        [HttpGet("filterByMemory/{memoryId}")]
        public async Task<ActionResult<IEnumerable<Device>>> GetDevicesWithMemory(int memoryId)
        {
            if (_context.Devices == null)
            {
                return NotFound();
            }

            return await _context.Devices.Where(x => x.MemoryId == memoryId).ToListAsync();
        }

        [HttpGet("filterByPrice/{minPrice}/{maxPrice}")]
        public async Task<ActionResult<IEnumerable<Device>>> GetDevicesWithPrice(int minPrice, int maxPrice)
        {
            if (_context.Devices == null)
            {
                return NotFound();
            }

            return await _context.Devices.Where(x => x.Price >= minPrice).Where(c => c.Price <= maxPrice).ToListAsync();
        }
    }
}
