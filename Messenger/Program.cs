using Contracts.Storages;
using DatabaseImplement.Storages;
using Messenger;
using Messenger.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

var authConfig = builder.Configuration.GetSection("Auth");

builder.Services.Configure<AuthOptions>(authConfig);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<UserService>();
builder.Services.AddTransient<ChatService>();
builder.Services.AddTransient<MessageService>();
builder.Services.AddSingleton<MessageQueueService>();

builder.Services.AddTransient<IUserStorage, UserStorage>();
builder.Services.AddTransient<IChatStorage, ChatStorage>();
builder.Services.AddTransient<IMessageStorage, MessageStorage>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var authOptions = authConfig.Get<AuthOptions>();

        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = authOptions.Issuer,

            ValidateAudience = true,
            ValidAudience = authOptions.Audience,

            ValidateLifetime = true,

            IssuerSigningKey = authOptions.GetSymmetricSecurityKey(),
            ValidateIssuerSigningKey = true,
        };
    });


builder.Services.AddCors();

var app = builder.Build();
app.UseCors(
        options => options.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()
    );


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.Run();
