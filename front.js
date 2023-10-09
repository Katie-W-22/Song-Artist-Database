

async function getRecipes(){
    const allRecipeList = await fetch("http://localhost:4000/recipes");
    const data = await allRecipeList.json();
    return data
}

async function populateElements(){

    const containerDiv = document.getElementById('recipe-container');
    const recipes = await getRecipes();
    console.log(recipes)
    for(let i=0; i < recipes.data.length; i++){
        newRecipeDiv = document.createElement('div');
        newnameP = document.createElement('h3');
        newnameP.innerText = recipes.data[i].name;
        newRecipeDiv.appendChild(newnameP);
        for(let j=0; j <recipes.data[i].ingredients.length; j++){
            newIngP = document.createElement('p')
            newIngP.innerText = recipes.data[i].ingredients[j]
            newRecipeDiv.appendChild(newIngP)
        }
        const anchorElement = document.createElement('a');
        anchorElement.href = `${recipes.data[i].link_to_url}`; 
        anchorElement.textContent = 'Visit The Method Here';
        newRecipeDiv.append(anchorElement)
        containerDiv.appendChild(newRecipeDiv)
    }


}

document.addEventListener("DOMContentLoaded",populateElements)