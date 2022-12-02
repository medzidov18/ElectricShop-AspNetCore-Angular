using ElectricShop_API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ElectricShop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartnersController : ControllerBase
    {
        private readonly DataContext _context;

        public PartnersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partners>>> GetPartners()
        {
            if (_context.Partners == null)
            {
                return BadRequest("Partners table is empty");
            }

            return Ok(await _context.Partners.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Partners>> GetPartner(int id)
        {
            if (_context.Partners == null)
            {
                return BadRequest("Partners table is empty");
            }

            var partner = await _context.Partners.FindAsync(id);

            if (partner == null)
            {
                return BadRequest("Partner is not found");
            }

            return partner;
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UdpatePartner(int id, Partners partner)
        {
            if (id != partner.Id)
            {
                return BadRequest("Wrong id");
            }

            _context.Entry(partner).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartnersExists(id))
                {
                    return BadRequest("Partners not found");
                }
                else
                {
                    throw;
                }
            }

            return Ok("Partners Updated");
        }

        [HttpPost]
        public async Task<ActionResult<Partners>> PostPartner(Partners partner)
        {
            if (_context.Partners == null)
            {
                return Problem("Entity Partners is null.");
            }

            _context.Partners.Add(partner);

            await _context.SaveChangesAsync();

            return Ok($"Partner is added to the database");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletepartner(int id)
        {
            if (_context.Partners == null)
            {
                return BadRequest("Partners table is empty");
            }
            var partner = await _context.Partners.FindAsync(id);
            
            if (partner == null)
            {
                return BadRequest("Partner is not found");
            }

            _context.Partners.Remove(partner);

            await _context.SaveChangesAsync();

            return Ok("Partner is deleted from database");
        }

        private bool PartnersExists(int id)
        {
            return (_context.Partners?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
