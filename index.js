document.addEventListener("DOMContentLoaded",()=>{
    let deck_id;
    let startBtn = document.querySelector("#start");
    let hitBtn = document.querySelector("#Hit")
    let stayBtn = document.querySelector("#stay")

    let playerDiv = document.querySelector("#player");
    let houseDiv = document.querySelector("#house")
    let playerScore = 0;
    let houseScore = 0;

    console.log("hi")

//On Page load create new deck && save deck id
const fetchAllCards = async ()=>{
    try{
        let res = await axios.get("https://deckofcardsapi.com/api/deck/new/");
        //save deck id
        deck_id = res.data.deck_id;
        let shuffled = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`);
        console.log("player score " + playerScore)
        console.log("house score " + houseScore)

        
    }catch(error){
        console.log(error)
    }
}

//runs 
fetchAllCards();

// on click start games draws 2 cards for user
startBtn.addEventListener("click",(playerScore)=>{
    drawCards(deck_id,2,playerDiv,playerScore)
})

hitBtn.addEventListener("click",()=>{

    drawCards(deck_id,1,playerDiv,playerScore)
    console.log("player score " + playerScore)
})

stayBtn.addEventListener("click",(houseScore)=>{
    drawCards(deck_id,3,houseDiv,houseScore)
    console.log("house score " + houseScore)


})



// draws cards && display 
const drawCards = async (id,numCards,div,score) =>{
    try{
        let draw = await axios.get(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=${numCards}`);
        data = draw.data
        let cards = data.cards
        displaycards(cards,div)
        score =  scoreTracker(score,cards)
        // debugger
    }
    catch(error){
        console.log(error)
    }
    
}


const displaycards = (cards,div) =>{
    cards.forEach(card => {
        let img = document.createElement("img")
        src = card["image"]
        img.src = src
        div.appendChild(img)
    });
}

const scoreTracker = (score, cards) =>{
    cards.forEach(card =>{
        if (card.value === "KING" || card.value === "QUEEN" || card.value === "JACK"){
            score += 10
        }else{
            score += Number(card.value)
        }
    })
    return score
}

})