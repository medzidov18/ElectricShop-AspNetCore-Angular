using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ElectricShop_API.Migrations
{
    public partial class changeModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Devices",
                newName: "ShortDescription");

            migrationBuilder.AddColumn<string>(
                name: "FullDescription",
                table: "Devices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Devices",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FullDescription",
                table: "Devices");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Devices");

            migrationBuilder.RenameColumn(
                name: "ShortDescription",
                table: "Devices",
                newName: "Description");
        }
    }
}
