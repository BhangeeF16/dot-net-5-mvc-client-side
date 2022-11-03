namespace WebUI.API_Helper
{
    public static class ApiRoute
    {
        public static string AuthenticateUser { get; } = "Worqbox/GetLoginUser";
        public static string UpsertProjectForcast { get; } = "Worqbox/UpsertProjectForecast";
        public static string UpsertProjectForecastForResource { get; } = "Worqbox/UpsertProjectForecastForResource";
        public static string GetLoginUser { get; } = "Worqbox/GetLoginUser?Email=";
        public static string GetAllPeoples { get; } = "Worqbox/Getpeoples";
        public static string ExtraHoursSummary { get; } = "Worqbox/ExtraHoursSummary?Token=Basic";
        public static string GetAllProjects { get; } = "Projects/GetAllProjects";
        public static string GetProjectDetailById { get; } = "Worqbox/GetProjectById?ProjectId=";
        public static string GetProjectMilestones { get; } = "Worqbox/GetMilestonesByProjectId?ProjectId=";
        public static string GetProjectTask { get; } = "Worqbox/GetTasksByMilestoneId?MilestoneId=";
        public static string GetProjectTaskDetails { get; } = "Worqbox/GetTaskById?TaskId=";
        public static string GetdashBoardDetails { get; } = "Worqbox/GetDashBoardTiles";
        public static string GetdailyTimeLogeReport { get; } = "Worqbox/GetTimeLogHours?REPORT_DATE=";
        public static string MonthlyTimeLogReport { get; } = "Worqbox/GetProjectsHoursSummary?START_DATE=";
        public static string GetProjectDetails { get; } = "Worqbox/GetTimeLoggedByProjectId?ProjectId=";
        public static string ExtraLogHoursHours { get; } = "Worqbox/UpsertExtraHours";
        public static string GetTeamworkResponses { get; } = "Worqbox/GetTeamworkResponses?Date=";
        public static string GetSyncDataResponses { get; } = "Worqbox/GetSyncDataResponses?Date=";
        public static string GetEmployeeOfTheMonthReport { get; } = "Worqbox/EmployeeOfTheMonthReport";
        public static string GetAllTimeLogByProjectId { get; } = "Worqbox/GetAllTimeLogByProject?ProjectId=";
        public static string GetMilestoneTaskDetails { get; } = "Worqbox/GetMilestoneTasks?milestoneId=";
        public static string ProjectDashboard { get; } = "Worqbox/ProjectDashboard?projectId=";
        public static string ProjectDashboardTiles { get; } = "Worqbox/ProjectDashboardTiles?projectId=";
        public static string ProjectBoardTickets { get; } = "Worqbox/ProjectBoard?projectId=";
        public static string ProjectTags { get; } = "Worqbox/ProjectTags?projectId=";
        public static string GetProjectsStatus { get; } = "Worqbox/GetAllProjectsBYStatus?status=";
        public static string GetTimeLogByProjectPerson { get; } = "Worqbox/GetTimeLogByProjectpersons?projectId=";
        #region Reports
        public static string TLReportsByProject { get; } = "Reports/TLReportsByProject";
        public static string TLReportsByUser { get; } = "Reports/TLReportsByUser";
        #endregion Reports
    }
}