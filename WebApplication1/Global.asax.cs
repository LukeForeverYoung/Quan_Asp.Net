using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

using System.Web.Http;
using System.Xml.Linq;
namespace WebApplication1
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
			GlobalConfiguration.Configure(WebApiConfig.Register);
			//setXML("data.xml");
			//setXML("zan.xml");
		}
		private void setXML(String fileName)
		{
			fileName = System.AppDomain.CurrentDomain.BaseDirectory.ToString() + "/" + fileName;
			try
			{
				XDocument doc = XDocument.Load(fileName);
			}catch(Exception e)
			{
				XDocument doc = new XDocument();
				XElement root = new XElement("root");
				doc.Add(root);
				doc.Save(fileName);
			}
		}
    }
}
