using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using ElectricShop_API;
using ElectricShop_API.Controllers;
using FakeItEasy;
using ElectricShop_Test_Api;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;

namespace ElectricShop_Test_Api.Controller
{
    public class DevicesControllerTests : MockDatabase
    {
        static MockDatabase _database = new MockDatabase();

        [Fact]
        public async void DevicesController_GetDevices_ReturnDevices()
        {
            //Arrange
            var devices = A.Fake<ICollection<Device>>();
            var devicesList = A.Fake<IList<Device>>();
            var dbContext = await _database.GetDatabaseContext();
            var controller = new DevicesController(dbContext);

            //Act
            var result = controller.GetDevices();

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<Task<ActionResult<IEnumerable<Device>>>>();
        }

        [Fact]
        public async void DevicesController_GetDevicesWithCategory_ReturnDevicesWithCategory()
        {
            //Arrange
            int CategoryId = 1;
            var devices = A.Fake<ICollection<Device>>();
            var devicesList = A.Fake<IList<Device>>();
            var dbContext = await _database.GetDatabaseContext();
            var controller = new DevicesController(dbContext);

            //Act
            var result = controller.GetDevicesWithCategory(CategoryId);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<Task<ActionResult<IEnumerable<Device>>>>();
        }

        [Fact]
        public async void DevicesController_GetDevice_ReturnOneDevice()
        {
            //Arrange
            int deviceId = 1;
            var dbContext = await _database.GetDatabaseContext();
            var controller = new DevicesController(dbContext);

            //Act
            var result = controller.GetDevice(deviceId);

            //Assert
            result.Should().NotBeNull();
            Assert.IsType<ActionResult<Device>>(result.Result);
        }

        [Fact]
        public async void DevicesController_DeleteDevice_DeleteDevice()
        {
            //Arrange
            int deviceId = 1;
            var dbContext = await _database.GetDatabaseContext();
            var controller = new DevicesController(dbContext);

            //Act
            var result = await controller.DeleteDevice(deviceId);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NoContentResult>();
        }

        [Fact]
        public async void DevicesController_PutDevice_UpdateDevice()
        {
            //Arrange
            int deviceId = 1;
            var dbContext = await _database.GetDatabaseContext();
            var controller = new DevicesController(dbContext);
            var device = dbContext.Devices.Find(deviceId);

            //Act
            var result = await controller.PutDevice(deviceId, device);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<NoContentResult>();
        }

        [Fact]
        public async void DevicesController_PostDevice_CreatingNewDevice()
        {
            //Arrange
            var device = new Device
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
            };
            var dbContext = await _database.GetDatabaseContext();
            var controller = new DevicesController(dbContext);

            //Act
            var result = await controller.PostDevice(device);

            //Assert
            result.Should().NotBeNull();
            result.Should().BeOfType<ActionResult<Device>>();
        }
    }
}
