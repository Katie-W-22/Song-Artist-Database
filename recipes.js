import { promises as fs } from "node:fs";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";

const filePath = path.resolve(process.cwd(), "recipes.json");

// get list of all recipes
export async function getRecipes(sortedval=false) {
  const recipesJSON = await fs.readFile(filePath, "utf-8");
  const recipes = JSON.parse(recipesJSON);
  // some logic to sort
  if(sortedval){
    recipes.sort((a, b) => a.name.localeCompare(b.name))
  }
  return recipes;
}

// get recipe by id number.
export async function getRecipeByID(id) {
  const recipesJSON = await fs.readFile(filePath, "utf-8");
  const recipes = JSON.parse(recipesJSON);

  for (const recipe of recipes) {
    if (recipe.id === id) {
      return recipe;
    }
  }

  return null;
}

// add single Recipe
export async function addRecipe(name, ingredients, link_to_url) {
  const recipesJSON = await fs.readFile(filePath, "utf-8");
  const recipes = JSON.parse(recipesJSON);

  // arguments passed to object
  const newRecipe = {
    id: uuidv4(),
    name,
    ingredients,
    link_to_url,
  };

  recipes.push(newRecipe);
  await fs.writeFile(filePath, JSON.stringify(recipes, null, 2), "utf-8");

  return newRecipe;
}

// edit a recipe
export async function editRecipe(id, name, ingredients, link_to_url) {
  const recipes = await getRecipes();
  const recipe = await getRecipeByID(id);
  console.log(recipe);
  // if recipe exists then overwrite
  if (recipe) {
    recipe.name = name ?? recipe.name;
    recipe.ingredients = ingredients ?? recipe.ingredients;
    recipe.link_to_url = link_to_url ?? recipe.link_to_url;
  }

  // rewrite the array and post back to json
  await fs.writeFile(filePath, JSON.stringify(recipes, null, 2), "utf-8");
  return recipe;
}

// DELETE
export async function deleteRecipe(id) {
  const recipes = await getRecipes();
  let index = null;

  for (let i = 0; i < recipes.length; i++) {
    if (recipes[i].id === id) {
      index = i;
      break;
    }
  }

  if (index !== null) {
    const deletedRecipe = recipes.splice(index, 1);
    console.log(deletedRecipe)
    await fs.writeFile(filePath, JSON.stringify(recipes, null, 2), "utf-8");
    return deletedRecipe;
  }

  return null;
}

//search to get recipe by name

export async function getRecipeByName(name) {
    const recipesJSON = await fs.readFile(filePath, "utf-8");
    const recipes = JSON.parse(recipesJSON);
  
    const foundRecipes = []; // more than one match might exist so we initiate an array and push success into it
  
    for (const recipe of recipes) {
        console.log(recipe);
      if (recipe.name.includes(name)) {
        // inclues checks if substrng is in the argument string. only returns 1st
        foundRecipes.push(recipe);
      }
    }
    if (foundRecipes.length > 0) {
      return foundRecipes; // return new
    } else {
      return null;
    }
  }

  //search recipes by Ingredients

  export async function getRecipeByIngredient(ingredient) {
    const recipesJSON = await fs.readFile(filePath, "utf-8");
    const recipes = JSON.parse(recipesJSON);
  
    const foundRecipes = []; // more than one match might exist so we initiate an array and push success into it
  
    for (const recipe of recipes) {
        console.log(recipe);
      if (recipe.ingredients.join("").includes(ingredient)) {
        // inclues checks if substrng is in the argument string. only returns 1st
        foundRecipes.push(recipe);
      }
    }
    if (foundRecipes.length > 0) {
      return foundRecipes; // return new
    } else {
      return null;
    }
  }