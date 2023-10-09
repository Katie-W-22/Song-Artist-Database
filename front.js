

async function getSongs(){
    const allSongsList = await fetch("http://localhost:3333/songs");
    const data = await allSongsList.json();
    return data
}

async function populateElements(){

    const containerDiv = document.getElementById('song-container');
    const songs = await getSongs();
    console.log(songs)
    for(let i=0; i < songs.length; i++){
        newSongDiv = document.createElement('div');
        newnameP = document.createElement('h3');
        newnameP.innerText = songs.data[i].name;
        newRecipeDiv.appendChild(newnameP);
        for(let j=0; j <songs.data.length; j++){
            newIngP = document.createElement('p')
            newIngP.innerText = recipes.data.title
            newRecipeDiv.appendChild(newIngP)
        }
    }


}

document.addEventListener("DOMContentLoaded",populateElements)