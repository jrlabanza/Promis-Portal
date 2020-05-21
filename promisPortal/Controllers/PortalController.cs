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

        public JsonResult getCovidCalendar(string day)
        {
            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();
            results = portalObj.getCovidCalendar(day);
            return Json(results);
        }

        public JsonResult getSafetyDays()
        {
            IDictionary<string, string> results = new Dictionary<string, string>();
            results = portalObj.getSafetyDays();
            return Json(results);

        }

        public JsonResult updateSafetyDays(string current_record, string previous_record)
        {

            IDictionary<string, string> results = new Dictionary<string, string>();


            portalObj.updateSafetyDays(current_record, previous_record);

            results["done"] = "TRUE";
            results["msg"] = "<strong class='success'>UPDATE SUCCESSFULLY</strong>";
            return Json(results);

        }

        public JsonResult resetSafetyDays()
        {

            IDictionary<string, string> results = new Dictionary<string, string>();


            portalObj.resetSafetyDays();

            results["done"] = "TRUE";
            results["msg"] = "<strong class='success'>RESET SUCCESSFULLY</strong>";
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
            IDictionary<string, string> dataKeys = new Dictionary<string, string>();
            dataKeys["title"] = "sample";
            dataKeys["date"] = "sample";
            dataKeys["message"] = "sample";
            dataKeys["newFileName"] = "sample";

            data = this.SanitizeFormCollection(dataKeys ,data);

            int filesLen = Request.Files.Count;

            HttpPostedFileBase file = Request.Files[0];

            if (filesLen > 1)
            {                
                HttpPostedFileBase file2 = Request.Files[1];
                var upload_results2 = this.UploadThisFile(file2, "~/uploads/");
                var upload_results = this.UploadThisFile(file, "~/uploads/");


                if (upload_results["done"] == "TRUE")
                {
                    portalObj.UploadDocumentsBroadcast(data["title"], data["date"], data["message"], upload_results["newFileName"], data["hyperlink"], data["hyperlink_header"], upload_results2["newFileName"], data["additional_attachment_header"]);
                }
                else
                {

                }
            }

            else {

                var upload_results = this.UploadThisFile(file, "~/uploads/");


                if (upload_results["done"] == "TRUE")
                {
                    portalObj.UploadDocumentsBroadcastWithoutAdditionalAttachment(data["title"], data["date"], data["message"], upload_results["newFileName"], data["hyperlink"], data["hyperlink_header"]);
                }
                else
                {

                }
            
            }

            return Json(data);
        }
    }
}
