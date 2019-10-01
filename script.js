const dropdown = document.querySelector(".dog-selector");
const picDisplay = document.querySelector(".api-img");
const fetchButton = document.querySelector("#get-dogs");
const infoDisplay = document.querySelector(".info")


const getBreeds = async function () {
  const response = await axios.get("https://api.thedogapi.com/v1/breeds");
  // console.log(response.data)

  const breeds = response.data
  for (let i = 0; i < breeds.length; i++) {
    dropdown.innerHTML += `<option id=${breeds[i].id}>${breeds[i].name}</option>`

    // dropdown.addEventListener("click", async function () {
    //   const breed = `${breeds[i].name}`;
    //   const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q?=${breed}`)
    //   console.log(response)
    //   const dogPic = response.data;
    //   debugger;
    //   picDisplay.innerHTML = `<img src=${dogPic}>`
    // })
  }

}
getBreeds();
fetchButton.addEventListener('click', async function () {
  const breed = dropdown.value;
  console.log(breed);
  const response = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`)
  console.log(response);
  const dogInfo = response.data[0];
  // console.log(dogInfo)
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

