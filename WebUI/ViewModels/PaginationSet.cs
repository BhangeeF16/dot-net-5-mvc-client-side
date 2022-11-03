#region Imports

using System.Collections.Generic;

#endregion

namespace Worqbox.UI.ViewModels
{
    public class PaginationSet<T>
    {
        public int PageIndex { set; get; }
        public string SortColumn { set; get; }
        public string SortDirection { set; get; }
        public int PageSize { get; set; }
        public int TotalRows { set; get; }
        public IEnumerable<T> Items { set; get; }
        public object OtherInfo { set; get; } // Can be used for any other object will be mapped here.
    }

    public class PaginationRequestVM
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
    }

    public class PaginationWithSearchRequestVM : PaginationRequestVM
    {
        public string Keyword { get; set; }
    }

    public class PaginationWithSortingRequestVM : PaginationRequestVM
    {
        public string SortColumn { get; set; }
        public string SortDirection { get; set; }
    }

    public class PaginationWithSearchAndSortingRequestVM : PaginationRequestVM
    {
        public string Keyword { get; set; }
        public string SortColumn { get; set; }
        public string SortDirection { get; set; }
    }
}