using System;

namespace WebUI.Models
{
    public class InventoryDetailRequestVM
    {
        public string Username { get; set; }
    }

    public class InventoryDetailVM
    {
        public int? InventoryDetailID { get; set; }
        public int? DeviceConditionID { get; set; }
        public string Condition { get; set; }
        public string ItemName { get; set; }
        public bool? Active { get; set; }
        public string SerialNo { get; set; }
        public bool? IsDeviceInWarranty { get; set; }
        public string Note { get; set; }
        public DateTime? PurchasedDate { get; set; }
        public DateTime? WarrantyExpiryDate { get; set; }
        public DateTime? AssignedDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public string AllocationNote { get; set; }
        public int? AssignedToID { get; set; }
        public int? AssignedByID { get; set; }
        public string AssignedToUsername { get; set; }
        public string AssignedByUsername { get; set; }
        public int? InventoryAllocationDetailID { get; set; }
    }


    public class UpsertInventoryDetailRequestVM
    {
        public int? InventoryDetailID { get; set; }
        public int? DeviceConditionID { get; set; }
        public int? LoggedInUserID { get; set; }
        public string Condition { get; set; }
        public string ItemName { get; set; }
        public bool? Active { get; set; } = true;
        public string SerialNo { get; set; }
        public bool? IsDeviceInWarranty { get; set; }
        public string Note { get; set; }
        public DateTime? PurchasedDate { get; set; }
        public DateTime? WarrantyExpiryDate { get; set; }
    }

    public class UpsertInventoryAllocationDetailRequestVM
    {
        public int? InventoryAllocationDetailID { get; set; }
        public DateTime? AssignedDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public string Note { get; set; }
        public int? InventoryDetailID { get; set; }
        public int? AssignedTo { get; set; }
        public int? AssignedBy { get; set; }
        public int? LoggedInUserID { get; set; }

    }
}
