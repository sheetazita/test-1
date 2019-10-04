const hamburgerButton = document.querySelector(".hamburger");
const display = document.querySelector(".hamburgerNavlist")
const exit = document.querySelector("#exit")

hamburgerButton.addEventListener("click", function () {
  if (display.style.display === "" || display.style.display === "none") {
    display.style.display = "block";
  } else {
    display.style.display = "none";
  }
})

exit.addEventListener("click", function () {
  if (display.style.display === "none") {
    display.style.display === "block";
  } else {
    display.style.display = "none";
  }
})

const dropdown = document.querySelector(".dog-selector");
const picDisplay = document.querySelector(".api-img");
const fetchButton = document.querySelector("#get-dogs");
const infoDisplay = document.querySelector(".info");
const gridImgCorgi = document.querySelector("#corgi");
const dogPics = document.querySelectorAll(".img-grid img")
console.log(dogPics)

const getBreeds = async function () {
  const response = await axios.get("https://dog.ceo/api/breeds/list/all");
  console.log(response.data.message)
  const breeds = Object.keys(response.data.message);

  //   const breeds = response.data.items
  for (let i = 0; i < breeds.length; i++) {
    dropdown.innerHTML += `<option id=${breeds[i]}>${breeds[i]}</option>`
  }

}
getBreeds();


fetchButton.addEventListener('click', async function () {
  const breed = dropdown.value;
  console.log(breed);
  const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`)
  console.log(response);
  const dogInfo = response.data;
  console.log(dogInfo)
  infoDisplay.innerHTML = `<p>Name: ${dogInfo[0].name}</p>
  <p>Weight: ${dogInfo[0].weight.imperial} lbs</p >
    <p>Life Span: ${dogInfo[0].life_span}</p>
    <p>Breed Group: ${dogInfo[0].breed_group}</p>
    <p>Type: ${dogInfo[0].bred_for}</p>
    <p>Temperament: ${dogInfo[0].temperament}</p>
  `

  // // next api call needs lowercase names, so the next line makes dog breed lowercase
  // const dogName = dogInfo.name.toLowerCase();
  // // this is a second api call that just gets an image of the breed

  const responseTwo = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`)
  console.log(responseTwo)
  const dogPic = responseTwo.data.message;

  picDisplay.innerHTML = `<img src=${dogPic}>`;

  // if (response.data[0].breeds.length) {
  //   infoDisplay.innerHTML = `
  //   <p>Name = ${response.data[0].breeds[0].name}</p>
  // `} else {
  //   infoDisplay.innerHTML = '';
  // }

})

dropdown.addEventListener("keyup", function (event) {
  if (event.keyCode === enter) {
    event.preventDefault();
    button.click();
  }
});

dogPics.forEach(function (dog) {
  dog.addEventListener('click', async function (event) {
    let dog = event.target.getAttribute("alt")
    const gridResponseDog = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${dog}`)

    const gridDogInfo = gridResponseDog.data;

    infoDisplay.innerHTML = `<p>Name: ${gridDogInfo[0].name}</p>
    <p>Weight: ${gridDogInfo[0].weight.imperial} lbs</p >
      <p>Life Span: ${gridDogInfo[0].life_span}</p>
      <p>Breed Group: ${gridDogInfo[0].breed_group}</p>
      <p>Type: ${gridDogInfo[0].bred_for}</p>
      <p>Temperament: ${gridDogInfo[0].temperament}</p>`

    const gridResponseDogImg = await axios.get(`https://dog.ceo/api/breed/${dog}/images/random`)

    const gridDogPic = gridResponseDogImg.data.message;

    picDisplay.innerHTML = `<img src=${gridDogPic}>`;
  })
})



const initialDog = async function () {
  const initialResponseDog = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=corgi`)

  const initialDogInfo = initialResponseDog.data;

  infoDisplay.innerHTML = `<p>Name: ${initialDogInfo[0].name}</p>
    <p>Weight: ${initialDogInfo[0].weight.imperial} lbs</p >
      <p>Life Span: ${initialDogInfo[0].life_span}</p>
      <p>Breed Group: ${initialDogInfo[0].breed_group}</p>
      <p>Type: ${initialDogInfo[0].bred_for}</p>
      <p>Temperament: ${initialDogInfo[0].temperament}</p>`

  const initialResponseDogImg = await axios.get(`https://dog.ceo/api/breed/corgi/images/random`)

  const initialDogPic = initialResponseDogImg.data.message;

  picDisplay.innerHTML = `<img src=${initialDogPic}>`;
}

initialDog()
