﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HillarysHairCare.Migrations
{
    [DbContext(typeof(HillarysHairCareDbContext))]
    partial class HillarysHairCareDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("AppointmentService", b =>
                {
                    b.Property<int>("AppointmentsId")
                        .HasColumnType("integer");

                    b.Property<int>("ServicesId")
                        .HasColumnType("integer");

                    b.HasKey("AppointmentsId", "ServicesId");

                    b.HasIndex("ServicesId");

                    b.ToTable("AppointmentService");

                    b.HasData(
                        new
                        {
                            AppointmentsId = 1,
                            ServicesId = 1
                        },
                        new
                        {
                            AppointmentsId = 1,
                            ServicesId = 6
                        },
                        new
                        {
                            AppointmentsId = 2,
                            ServicesId = 2
                        },
                        new
                        {
                            AppointmentsId = 2,
                            ServicesId = 3
                        },
                        new
                        {
                            AppointmentsId = 3,
                            ServicesId = 1
                        },
                        new
                        {
                            AppointmentsId = 4,
                            ServicesId = 4
                        });
                });

            modelBuilder.Entity("Hillarys.Models.Appointment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer");

                    b.Property<bool>("IsCancelled")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("ScheduledDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("StylistId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CustomerId");

                    b.HasIndex("StylistId");

                    b.ToTable("Appointments");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CustomerId = 3,
                            IsCancelled = true,
                            ScheduledDate = new DateTime(2023, 8, 16, 15, 40, 34, 37, DateTimeKind.Unspecified).AddTicks(7880),
                            StylistId = 2
                        },
                        new
                        {
                            Id = 2,
                            CustomerId = 1,
                            IsCancelled = false,
                            ScheduledDate = new DateTime(2023, 9, 8, 15, 40, 34, 37, DateTimeKind.Unspecified).AddTicks(7880),
                            StylistId = 1
                        },
                        new
                        {
                            Id = 3,
                            CustomerId = 2,
                            IsCancelled = false,
                            ScheduledDate = new DateTime(2023, 9, 12, 15, 40, 34, 37, DateTimeKind.Unspecified).AddTicks(7880),
                            StylistId = 3
                        },
                        new
                        {
                            Id = 4,
                            CustomerId = 1,
                            IsCancelled = false,
                            ScheduledDate = new DateTime(2023, 9, 13, 15, 40, 34, 37, DateTimeKind.Unspecified).AddTicks(7880),
                            StylistId = 4
                        });
                });

            modelBuilder.Entity("Hillarys.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Customers");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Email = "jdfitz@gmail.com",
                            FirstName = "JD",
                            LastName = "Fitzmartin"
                        },
                        new
                        {
                            Id = 2,
                            Email = "josh@gmail.com",
                            FirstName = "Josh",
                            LastName = "Baugh"
                        },
                        new
                        {
                            Id = 3,
                            Email = "austin@gmail.com",
                            FirstName = "Austin",
                            LastName = "Flowers"
                        },
                        new
                        {
                            Id = 4,
                            Email = "rhmuse@gmail.com",
                            FirstName = "Rhett",
                            LastName = "Muse"
                        },
                        new
                        {
                            Id = 5,
                            Email = "ahare@gmail.com",
                            FirstName = "Alex",
                            LastName = "Hare"
                        });
                });

            modelBuilder.Entity("Hillarys.Models.Service", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Charge")
                        .HasColumnType("numeric");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Services");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Charge = 30.00m,
                            Name = "Long Cut"
                        },
                        new
                        {
                            Id = 2,
                            Charge = 25.50m,
                            Name = "Short Cut"
                        },
                        new
                        {
                            Id = 3,
                            Charge = 15.00m,
                            Name = "Beard Trim"
                        },
                        new
                        {
                            Id = 4,
                            Charge = 55.90m,
                            Name = "Coloring"
                        },
                        new
                        {
                            Id = 5,
                            Charge = 38.50m,
                            Name = "Extensions"
                        },
                        new
                        {
                            Id = 6,
                            Charge = 15.25m,
                            Name = "Shave"
                        });
                });

            modelBuilder.Entity("Hillarys.Models.Stylist", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Stylists");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            FirstName = "Liza",
                            IsActive = true,
                            LastName = "Vavrichyna"
                        },
                        new
                        {
                            Id = 2,
                            FirstName = "David",
                            IsActive = true,
                            LastName = "Bartek"
                        },
                        new
                        {
                            Id = 3,
                            FirstName = "Greg",
                            IsActive = false,
                            LastName = "Korte"
                        },
                        new
                        {
                            Id = 4,
                            FirstName = "Jackson",
                            IsActive = false,
                            LastName = "Henderson"
                        },
                        new
                        {
                            Id = 5,
                            FirstName = "Deanna",
                            IsActive = true,
                            LastName = "Davis"
                        });
                });

            modelBuilder.Entity("AppointmentService", b =>
                {
                    b.HasOne("Hillarys.Models.Appointment", null)
                        .WithMany()
                        .HasForeignKey("AppointmentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Hillarys.Models.Service", null)
                        .WithMany()
                        .HasForeignKey("ServicesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Hillarys.Models.Appointment", b =>
                {
                    b.HasOne("Hillarys.Models.Customer", "Customer")
                        .WithMany("Appointments")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Hillarys.Models.Stylist", "Stylist")
                        .WithMany("Appointments")
                        .HasForeignKey("StylistId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Customer");

                    b.Navigation("Stylist");
                });

            modelBuilder.Entity("Hillarys.Models.Customer", b =>
                {
                    b.Navigation("Appointments");
                });

            modelBuilder.Entity("Hillarys.Models.Stylist", b =>
                {
                    b.Navigation("Appointments");
                });
#pragma warning restore 612, 618
        }
    }
}
