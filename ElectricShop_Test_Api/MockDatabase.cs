using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ElectricShop_API;
using ElectricShop_API.Data;
using Microsoft.EntityFrameworkCore;

namespace ElectricShop_Test_Api
{
    public class MockDatabase
    {
        public async Task<DataContext> GetDatabaseContext()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var databaseContext = new DataContext(options);
            databaseContext.Database.EnsureCreated();
            if (await databaseContext.Devices.CountAsync() <= 0)
            {
                for (int i = 0; i < 10; i++)
                {
                    databaseContext.Devices.Add(
                        new Device
                        {
                            Name = "Asus Vivobook",
                            Price = 1700,
                            Image = "https://items.s1.citilink.ru/1523022_v11_b.jpg",
                            ShortDescription = "my laptop",
                            FullDescription = "myyyy laptoooop",
                            CategoryId = 1,
                            RAM_ID = 1,
                            MemoryId = 1,
                            Amount = 1
                        });
                    await databaseContext.SaveChangesAsync();
                }
            }
            return databaseContext;
        }
    }
}
