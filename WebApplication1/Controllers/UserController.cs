using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml.Linq;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
	public class UserController : ApiController
	{
		/*
		[HttpPost]
		public string Add(dynamic item)
		{
			Console.WriteLine(item.city);
			String fileName = System.AppDomain.CurrentDomain.BaseDirectory.ToString() + "/data.xml";
			XDocument doc = XDocument.Load(fileName);
			Console.WriteLine("ok");
			XElement root = doc.Root;
			IEnumerable<XElement> query =
										from ele in root.Elements("user")
										where ele.Attribute("phone").Value == Convert.ToString(item.phone)
										select ele;
			if(query.Count()!=0)
			{
				return query.First().Attribute("link").ToString();
			}
			XElement element = new XElement("user");
			string guid = Guid.NewGuid().ToString("N");
			string link = item.host+@"/zanPage.html?guid=" + guid;
			element.SetAttributeValue("guid", guid);
			element.SetAttributeValue("name",Convert.ToString(item.name));
			element.SetAttributeValue("phone", Convert.ToString(item.phone));
			element.SetAttributeValue("dis", Convert.ToString(item.dis));
			element.SetAttributeValue("count", Convert.ToString(0));
			element.SetAttributeValue("link", link);
			
			root.Add(element);
			doc.Save(fileName);
			return link;
		}
		*/
		[HttpPost]
		public string Add(dynamic item)
		{
			string guid = Guid.NewGuid().ToString("N");
			string link = item.host + @"/zanPage.html?guid=" + guid;
			SqlConnection conn = new SqlConnection();
			conn.ConnectionString = "server=127.0.0.1\\SQLEXPRESS;database=zan;uid=admin;pwd=";
			conn.Open();
			SqlDataAdapter myda;
			SqlCommand cmd;
			DataTable dt = new DataTable();
			String querySql = String.Format("select * from u where phone='{0}'", item.phone);
			myda = new SqlDataAdapter(querySql, conn);
			myda.Fill(dt);
			if (dt.Select().Count() != 0)
			{
				conn.Close();
				return dt.Select().First()["link"].ToString()+"&dis="+ dt.Select().First()["dis"].ToString();
			}
			String insertSql = String.Format("INSERT INTO u VALUES ('{0}', '{1}', '{2}', '{3}',{4},'{5}')", guid, item.name, item.phone, item.dis, "0", link);
			cmd = new SqlCommand(insertSql, conn); // 实例化适配器
			cmd.ExecuteNonQuery();
			conn.Close();
			return link+"&dis="+item.dis;
		}
	}
}
