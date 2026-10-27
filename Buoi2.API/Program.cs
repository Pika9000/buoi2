using Microsoft.EntityFrameworkCore;
using Buoi2.API.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// 1. Kết nối SQL Server qua EF Core
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Cấu hình CORS cho phép React (Vite) gọi sang
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000") // Cổng của Vite / React
              .AllowAnyHeader()
              .AllowAnyMethod(); // Cho phép GET, POST, PUT, DELETE
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

// 3. Kích hoạt CORS
app.UseCors("AllowReactApp");

app.UseAuthorization();
app.MapControllers();

app.Run();