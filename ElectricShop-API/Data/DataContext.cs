using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ElectricShop_API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<Device> DevicesInCart { get; set; }
        public DbSet<RAM> Ram { get; set; }
        public DbSet<Memory> Memory { get; set; }
        public DbSet<AdminUser> AdminUsers { get; set; }
    }
}
