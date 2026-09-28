let allRecipes = [];

const recipeList =
    document.getElementById("recipe-list");

const recipeForm =
    document.getElementById("recipe-form");

const formSection =
    document.getElementById("recipe-form-section");

const formTitle =
    document.getElementById("form-title");

const recipeId =
    document.getElementById("recipe-id");

const recipeName =
    document.getElementById("recipe-name");

const recipeCategory =
    document.getElementById("recipe-category");

const recipeIngredients =
    document.getElementById("recipe-ingredients");

const recipeInstructions =
    document.getElementById("recipe-instructions");

const recipeMessage =
    document.getElementById("recipe-message");


/* --------------------------------
   LOAD RECIPES
-------------------------------- */

async function loadRecipes() {

    try {

        const response =
            await fetch("/.netlify/functions/recipes");

        if (!response.ok) {
            throw new Error(
                "Could not retrieve recipes."
            );
        }

        const data =
            await response.json();

        const back4AppData =
            typeof data === "string"
                ? JSON.parse(data)
                : data;

        allRecipes =
            back4AppData.results || [];

        displayRecipes(allRecipes);

    }
    catch (error) {

        console.error(error);

        recipeList.innerHTML =
            "<p>Sorry, recipes could not be loaded.</p>";
    }
}


/* --------------------------------
   DISPLAY RECIPES
-------------------------------- */

function displayRecipes(recipes) {

    recipeList.innerHTML = "";

    if (recipes.length === 0) {

        recipeList.innerHTML =
            "<p>No recipes found.</p>";

        return;
    }

    recipes.forEach(function (recipe) {

        const card =
            document.createElement("article");

        card.classList.add("recipe-card");


        const title =
            document.createElement("h3");

        title.textContent =
            recipe.Name ??
            recipe.name ??
            "Unnamed Recipe";


        const category =
            document.createElement("p");

        category.classList.add("category-label");

        category.textContent =
            recipe.Category ??
            recipe.category ??
            "Other";


        const ingredientsTitle =
            document.createElement("h4");

        ingredientsTitle.textContent =
            "Ingredients";


        const ingredients =
            document.createElement("p");

        ingredients.textContent =
            recipe.Ingredients ??
            recipe.ingredients ??
            "";


        const instructionsTitle =
            document.createElement("h4");

        instructionsTitle.textContent =
            "Instructions";


        const instructions =
            document.createElement("p");

        instructions.textContent =
            recipe.Instructions ??
            recipe.instructions ??
            "";


        const editButton =
            document.createElement("button");

        editButton.textContent = "Edit Recipe";

        editButton.classList.add(
            "edit-button"
        );

        editButton.addEventListener(
            "click",
            function () {
                openEditForm(recipe);
            }
        );


        card.appendChild(category);
        card.appendChild(title);
        card.appendChild(ingredientsTitle);
        card.appendChild(ingredients);
        card.appendChild(instructionsTitle);
        card.appendChild(instructions);
        card.appendChild(editButton);

        recipeList.appendChild(card);
    });
}


/* --------------------------------
   OPEN ADD FORM
-------------------------------- */

document
    .getElementById("open-recipe-form")
    .addEventListener("click", function () {

        recipeForm.reset();

        recipeId.value = "";

        formTitle.textContent =
            "Add a Recipe";

        recipeMessage.textContent = "";

        formSection.classList.remove(
            "hidden"
        );

        formSection.scrollIntoView({
            behavior: "smooth"
        });
    });


/* --------------------------------
   OPEN EDIT FORM
-------------------------------- */

function openEditForm(recipe) {

    recipeId.value =
        recipe.objectId;

    recipeName.value =
        recipe.Name ??
        recipe.name ??
        "";

    recipeCategory.value =
        recipe.Category ??
        recipe.category ??
        "Other";

    recipeIngredients.value =
        recipe.Ingredients ??
        recipe.ingredients ??
        "";

    recipeInstructions.value =
        recipe.Instructions ??
        recipe.instructions ??
        "";

    formTitle.textContent =
        "Edit Recipe";

    recipeMessage.textContent = "";

    formSection.classList.remove(
        "hidden"
    );

    formSection.scrollIntoView({
        behavior: "smooth"
    });
}


/* --------------------------------
   SAVE / UPDATE RECIPE
-------------------------------- */

recipeForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        const recipe = {

            name:
                recipeName.value.trim(),

            category:
                recipeCategory.value,

            ingredients:
                recipeIngredients.value.trim(),

            instructions:
                recipeInstructions.value.trim()
        };


        const id =
            recipeId.value;


        let url =
            "/.netlify/functions/recipes";

        let method =
            "POST";


        if (id) {

            url =
                `/.netlify/functions/recipes?id=${encodeURIComponent(id)}`;

            method =
                "PUT";
        }


        try {

            const response =
                await fetch(url, {

                    method: method,

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(recipe)
                });


            if (!response.ok) {

                throw new Error(
                    "Could not save recipe."
                );
            }


            recipeMessage.textContent =
                id
                    ? "Recipe updated!"
                    : "Recipe added!";


            recipeForm.reset();

            recipeId.value = "";


            await loadRecipes();


            setTimeout(function () {

                formSection.classList.add(
                    "hidden"
                );

            }, 700);

        }
        catch (error) {

            console.error(error);

            recipeMessage.textContent =
                "Something went wrong.";
        }
    });


/* --------------------------------
   CLOSE FORM
-------------------------------- */

function closeForm() {

    recipeForm.reset();

    recipeId.value = "";

    recipeMessage.textContent = "";

    formSection.classList.add(
        "hidden"
    );
}


document
    .getElementById("close-recipe-form")
    .addEventListener(
        "click",
        closeForm
    );


document
    .getElementById("cancel-recipe")
    .addEventListener(
        "click",
        closeForm
    );


/* --------------------------------
   CATEGORY FILTERING
-------------------------------- */

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );


filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                filterButtons.forEach(
                    function (item) {
                        item.classList.remove(
                            "active"
                        );
                    }
                );

                button.classList.add(
                    "active"
                );


                const selectedCategory =
                    button.dataset.category;


                if (
                    selectedCategory === "All"
                ) {

                    displayRecipes(
                        allRecipes
                    );

                    return;
                }


                const filteredRecipes =
                    allRecipes.filter(
                        function (recipe) {

                            const category =
                                recipe.Category ??
                                recipe.category;

                            return category ===
                                selectedCategory;
                        }
                    );


                displayRecipes(
                    filteredRecipes
                );
            }
        );
    }
);


/* --------------------------------
   START APPLICATION
-------------------------------- */

loadRecipes();