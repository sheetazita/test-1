const dropdown = document.querySelector(".dog-selector");
const picDisplay = document.querySelector(".api-img");
const fetchButton = document.querySelector("#get-dogs");
const infoDisplay = document.querySelector(".info")


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
  const response = await axios.get(`https://dog.ceo/api/breeds/list/all`)
  console.log(response);
  const dogInfo = response.data[0];
  console.log(dogInfo)
  infoDisplay.innerHTML = `<p>Name: ${dogInfo.name}</p>`

  // next api call needs lowercase names, so the next line makes dog breed lowercase
  let dogName = dogInfo.name.toLowerCase()

  // this is a second api call that just gets an image of the breed
  const responseTwo = await axios.get(`https://dog.ceo/api/breed/${dogName}/images/random`)
  const dogPic = responseTwo.data.message;

  picDisplay.innerHTML = `<img src=${dogPic}>`;
  if (response.data[0].breeds.length) {
    infoDisplay.innerHTML = `
    <p>Name = ${response.data[0].breeds[0].name}</p>
  `} else {
    infoDisplay.innerHTML = '';
  }

})

