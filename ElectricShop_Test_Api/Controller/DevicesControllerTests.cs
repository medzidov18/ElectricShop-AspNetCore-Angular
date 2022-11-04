using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ElectricShop_API;
using ElectricShop_API.Controllers;
using FakeItEasy;

namespace ElectricShop_Test_Api.Controller
{
    public class DevicesControllerTests
    {


        [Fact]
        public void DevicesController_GetDevices_ReturnOk()
        {
            //Arrange
            var devices = A.Fake<ICollection<Device>>();
            var devicesList = A.Fake<IList<Device>>();
            var controller = new DevicesController();

            //Act

            //Assert
        }
    }
}
