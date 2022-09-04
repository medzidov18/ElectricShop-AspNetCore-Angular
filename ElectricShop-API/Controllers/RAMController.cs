using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElectricShop_API;
using ElectricShop_API.Data;

namespace ElectricShop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RAMController : ControllerBase
    {
        private readonly DataContext _context;

        public RAMController(DataContext context)
        {
            _context = context;
        }

        // GET: api/RAM
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RAM>>> GetRam()
        {
          if (_context.Ram == null)
          {
              return NotFound();
          }
            return await _context.Ram.ToListAsync();
        }

        // GET: api/RAM/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RAM>> GetRAM(int id)
        {
          if (_context.Ram == null)
          {
              return NotFound();
          }
            var rAM = await _context.Ram.FindAsync(id);

            if (rAM == null)
            {
                return NotFound();
            }

            return rAM;
        }

        // PUT: api/RAM/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRAM(int id, RAM rAM)
        {
            if (id != rAM.Id)
            {
                return BadRequest();
            }

            _context.Entry(rAM).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RAMExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RAM
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RAM>> PostRAM(RAM rAM)
        {
          if (_context.Ram == null)
          {
              return Problem("Entity set 'DataContext.Ram'  is null.");
          }
            _context.Ram.Add(rAM);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRAM", new { id = rAM.Id }, rAM);
        }

        // DELETE: api/RAM/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRAM(int id)
        {
            if (_context.Ram == null)
            {
                return NotFound();
            }
            var rAM = await _context.Ram.FindAsync(id);
            if (rAM == null)
            {
                return NotFound();
            }

            _context.Ram.Remove(rAM);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RAMExists(int id)
        {
            return (_context.Ram?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
