using Microsoft.AspNetCore.Mvc;
using WebAppWithAI.Models;
using WebAppWithAI.Services;

namespace WebAppWithAI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RecipesController : ControllerBase
    {
        private readonly Back4AppService _back4AppService;

        public RecipesController(Back4AppService back4AppService)
        {
            _back4AppService = back4AppService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRecipes()
        {
            try
            {
                string result =
                    await _back4AppService.GetRecipesAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Could not retrieve recipes.",
                    error = ex.Message
                });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateRecipe(
            [FromBody] Recipe recipe)
        {
            try
            {
                string result =
                    await _back4AppService.CreateRecipeAsync(recipe);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Could not save recipe.",
                    error = ex.Message
                });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecipe(
    string id,
    [FromBody] Recipe recipe)
        {
            try
            {
                string result =
                    await _back4AppService.UpdateRecipeAsync(
                        id,
                        recipe
                    );

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "Could not update recipe.",
                    error = ex.Message
                });
            }
        }
    }
}