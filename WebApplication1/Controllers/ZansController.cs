using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Xml.Linq;
namespace WebApplication1.Controllers
{
	public class ZansController : ApiController
	{
		/*
		[HttpPost]
		public string Zan(dynamic item)
		{
			if(item.type=="1")
			{
				String fileName = System.AppDomain.CurrentDomain.BaseDirectory.ToString() + "/data.xml";
				String zanName = System.AppDomain.CurrentDomain.BaseDirectory.ToString() + "/zan.xml";
				XDocument doc = XDocument.Load(fileName);
				XDocument zdoc = XDocument.Load(zanName);
				Console.WriteLine("ok");
				XElement root = doc.Root;
				XElement zroot = zdoc.Root;
				//判断是否是合法的guid
				String ss = item.guid;
				int c = root.Elements().Count();
				IEnumerable<XElement> query =
											from ele in root.Elements("user")
											where ele.Attribute("guid").Value == ss
											select ele;
				if (query.Count() == 0)
					return null;
				XElement element = query.First();
				query =
						from ele in zroot.Elements("item")
						where ele.Attribute("ip").Value == Convert.ToString(item.ip) &&
								ele.Attribute("guid").Value == Convert.ToString(item.guid)
						select ele;
				if (query.Count() != 0)
					return null;
				int count = Int32.Parse(element.Attribute("count").Value.ToString()) + 1;
				element.SetAttributeValue("count", Convert.ToString(count));
				XElement ipItem = new XElement("item");
				ipItem.SetAttributeValue("guid", item.guid);
				ipItem.SetAttributeValue("ip", item.ip);
				zroot.Add(ipItem);
				doc.Save(fileName);
				zdoc.Save(zanName);
				return null;
			}
			else
			{
				String fileName = System.AppDomain.CurrentDomain.BaseDirectory.ToString() + "/data.xml";
				XDocument doc = XDocument.Load(fileName);
				XElement root = doc.Root;
				IEnumerable<XElement> query =
											from ele in root.Elements("user")
											where ele.Attribute("guid").Value == Convert.ToString(item.guid)
											select ele;
				if (query.Count() == 0)
					return "-1";
				else
					return query.First().Attribute("count").ToString();
			}
		}
		*/
		[HttpPost]
		public string Zan(dynamic item)
		{
			SqlConnection conn = new SqlConnection();
			conn.ConnectionString = "server=127.0.0.1\\SQLEXPRESS;database=zan;uid=admin;pwd=";
			SqlDataAdapter myda;
			SqlCommand cmd;
			DataTable dt = new DataTable();
			String querySql;
			String name;
			if(item.type=="2")
			{
				try
				{
					String ip = Convert.ToString(item.ip);
					if (ip.Length <= 5)
						return "0";
					conn.Open();
					querySql = String.Format("select * from i where guid='{0}' and ip='{1}'", item.guid, item.ip);
					myda = new SqlDataAdapter(querySql, conn);
					myda.Fill(dt);
					//重复IP点赞
					if (dt.Select().Count() != 0)
					{
						conn.Close();
						return "0";
					}
					//插入ip记录
					String insertSql = String.Format("INSERT INTO i VALUES ('{0}', '{1}')", item.guid, item.ip);
					cmd = new SqlCommand(insertSql, conn);
					cmd.ExecuteNonQuery();
					conn.Close();
					return "1";
				}
				catch(Exception e) { conn.Close();return "0"; }
				
			}
			else if (item.type == "1")
			{
				try
				{
					String ip=Convert.ToString(item.ip);
					if (ip.Length <= 5)
						return "0";
					conn.Open();
					//判断是否是合法的guid
					querySql = String.Format("select * from u where guid='{0}'", item.guid);
					myda = new SqlDataAdapter(querySql, conn);
					myda.Fill(dt);
					if (dt.Select().Count() == 0)
					{
						conn.Close();
						return "0";
					}
					dt.Clear();
					querySql = String.Format("select * from i where guid='{0}' and ip='{1}'", item.guid, item.ip);
					myda = new SqlDataAdapter(querySql, conn);
					myda.Fill(dt);
					//重复IP点赞
					if (dt.Select().Count() != 0)
					{
						conn.Close();
						return "0";
					}
					//增加赞数
					String updatetSql = String.Format("update u set count=count+1 where guid='{0}'", item.guid);
					cmd = new SqlCommand(updatetSql, conn);
					cmd.ExecuteNonQuery();
					//插入ip记录
					String insertSql = String.Format("INSERT INTO i VALUES ('{0}', '{1}')", item.guid, item.ip);
					cmd = new SqlCommand(insertSql, conn);
					cmd.ExecuteNonQuery();
					conn.Close();
					return "1";
				}catch(Exception e) { return e.ToString(); };
			}
			else
			{
				conn.Open();
				//判断是否是合法的guid
				querySql = String.Format("select * from u where guid='{0}'", item.guid);
				myda = new SqlDataAdapter(querySql, conn);
				myda.Fill(dt);
				if (dt.Select().Count() == 0)
				{
					conn.Close();
					return "0";
				}
				conn.Close();
				return dt.Select().First()["count"].ToString()+","+dt.Select().First()["name"].ToString()+","+ dt.Select().First()["dis"].ToString();
			}
		}
	}
}
