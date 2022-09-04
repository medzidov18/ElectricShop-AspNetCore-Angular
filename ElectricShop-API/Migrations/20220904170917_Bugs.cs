using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElectricShop_API.Migrations
{
    public partial class Bugs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AmountId",
                table: "Devices",
                newName: "Amount");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "Devices",
                newName: "AmountId");
        }
    }
}
