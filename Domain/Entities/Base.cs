using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
   public class Base
    {
        [MaxLength(450)]
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        [MaxLength(450)]
        public string ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
