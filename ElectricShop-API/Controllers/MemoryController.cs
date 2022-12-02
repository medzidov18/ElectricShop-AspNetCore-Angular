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
    public class MemoryController : ControllerBase
    {
        private readonly DataContext _context;

        public MemoryController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Memory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Memory>>> GetMemory()
        {
          if (_context.Memory == null)
          {
              return NotFound();
          }
            return await _context.Memory.ToListAsync();
        }

        // GET: api/Memory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Memory>> GetMemory(int id)
        {
          if (_context.Memory == null)
          {
              return NotFound();
          }
            var memory = await _context.Memory.FindAsync(id);

            if (memory == null)
            {
                return NotFound();
            }

            return memory;
        }

        // PUT: api/Memory/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMemory(int id, Memory memory)
        {
            if (id != memory.Id)
            {
                return BadRequest();
            }

            _context.Entry(memory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MemoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Memory Updated");
        }

        // POST: api/Memory
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Memory>> PostMemory(Memory memory)
        {
          if (_context.Memory == null)
          {
              return Problem("Entity set 'DataContext.Memory'  is null.");
          }
            _context.Memory.Add(memory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMemory", new { id = memory.Id }, memory);
        }

        // DELETE: api/Memory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMemory(int id)
        {
            if (_context.Memory == null)
            {
                return NotFound();
            }
            var memory = await _context.Memory.FindAsync(id);
            if (memory == null)
            {
                return NotFound();
            }

            _context.Memory.Remove(memory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MemoryExists(int id)
        {
            return (_context.Memory?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
