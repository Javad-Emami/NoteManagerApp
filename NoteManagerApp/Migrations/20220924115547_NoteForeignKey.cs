using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoteManagerApp.Migrations
{
    public partial class NoteForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2022, 9, 24, 15, 25, 46, 861, DateTimeKind.Local).AddTicks(4248), new DateTime(2022, 9, 24, 15, 25, 46, 861, DateTimeKind.Local).AddTicks(4258) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Notes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateCreated", "DateModified" },
                values: new object[] { new DateTime(2022, 9, 24, 9, 53, 17, 158, DateTimeKind.Local).AddTicks(7869), new DateTime(2022, 9, 24, 9, 53, 17, 158, DateTimeKind.Local).AddTicks(7880) });
        }
    }
}
