using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElectricShop_API
{
    public class CartDevices
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int Price { get; set; }

        public string Image { get; set; }

        public string ShortDescription { get; set; }

        public string FullDescription { get; set; }

        [ForeignKey("CategoryId")]
        public int CategoryId { get; set; }

        [ForeignKey("RAM_ID")]
        public int RAM_ID { get; set; }

        [ForeignKey("MemoryId")]
        public int MemoryId { get; set; }

        public int Amount { get; set; }

    }
}
