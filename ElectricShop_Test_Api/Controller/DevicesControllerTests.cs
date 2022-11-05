using System;
using System.Collections.Generic;
using System.Linq;
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
        public async void DevicesController_DeleteDevice_ReturnOneDevice()
        {
            //Arrange
            int deviceId = 1;
            var dbContext = await _database.GetDatabaseContext();
            var controller = new DevicesController(dbContext);

            //Act
            var result = controller.DeleteDevice(deviceId);

            //Assert
            result.Should().NotBeNull();
            Assert.IsAssignableFrom<NoContentResult>(result.Result);
        }
    }
}
