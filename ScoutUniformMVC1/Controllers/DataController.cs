using ScoutUniformMVC1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ScoutUniformMVC1.Controllers
{
    public class DataController : Controller
    {
        public IList<ProductItem> menuItems;

        // GET: Data
        [HttpGet]
        public ActionResult GetMenuList()
        {
            menuItems = new List<ProductItem>();
            using (var db = new AppDbContext())
            {
                foreach (var f in db.ProductItems)
                {
                    menuItems.Add(f);
                }
            }
             return Json(menuItems, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public string GetUserId()
        {
            int uid = -1;
            if (Session["UserId"] != null)
                uid = Convert.ToInt32(Session["UserId"].ToString());
            return uid.ToString();
        }

        [HttpPost]
        public ActionResult PlaceOrder(IList<ProductItem> items, int id)
        {
            bool dbSuccess = false;
            try {
                using (var db = new AppDbContext())
                {
                    Order o = new Order();
                    o.UserId = id;
                    o.OrderDate = DateTime.Now;

                    db.Orders.Add(o);
                    db.SaveChanges();

                    int orderId = o.Id;
                    decimal grandTotal = 0;
                    foreach (var f in items)
                    {
                        OrderDetail orderDetail = new OrderDetail
                        {
                            OrderId = orderId,
                            ProductItemId = f.Id,
                            Quantity = f.Quantity,
                            TotalPrice = f.Price * f.Quantity,
                        };
                        db.OrderDetails.Add(orderDetail);
                        grandTotal += orderDetail.TotalPrice;
                    }
                    o.TotalPaid = grandTotal;
                    o.Status = 1;
                    o.OrderDate = DateTime.Now;
                    db.SaveChanges();
                    dbSuccess = true;
                }
            }
            catch (Exception ex)
            {
                //log ex
                Console.WriteLine(ex.Message);
                dbSuccess = false;
            }
            if (dbSuccess)
                return Json("success: true", JsonRequestBehavior.AllowGet);
            else
            {
                return Json("succes: false", JsonRequestBehavior.AllowGet);
            }
        }
    }
}