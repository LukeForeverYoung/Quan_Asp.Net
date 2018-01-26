using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class DefaultController : ApiController
    {
    }
	public class UserController:ApiController
	{
		public IHttpActionResult GetUser(int id)
		{
			
		}
	}
	public class ProductsController : ApiController
	{
		Product[] products1 = new Product[]
		{
			new Product { Id = 1, Name = "Tomato Soup", Category = "Groceries", Price = 1 },
			new Product { Id = 2, Name = "Yo-yo", Category = "Toys", Price = 3.75M },
			new Product { Id = 3, Name = "Hammer", Category = "Hardware", Price = 16.99M }
		};

		public IEnumerable<Product> GetAllProducts()
		{
			return products1;
		}

		public IHttpActionResult GetProduct(int id)
		{
			var product = products1.FirstOrDefault((p) => p.Id == id);
			if (product == null)
			{
				return NotFound();
			}
			return Ok(product);
		}
	}
}
