using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using ElectricShop_API.Data;
using ElectricShop_API.Services.AdminUserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ElectricShop_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAdminUserService _adminUserService;
        private readonly DataContext _context;

        public AuthController(IConfiguration configuration, IAdminUserService adminUserService, DataContext context)
        {
            _configuration = configuration;
            _adminUserService = adminUserService;
            _context = context;
        }

        [HttpGet, Authorize]
        public ActionResult<string> GetMe()
        {
            var userName = _adminUserService.GetMyName();
            return Ok(userName);
        }

        [HttpPost("register")]
        public async Task<ActionResult<AdminUser>> Register(AdminUserDto request)
        {
            AdminUser adminUser = new AdminUser();
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            adminUser.Username = request.Username;
            adminUser.PasswordHash = passwordHash;
            adminUser.PasswordSalt = passwordSalt;

            _context.AdminUsers.Add(adminUser);
            await _context.SaveChangesAsync();

            return Ok(adminUser);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(AdminUserDto request)
        {
            var adminUser = await _context.AdminUsers.FindAsync(request.Username);
            if (adminUser.Username != request.Username)
            {
                return BadRequest("User not found.");
            }

            if (!VerifyPasswordHash(request.Password, adminUser.PasswordHash, adminUser.PasswordSalt))
            {
                return BadRequest("Wrong password.");
            }

            string token = CreateToken(adminUser);

            return Ok(token);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAdminUser(string userName)
        {
            var adminUser = _context.AdminUsers.Find(userName);

            if (_context.AdminUsers == null)
            {
                return NotFound();
            }
            if (adminUser == null)
            {
                return NotFound();
            }

            _context.AdminUsers.Remove(adminUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private string CreateToken(AdminUser user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, "Admin")
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
