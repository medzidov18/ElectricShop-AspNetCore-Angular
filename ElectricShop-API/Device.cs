using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElectricShop_API
{
    public class Device
    {
        [Key] public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }

        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")] 
        public virtual Category Category { get; set; }
    }
}
