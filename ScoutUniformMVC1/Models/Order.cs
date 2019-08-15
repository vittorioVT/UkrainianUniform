using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ScoutUniformMVC1.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal TotalPaid { get; set; }
        public DateTime OrderDate { get; set; }
        public int Status { get; set; }
        public string Comment { get; set; }
    }
}