using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElectricShop_API.Migrations
{
    public partial class AddedForeignKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RAM",
                table: "Devices",
                newName: "RAM_ID");

            migrationBuilder.RenameColumn(
                name: "Memory",
                table: "Devices",
                newName: "MemoryId");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Devices",
                newName: "AmountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RAM_ID",
                table: "Devices",
                newName: "RAM");

            migrationBuilder.RenameColumn(
                name: "MemoryId",
                table: "Devices",
                newName: "Memory");

            migrationBuilder.RenameColumn(
                name: "AmountId",
                table: "Devices",
                newName: "Amount");
        }
    }
}
