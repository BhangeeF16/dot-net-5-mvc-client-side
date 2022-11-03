using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities
{
    public class Role : IdentityRole
    {
        public bool Active { get; set; }
        public Role()
        {
        }

        public Role(string Name) : base(Name)
        {
           
        }
    }
}
