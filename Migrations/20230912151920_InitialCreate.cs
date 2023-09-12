using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HillarysHairCare.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Charge = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stylists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stylists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StylistId = table.Column<int>(type: "integer", nullable: false),
                    CustomerId = table.Column<int>(type: "integer", nullable: false),
                    ScheduledDate = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    IsCancelled = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Appointments_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Appointments_Stylists_StylistId",
                        column: x => x.StylistId,
                        principalTable: "Stylists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppointmentService",
                columns: table => new
                {
                    AppointmentsId = table.Column<int>(type: "integer", nullable: false),
                    ServicesId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentService", x => new { x.AppointmentsId, x.ServicesId });
                    table.ForeignKey(
                        name: "FK_AppointmentService_Appointments_AppointmentsId",
                        column: x => x.AppointmentsId,
                        principalTable: "Appointments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppointmentService_Services_ServicesId",
                        column: x => x.ServicesId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "Email", "FirstName", "LastName" },
                values: new object[,]
                {
                    { 1, "jdfitz@gmail.com", "JD", "Fitzmartin" },
                    { 2, "josh@gmail.com", "Josh", "Baugh" },
                    { 3, "austin@gmail.com", "Austin", "Flowers" },
                    { 4, "rhmuse@gmail.com", "Rhett", "Muse" },
                    { 5, "ahare@gmail.com", "Alex", "Hare" }
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "Charge", "Name" },
                values: new object[,]
                {
                    { 1, 30.00m, "Long Cut" },
                    { 2, 25.50m, "Short Cut" },
                    { 3, 15.00m, "Beard Trim" },
                    { 4, 55.90m, "Coloring" },
                    { 5, 38.50m, "Extensions" },
                    { 6, 15.25m, "Shave" }
                });

            migrationBuilder.InsertData(
                table: "Stylists",
                columns: new[] { "Id", "FirstName", "IsActive", "LastName" },
                values: new object[,]
                {
                    { 1, "Liza", true, "Vavrichyna" },
                    { 2, "David", true, "Bartek" },
                    { 3, "Greg", false, "Korte" },
                    { 4, "Jackson", false, "Henderson" },
                    { 5, "Deanna", true, "Davis" }
                });

            migrationBuilder.InsertData(
                table: "Appointments",
                columns: new[] { "Id", "CustomerId", "IsCancelled", "ScheduledDate", "StylistId" },
                values: new object[,]
                {
                    { 1, 3, true, new DateTime(2023, 8, 16, 15, 40, 34, 37, DateTimeKind.Unspecified).AddTicks(7880), 2 },
                    { 2, 1, false, new DateTime(2023, 9, 8, 15, 40, 34, 37, DateTimeKind.Unspecified).AddTicks(7880), 1 },
                    { 3, 2, false, new DateTime(2023, 9, 12, 15, 40, 34, 37, DateTimeKind.Unspecified).AddTicks(7880), 3 },
                    { 4, 1, false, new DateTime(2023, 9, 13, 15, 40, 34, 37, DateTimeKind.Unspecified).AddTicks(7880), 4 }
                });

            migrationBuilder.InsertData(
                table: "AppointmentService",
                columns: new[] { "AppointmentsId", "ServicesId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 6 },
                    { 2, 2 },
                    { 2, 3 },
                    { 3, 1 },
                    { 4, 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_CustomerId",
                table: "Appointments",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_StylistId",
                table: "Appointments",
                column: "StylistId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentService_ServicesId",
                table: "AppointmentService",
                column: "ServicesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentService");

            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Stylists");
        }
    }
}
