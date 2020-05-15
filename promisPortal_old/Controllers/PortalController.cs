using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using promisPortal.Models;

namespace promisPortal.Controllers
{
    public class PortalController : BaseController
    {
        public class portal 
        { 
            public int id{ get; set;}
            public string date { get; set; }
            public string message { get; set; }
        }

        portalMod portalObj = new portalMod();
        //
        // GET: /Portal/

        public ActionResult Dashboard()
        {
            ViewBag.employeeData = this.Get_user_session_data();
            ViewBag.userFFID = this.Get_user_ffID();
            ViewBag.fullName = this.Get_user_fullname();
            ViewBag.CanUpdate = this.Get_user_valid_update();
            return View();
        }

        public ActionResult Broadcast()
        {
            ViewBag.employeeData = this.Get_user_session_data();
            ViewBag.userFFID = this.Get_user_ffID();
            ViewBag.fullName = this.Get_user_fullname();
            ViewBag.CanUpdate = this.Get_user_valid_update();
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public JsonResult getQualityCalendar() {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();
            results = portalObj.getQualityCalendar();
            return Json(results);
        }

        public JsonResult getSafetyCalendar()
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();
            results = portalObj.getSafetyCalendar();
            return Json(results);
        }

        public JsonResult getBroadcast()
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();
            results = portalObj.getBroadcast();
            return Json(results);

        }

        public JsonResult getBroadcastByID(int newsID)
        {
            IDictionary<string, string> results = new Dictionary<string, string>();
            results = portalObj.getBroadcastByID(newsID);
            return Json(results);

        }

        [HttpPost]
        [ValidateInput(true)]
        public JsonResult UploadDocumentsBroadcast(FormCollection data)
        {
            int filesLen = Request.Files.Count;

            for (int i = 0; i < filesLen; i++)
            {

                HttpPostedFileBase file = Request.Files[i];

                var upload_results = this.UploadThisFile(file, "~/uploads/");

                if (upload_results["done"] == "TRUE")
                {
                    portalObj.UploadDocumentsBroadcast(data["title"], data["date"], data["message"], upload_results["newFileName"]);
                }
                else
                {

                }
            }
            return Json(data);
        }
    }
}
