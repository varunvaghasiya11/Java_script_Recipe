const recipeContainer = document.getElementById('racipe');
const ingredients = document.getElementById('ingredients');
const searchInput = document.getElementById('searchInput');

function displayRecipes(recipes) {
  recipeContainer.innerHTML = "";

  if (recipes.length === 0) {
    recipeContainer.innerHTML = `<p class="text-center text-muted">No recipes found.</p>`;
    return;
  }

  recipes.forEach(recipe => {
    recipeContainer.innerHTML += `
      <div class="col-3 mb-3 d-flex flex-column">
        <div class="card rounded-4" style="overflow:hidden; border:1px solid #ccc;">
          <img src="${recipe.image}" alt="${recipe.name}" style="width:100%; height:200px; object-fit:cover;">
          <div class="card-body">
            <h5 class="card-title">${recipe.name}</h5>
            <button class="btn btn-outline-dark rounded-2" onclick="GetRecipe(${recipe.id})">View recipe</button>
          </div>
        </div>
      </div>
    `;
  });
}

fetch('https://dummyjson.com/recipes')
  .then(response => response.json())
  .then(data => displayRecipes(data.recipes))
  .catch(err => console.log(err));

searchInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query === "") return;

    fetch(`https://dummyjson.com/recipes/search?q=${query}`)
      .then(response => response.json())
      .then(data => displayRecipes(data.recipes))
      .catch(err => console.log(err));
  }
});

function GetRecipe(id) {
  fetch(`https://dummyjson.com/recipes/${id}`)
    .then(response => response.json())
    .then(recipe => {
      ingredients.innerHTML = `
        <div class="modal fade show" tabindex="-1" style="display:block; background-color: rgba(0,0,0,0.7);">
          <div class="modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title"><b>${recipe.name}</b></h5>
                <button type="button" class="btn-close" onclick="closeModal()"></button>
              </div>
              <div class="modal-body">
                <img src="${recipe.image}" class="img-fluid rounded mb-3" alt="${recipe.name}">
                <p><b class="fs-5">Ingredients:</b><br>${recipe.ingredients.join(', ')}</p>
                <p><b class="fs-5">Instructions:</b><br>${recipe.instructions}</p>
                <p><b class="fs-5">Cuisine:</b> ${recipe.cuisine}</p>
                <p><b class="fs-5">Reviews:</b> ${recipe.reviewCount}</p>
                <p><b class="fs-5">Meal Type:</b> ${recipe.mealType.join(', ')}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="closeModal()">Close</button>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .catch(err => console.log(err));
}

function closeModal() {
  ingredients.innerHTML = "";
}