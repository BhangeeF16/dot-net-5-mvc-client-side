#region Imports

using System;

#endregion

namespace Common.ViewModels
{
    public abstract class AuditableEntity
    {
        public string Id { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}