﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ScoutUniformMVC1.Models
{
    public class AppDbContext: DbContext
    {
        public AppDbContext() : base("DefaultConnection")
        { }

        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<ProductItem> ProductItems { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
    }
}