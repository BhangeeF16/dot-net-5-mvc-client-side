#region Imports

using System;

#endregion

namespace Worqbox.UI.Models.General
{
    public abstract class AuditableEntity
    {
        public int ID { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}