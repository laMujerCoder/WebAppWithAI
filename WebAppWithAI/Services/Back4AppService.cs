using System.Text;
using System.Text.Json;
using WebAppWithAI.Models;

namespace WebAppWithAI.Services
{
    public class Back4AppService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public Back4AppService(
            HttpClient httpClient,
            IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> CreateRecipeAsync(Recipe recipe)
        {
            string? applicationId =
                _configuration["Back4App:ApplicationId"];

            string? restApiKey =
                _configuration["Back4App:RestApiKey"];

            string? serverUrl =
                _configuration["Back4App:ServerUrl"];

            if (string.IsNullOrEmpty(applicationId) ||
                string.IsNullOrEmpty(restApiKey) ||
                string.IsNullOrEmpty(serverUrl))
            {
                throw new Exception(
                    "Back4App configuration is missing."
                );
            }

            _httpClient.DefaultRequestHeaders.Clear();

            _httpClient.DefaultRequestHeaders.Add(
                "X-Parse-Application-Id",
                applicationId
            );

            _httpClient.DefaultRequestHeaders.Add(
                "X-Parse-REST-API-Key",
                restApiKey
            );

            string json = JsonSerializer.Serialize(recipe);

            StringContent content = new StringContent(
                json,
                Encoding.UTF8,
                "application/json"
            );

            HttpResponseMessage response =
                await _httpClient.PostAsync(
                    $"{serverUrl}/classes/Recipe",
                    content
                );

            string responseBody =
                await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception(
                    $"Back4App error: {responseBody}"
                );
            }

            return responseBody;
        }
        public async Task<string> GetRecipesAsync()
        {
            string? applicationId =
                _configuration["Back4App:ApplicationId"];

            string? restApiKey =
                _configuration["Back4App:RestApiKey"];

            string? serverUrl =
                _configuration["Back4App:ServerUrl"];

            if (string.IsNullOrEmpty(applicationId) ||
                string.IsNullOrEmpty(restApiKey) ||
                string.IsNullOrEmpty(serverUrl))
            {
                throw new Exception(
                    "Back4App configuration is missing."
                );
            }

            _httpClient.DefaultRequestHeaders.Clear();

            _httpClient.DefaultRequestHeaders.Add(
                "X-Parse-Application-Id",
                applicationId
            );

            _httpClient.DefaultRequestHeaders.Add(
                "X-Parse-REST-API-Key",
                restApiKey
            );

            HttpResponseMessage response =
                await _httpClient.GetAsync(
                    $"{serverUrl}/classes/Recipe"
                );

            string responseBody =
                await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception(
                    $"Back4App error: {responseBody}"
                );
            }

            return responseBody;
        }

        public async Task<string> UpdateRecipeAsync(
    string objectId,
    Recipe recipe)
        {
            string? applicationId =
                _configuration["Back4App:ApplicationId"];

            string? restApiKey =
                _configuration["Back4App:RestApiKey"];

            string? serverUrl =
                _configuration["Back4App:ServerUrl"];

            if (string.IsNullOrEmpty(applicationId) ||
                string.IsNullOrEmpty(restApiKey) ||
                string.IsNullOrEmpty(serverUrl))
            {
                throw new Exception(
                    "Back4App configuration is missing."
                );
            }

            _httpClient.DefaultRequestHeaders.Clear();

            _httpClient.DefaultRequestHeaders.Add(
                "X-Parse-Application-Id",
                applicationId
            );

            _httpClient.DefaultRequestHeaders.Add(
                "X-Parse-REST-API-Key",
                restApiKey
            );

            string json = JsonSerializer.Serialize(recipe);

            StringContent content = new StringContent(
                json,
                Encoding.UTF8,
                "application/json"
            );

            HttpResponseMessage response =
                await _httpClient.PutAsync(
                    $"{serverUrl}/classes/Recipe/{objectId}",
                    content
                );

            string responseBody =
                await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception(
                    $"Back4App error: {responseBody}"
                );
            }

            return responseBody;
        }
    }
}