using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace WebApplication1.Controllers
{
	public class TokenController : ApiController
	{
		[HttpPost]
		public string Token(dynamic item)
		{
			bool f = true;
			if (HttpRuntime.Cache["date"] == null)
			{
				f = false;
			}
			else
			{
				DateTime now = DateTime.Now;
				DateTime cat = DateTime.FromBinary((long)HttpRuntime.Cache["date"]);
				TimeSpan diff = now.Subtract(cat);
				int diffSec = (Int32)diff.TotalSeconds;
				if (diffSec > 3000)
				{
					f = false;
				}
			}
			return makeSignature(Convert.ToString(item.link), f);
			//Console.WriteLine(comp);
			//Console.WriteLine(signature);
		}
		[NonAction]
		private void SetNew(String access_token, String jsapi_ticket)
		{
			HttpRuntime.Cache["access_token"] = access_token;
			HttpRuntime.Cache["jsapi_ticket"] = jsapi_ticket;
			HttpRuntime.Cache["date"] = DateTime.Now.ToBinary();
		}
		[NonAction]
		private string makeSignature(String url_in, bool f)
		{
			Hashtable ht;
			JavaScriptSerializer ser;
			String access_token;
			String jsapi_ticket;
			String appid = "wxd740783563259bf0";
			String sec = "69a5858545023b01e4d89bc7007858aa";
			if (!f)
			{
				String url_0 = String.Format("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}", appid, sec);
				access_token = PostFunction(url_0)["access_token"].ToString();
				String url_1 = String.Format("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={0}&type=jsapi", access_token);
				jsapi_ticket = PostFunction(url_1)["ticket"].ToString();
				SetNew(access_token, jsapi_ticket);
			}
			else
			{
				access_token = HttpRuntime.Cache["access_token"].ToString();
				jsapi_ticket = HttpRuntime.Cache["jsapi_ticket"].ToString();
			}
			String noncestr = CreatenNonce_str();
			long timestamp = CreatenTimestamp();
			String comp = "";
			String signature = GetSignature(jsapi_ticket, noncestr, timestamp, url_in, out comp);
			ht = new Hashtable();
			ht.Add("timestamp", timestamp);
			ht.Add("nonceStr", noncestr);
			ht.Add("signature", signature);
			ser = new JavaScriptSerializer();
			String jsonStr = ser.Serialize(ht);
			return jsonStr;
		}
		[NonAction]
		private long CreatenTimestamp()
		{
			return (DateTime.Now.ToUniversalTime().Ticks - 621355968000000000) / 10000000;
		}
		[NonAction]
		private string CreatenNonce_str()
		{
			string[] strs = new string[]
								 {
								  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
								  "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
								 };
			Random r = new Random();
			var sb = new StringBuilder();
			var length = strs.Length;
			for (int i = 0; i < 15; i++)
			{
				sb.Append(strs[r.Next(length - 1)]);
			}
			return sb.ToString();
		}
		[NonAction]
		private JObject PostFunction(String url)
		{
			Console.WriteLine(url);
			var client = new HttpClient();
			var result = client.GetAsync(url).Result;
			if (!result.IsSuccessStatusCode) return null;
			Console.WriteLine(result.Content.ReadAsStringAsync().Result.ToString());
			JObject obj = JObject.Parse(result.Content.ReadAsStringAsync().Result.ToString());
			return obj;
		}
		[NonAction]
		private string SHA1_Encrypt(string Source_String)
		{
			byte[] StrRes = Encoding.Default.GetBytes(Source_String);
			HashAlgorithm iSHA = new SHA1CryptoServiceProvider();
			StrRes = iSHA.ComputeHash(StrRes);
			StringBuilder EnText = new StringBuilder();
			foreach (byte iByte in StrRes)
			{
				EnText.AppendFormat("{0:x2}", iByte);
			}
			return EnText.ToString();
		}
		[NonAction]
		private string GetSignature(string jsapi_ticket, string noncestr, long timestamp, string url, out string string1)
		{
			var string1Builder = new StringBuilder();
			string1Builder.Append("jsapi_ticket=").Append(jsapi_ticket).Append("&")
						  .Append("noncestr=").Append(noncestr).Append("&")
						  .Append("timestamp=").Append(timestamp).Append("&")
						  .Append("url=").Append(url.IndexOf("#") >= 0 ? url.Substring(0, url.IndexOf("#")) : url);
			string1 = string1Builder.ToString();
			return SHA1_Encrypt(string1);
		}
	}
}
