/* -------------------- get Dom Elements ---------------------- */
let wordInput = document.querySelector('.inputText')
let btn = document.querySelector('.btn')
let audio = document.querySelector('.audio')
let meaningDiv = document.querySelector('.meaning')
let imgElem = document.querySelector('.img')
let word = null

/* -------------------- fetchApi Function ---------------------- */
function getWord(){
    meaningDiv.innerHTML=''
    word = wordInput.value
    wordInput.value=''
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => {return res.json()})
    .then(translate =>{
        
        audio.src=`${translate[0].phonetics[0].audio}`
        meaningDiv.insertAdjacentHTML('afterbegin',
        `
        <p>
            ${translate[0].meanings[0].definitions[0].definition}
        </p>
        `
        )
        imgElem.style.display='block'
        imgElem.addEventListener('click',()=>{
            audio.play()
        })

    })
    .catch(res => {

        imgElem.style.display='none'
        meaningDiv.insertAdjacentHTML('afterbegin',
        `
        <p>
            Enter a true word !!!
        </p>
        `
        )
    })
}

/* -------------------- for Enter Pressed ---------------------- */
wordInput.addEventListener('keydown', (event)=>{
    if(event.keyCode===13){
        getWord()
    }
})

/* -------------------- for Button Clicked ---------------------- */
btn.addEventListener('click',getWord)
