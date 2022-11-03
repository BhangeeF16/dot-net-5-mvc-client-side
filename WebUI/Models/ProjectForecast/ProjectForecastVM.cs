using System;
using System.Collections.Generic;

namespace WebUI.Models.ProjectForecast
{
    public class sp_GetResourcesForecastRequestVM
    {
        public int? ProjectId { get; set; }
        public int? ProjectForeCastId { get; set; }
        public string ResourceUsername { get; set; }
        public int? BillingMonth { get; set; }
        public int? BillingYear { get; set; }
    }
    public class sp_GetProjectsForecastsRequestVM
    {
        public int? ProjectId { get; set; }
        public int? BillingMonth { get; set; }
        public int? BillingYear { get; set; }
    }
    public class WB_ForecastingManagementRequestVM
    {
        public int? ProjectId { get; set; }
        public int? BillingMonth { get; set; }
        public int? BillingYear { get; set; }
    }
    public class WB_ForecastingManagementResponseVM
    {
        public string Name { get; set; }
        public string UserName { get; set; }
        public decimal? ProjectedTotalHours { get; set; }
        public decimal? ProjectedBillableHours { get; set; }
        public decimal? ProjectedNonBillableHours { get; set; }
        public decimal? LoggedBillable { get; set; }
        public decimal? LoggedNonBillable { get; set; }
        public decimal? LoggedPercentage { get; set; }
        public decimal? OutstandingHours { get; set; }
        public int? ProjectId { get; set; }
        public int? BillingMonth { get; set; }
        public string BillingMonthName { get; set; }
        public int? BillingYear { get; set; }
    }
    public class sp_GetResourcesForecast
    {
        public int? Id { get; set; }
        public int? ProjectForecastId { get; set; }
        public int? ProjectId { get; set; }
        public string ProjectName { get; set; }
        public int? PersonId { get; set; }
        public string ResourceFirstName { get; set; }
        public string ResourceLastName { get; set; }
        public string ResourceFullName { get; set; }
        public string ResourceUsername { get; set; }
        public decimal? EstimatedBillableHours { get; set; }
        public decimal? EstimatedNonBillableHours { get; set; }
        public decimal? BillableHoursLogged { get; set; }
        public decimal? NonBillableHoursLogged { get; set; }
        public decimal? TotalEstimatedHours { get; set; }
        public decimal? TotalHoursLogged { get; set; }
        public int? BillingMonth { get; set; }
        public int? BillingYear { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? Created { get; set; }
        public string ModifiedBy { get; set; }
        public decimal? TotalHrsLoggedThisMonth
        {
            get
            {
                return BillableHoursLogged.GetValueOrDefault() + NonBillableHoursLogged.GetValueOrDefault();
            }
        }
    }
    public class sp_GetProjectsForecasts
    {
        public int? Id { get; set; }
        public int? ProjectId { get; set; }
        public string ProjectName { get; set; }
        public decimal? EstimatedBillableHours { get; set; }
        public decimal? EstimatedNonBillableHours { get; set; }
        public decimal? BillableHoursLogged { get; set; }
        public decimal? NonBillableHoursLogged { get; set; }
        public int? BillingMonth { get; set; }
        public int? BillingYear { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? Modified { get; set; }
        public DateTime? Created { get; set; }
        public string ModifiedBy { get; set; }

        public decimal? TotalHrsLoggedThisMonth
        {
            get
            {
                return BillableHoursLogged.GetValueOrDefault() + NonBillableHoursLogged.GetValueOrDefault();
            }
        }
    }
    public class UpsertProjectForecastForResourceReqeustVM
    {
        public int? ProjectForecastId { get; set; }
        public string ResourceUsername { get; set; }
        public decimal? EstimatedBillableHours { get; set; }
        public decimal? EstimatedNonBillableHours { get; set; }
        public string LoggedInUser { get; set; }
    }
    public class UpsertProjectForecastVM
    {
       public List<UpsertProjectForecastRequestVM> UpsertProjectForecastRequestVM { get; set; }
}
    public class UpsertProjectForecastRequestVM
    {
        public int? ProjectId { get; set; }
        public int? BillingMonth { get; set; }
        public int? BillingYear { get; set; }
        public decimal? EstimatedBillableHours { get; set; }
        public decimal? EstimatedNonBillableHours { get; set; }
        public string LoggedInUser { get; set; }
    }

    public class UpsertProjectForecastResponseVM
    {
        public int? Id { get; set; }
    }
    public class LookupVM
    {
        public int? Id { get; set; }
        public string Title { get; set; }
    }
    public class PeopleLookupVM
    {
        public int? Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
    }


    public class AffectedRowsVM
    {
        public int? AffectedRows { get; set; }
        public int? RecordID { get; set; }
        
    }

    public class DeleteGeneralVM
    {

        public int? forecastdetailid { get; set; }
        public int? forecastId { get; set; }
    }

}
