using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BooksApi.Migrations
{
    /// <inheritdoc />
    public partial class AddAuthorsRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Author",
                table: "Books_data");

            migrationBuilder.AddColumn<int>(
                name: "AuthorId",
                table: "Books_data",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Authors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Authors", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Books_data_AuthorId",
                table: "Books_data",
                column: "AuthorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_data_Authors_AuthorId",
                table: "Books_data",
                column: "AuthorId",
                principalTable: "Authors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_data_Authors_AuthorId",
                table: "Books_data");

            migrationBuilder.DropTable(
                name: "Authors");

            migrationBuilder.DropIndex(
                name: "IX_Books_data_AuthorId",
                table: "Books_data");

            migrationBuilder.DropColumn(
                name: "AuthorId",
                table: "Books_data");

            migrationBuilder.AddColumn<string>(
                name: "Author",
                table: "Books_data",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
