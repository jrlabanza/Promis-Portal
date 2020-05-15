using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace promisPortal.Models
{
    public class portalMod
    {
        //public Boolean getSafetyCalendar{
                    
        //}

        public List<IDictionary<string, string>> getQualityCalendar()
        {

            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();
            string query = "SELECT id,qualityMessage,DATE_FORMAT(date, '%m/%d/%Y') as new_date FROM quality_calendar;";
            results = Connection.GetDataAssociateArray(query, "GET SAFETY CALENDAR DATA", Connection.portal_connString);
            return results;            
        }

        public List<IDictionary<string, string>> getSafetyCalendar()
        {

            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();
            string query = "SELECT id,qualityMessage,DATE_FORMAT(date, '%m/%d/%Y') as new_date FROM safety_calendar;";
            results = Connection.GetDataAssociateArray(query, "GET SAFETY CALENDAR DATA", Connection.portal_connString);
            return results;
        }

        public List<IDictionary<string, string>> getBroadcast() {

            List<IDictionary<string, string>> results = new List<IDictionary<string, string>>();
            string query = "SELECT id,subject,body,photo_header,DATE_FORMAT(expiry_date, '%Y-%m-%d') as new_date FROM tarlac_broadcast";
            results = Connection.GetDataAssociateArray(query, "GET BROADCAST DATA", Connection.portal_connString);
            return results;

        }

        public IDictionary<string, string> getBroadcastByID(int newsID)
        {

            IDictionary<string, string> results = new Dictionary<string, string>();
            string query = "SELECT id,subject,body,photo_header,expiry_date FROM tarlac_broadcast WHERE id=" + newsID;
            results = Connection.GetDataArray(query, "GET BROADCAST DATA", Connection.portal_connString);
            return results;

        }

        public IDictionary<string, string> is_valid(string FFID)
        {

            IDictionary<string, string> results = new Dictionary<string, string>();

            string query = "SELECT FFID FROM portal_users WHERE FFID ='" + FFID + "'";

            results = Connection.GetDataArray(query, "GET VALIDATION", Connection.portal_connString);


            return results;
        }

        //submit broadcast

        public Boolean UploadDocumentsBroadcast(string title, string date, string body, string pic)
        {
            string query = "INSERT INTO tarlac_broadcast(subject,expiry_date,body,photo_header) " +
                            "VALUES('" + title + "','" + date + "','" + body + "','" + pic + "')";

            Boolean results = Connection.ExecuteThisQuery(query, "Insert FLA Form", Connection.portal_connString);

            return results;
        }

    }
}
