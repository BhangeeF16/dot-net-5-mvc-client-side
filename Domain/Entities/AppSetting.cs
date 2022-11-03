using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class AppSetting
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string Label { get; set; }
        public string Description { get; set; }
    }
}
