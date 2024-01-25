let navegation = document.getElementById("navegation")
let detalis =document.getElementById("detalis")
let catgotryes = ""

let navegationOn = document.getElementById("navegationOn")
navegationOn.addEventListener("click",()=>{
    navegation.classList.toggle("ondisplay")
})

let list = document.querySelectorAll("ul li")
for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click",()=>{
        for (let ii = 0; ii < list.length; ii++) {
            list[ii].classList.remove("text-[#09c]")
        }
        list[i].classList.add("text-[#09c]")
        httpRequst(list[i].getAttribute("data-game")) 
    })
}

async function httpRequst(category = "mmorpg") {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '96be1aed5emshf712be66b5a1fbbp13afb2jsn9868264e5b14',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

	const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
	let result = await response.json();
    displayCatagory(result)
   
} 
httpRequst()
function displayCatagory(result) {
    let table = ""
    for (let i = 0; i < result.length; i++) {
        table += `<a
        data-id="${result[i].id}"
        id="detalis"
        href="#"
        class="border rounded-3xl bg-[#152d35] hover:bg-transparent border-transparent hover:border-[#009688] p-5 transition-all"
      >
        <img
          src="${result[i].thumbnail}"
          class="w-full rounded-3xl"
        />
        <div class="flex justify-between mt-3 items-center">
          <p class="text-lg font-bold">${result[i].title}</p>
          <span class="bg-teal-500 px-6 py-0 rounded-md">free</span>
        </div>
        <p class="text-sm my-3 text-teal-400">
          ${result[i].short_description}
        </p>
        <div class="flex justify-between items-center">
          <div class="flex">
            <p class="bg-slate-700 px-3 rounded-md">${result[i].genre}</p>
            <p class="bg-slate-700 px-3 rounded-md ml-2">${result[i].platform
            }</p>
          </div>
        </div>
      </a>`
    }
    document.getElementById("catagory").innerHTML = table
    catgotryes = document.querySelectorAll("#catagory a")
    showDetailes(catgotryes)
}

let details_page =document.getElementById("details-page")
let close_page = document.getElementById("close_page")
let all_catagory=document.getElementById("all_catagory")
close_page?.addEventListener("click",()=>{
  details_page.classList.toggle("hideen")
  all_catagory.classList.toggle("hideen")
})









async function httpsCatgory(GameId) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '96be1aed5emshf712be66b5a1fbbp13afb2jsn9868264e5b14',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };


	const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${GameId}`, options);
	const detals = await response.json();
  detailes(detals) 
}


httpsCatgory()
let Details_titel =document.getElementById("Details_titel")
function showDetailes(allList) {
  for (let i = 0; i < allList.length; i++) {
    allList[i].addEventListener("click",()=>{
      details_page.classList.toggle("hideen")
      all_catagory.classList.toggle("hideen")
      httpsCatgory(allList[i].getAttribute("data-id"))
      detailes() 
    })
  }
}
function detailes(idDetails) {
  Details_titel.innerHTML = `<div class="Details-image lg:w-full">
    <img
      src="${idDetails.thumbnail}"
      class="w-full rounded-3xl"
    />
  </div>
  <div class="Details-titel lg:w-full">
    <h1 class="font-bold">Title: ${idDetails.title}</h1>
    <p class="my-5">Category: <span>${idDetails.genre}</span></p>
    <p class="my-5">Platform: <span>${idDetails.platform}</span></p>
    <p class="my-5">Status: <span>${idDetails.status}</span></p>
    <p class="my-5">
      ${idDetails.description}
    </p>
    <a href="${idDetails.game_url}" class="btnFor hover:bg-white hover:text-black"target="_blank"
      >show Game
    </a>
  </div>`
}
