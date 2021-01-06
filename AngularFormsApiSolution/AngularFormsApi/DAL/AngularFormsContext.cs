using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularFormsApi.DAL
{
    public class AngularFormsContext : DbContext
    {
        public AngularFormsContext(DbContextOptions<AngularFormsContext> option)
            : base(option)
        { }

        public DbSet<User> Users { get; set; }

    }
}
