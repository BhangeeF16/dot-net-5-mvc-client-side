namespace Worqbox.UI.Common
{
    /// <summary>
    ///     PLEASE DONT CHANGE SEQUENCE OF ENUM.
    ///     ADD NEW ENTRIES AT END OF THE FILE
    ///     EXPECTED TIME SPENT ON FIXING SPS 1 WEEK
    /// </summary>
    public enum LUGetTypes
    {
        // Licenses 
        LICENSES_ORG_TYPE_EXP = 1, // ✔️
        LICENSES_SEATS_TYPE_EXP = 2, // ✔️
        LICENSES_ORG_RES_SEATS_ASEATS_START_TYPE = 3, // ✔️
        LICENSES_EXP_SEATS = 4, // ✔️
        LICENSES_SEATS_ASEATS = 5, // ✔️

        // Users
        USERS_NAME_EMAIL_ROLE_PHONE_STATUS = 6, // ✔️

        // Organization
        ORG_NAME_STU_ASTU = 7, // ✔️
        ORG_NAME_ADD_URL_PHONE_STATUS_REP_ASEATS = 8, // ✔️
        ORG_NAME_ADD_PHONE_SEATS_STATUS_TSCHOOL = 9, // ✔️
        ORG_NAME_ACTIVESEATS_LICEXPIRY = 10, // ✔️
        ORG_NAME_LICEXPIRY_TSCHOOL_ASEATS = 11, // ✔️
        ORG_NAME_LICTYPE_LICEXPIRY = 12, // ✔️
        ORG_NAME_ASEATS_TSEATS_LICTYPE_LICEXPIRY_STU = 13, // ✔️
        ORG_NAME_LICEXPIRY_TSTU_ASEATS = 14, // ✔️

        // RESELLER
        /// <SUMMARY>
        ///     PILOTS AND PAID CUSTOMERS ARE LICENSE TYPE
        /// </SUMMARY>
        RESELLER_RESELLERNAME_TREP_PILOTS_PAIDCUSTOMER_ASEATS = 15, // ✔️
        RESELLER_RESELLERNAME = 16, // ✔️

        // TEACHER
        TEACHER_TEACHERNAME_TCLASSES = 17, // ✔️
        TEACHER_TEACHERNAME_TCLASSES_USERNAME_SCHOOL_STATUS_EMAIL_ROLE = 18, // ✔️

        // STUDENT
        STUDENT_NAME_SCHOOL_TCLASSES_STATUS = 19, // ✔️
        STUDENT_NAME_STUDENTPROGRESS_LESSON = 20, // ✔️
        STUDENT_NAME_STATUS = 21, // ✔️
        STUDENT_NAME_LASTLOGIN_STATUS = 22, // ✔️
        STUDENT_NAME_COURSE_LASTPLAYEDDATE_STATUS_CLASS = 23, // ✔️
        STUDENT_NAME_COURSE_LASTPLAYEDDATE_HOURSEPLAYED_STATUS_CLASS = 24, // ✔️

        // CLASS
        CLASS_NAME_NOOFSTUDENTS = 25, // ✔️
        CLASS_NAME_COURSES = 26, // ✔️ Dep!
        CLASS_NAME_TEACHER_STUDENTS_SUBJECT = 27, // ✔️ defaults for TotalSubjects

        // COURSES
        COURSE_NAME_LESSONPROGRESS = 28,
        COURSE_NAME_LESSON_HOURSE_BRONZE_SILVER_GOLD = 29,

        // SCHOOL 
        SCHOOL_NAME_RESELLER_PARENTORG = 30, // ✔️
        SCHOOL_NAME_ADDRESS_URL_PARENTORG_ACTIVESTUDENT_RESELLER_LICENSESTATUS = 31, // ✔️

        // SALE REP (RESELLER REP) Rep_Ous , PILOTS = license type , PAIDORG = license type 
        SALEREP_REPNAME_OU_PILOTS_PAIDORG = 32, // ✔️
        SALEREP_REPNAME_OU = 33, // ✔️
        SALEREP_REPNAME_OU_RESELLERNAME = 34, // ✔️

        // ORGANIZATIONAL UNIT
        OU_NAME_PARENTOU_TREP = 35, // ✔️
        OU_ORGNAME_TREP = 36, // ✔️
        OU_NAME_ADDRESS_PHONE_ACTIVESEATS_TREP = 37, // ✔️
        OU_NAME_TSALEREP_PILOTS_PAIDCUSTOMER_PARENT = 38 // ✔️
    }

    public enum UserRoles
    {
        OrgAdmin = 1,
        Teacher = 2,
        ResellerCSR = 3,
        LuSystemAdmin = 4,
        Home = 5,
        ResellerRep = 6,
        ResellerManager = 7,
        Partner = 8
    }

    public enum ReportIdentifier
    {
        StudentMonitorReport,
        StudentProgressReport,
        StudentTimeReport,
        StudentPacingReport,
        StudentClassInVsOutReport,
        StudentCertificatesReport,
        StudentGrowthReport,
        EnglishSubjectAreaReport,
        MathSubjectAreaReport,
        CEFREnglishSubjectAreaReport,
        NRSCASASReport,
        ClassProgressReport,
        SchoolProgressReport,
        MonthlyProgressReport,
        WeeklyProgressReport,
        TeacherProgressReport
    }
    //TREP
}