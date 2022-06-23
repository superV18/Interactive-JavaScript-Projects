const joke = document.getElementById("joke");
const generateJokes = async () => {
  try {
    const setHeader = {
      headers: {
        Accept: "application/json",
      },
    };
    const res = await fetch("https://icanhazdadjoke.com", setHeader);
    const data = await res.json();
    console.log("AAAAAAAAA", data);
    joke.innerHTML = data.joke;
  } catch (err) {
    console.log(`the error is ${err}`);
  }
};
generateJokes();
