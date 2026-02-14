//console.log("Testing...");

const api_key = "a4e0b62a8cc74a9aab7a2e76c89fa205";
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

//fetching random news data from NewsAPI
async function fetchRandomNews() {
  try {
    const api_url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=8&apiKey=${api_key}`;
    const response = await fetch(api_url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}
//display content dynamically
function displayBlogs(articles) {
  //clear before loading ...
  blogContainer.innerHTML = "";
  articles.forEach((article) => {
    //create a container for each content
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    //add image
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    //add title
    const title = document.createElement("h2");
    //showing limited title character
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "..."
        : article.title;
    title.textContent = truncatedTitle;
    //add body
    const description = document.createElement("p");
    //showing limited description
    const truncatedDescription =
      article.description.length > 120
        ? article.description.slice(0, 120) + "..."
        : article.description;
    description.textContent = truncatedDescription;
    //append to card container
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    //add url of each article
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    //add to main card container
    blogContainer.appendChild(blogCard);
  });
}
(async () => {
  try {
    const article = await fetchRandomNews();
    displayBlogs(article);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();

//fetching news data based on user input
searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();

  if (query !== "") {
    try {
      const article = await fetchNewsQuery(query);
      displayBlogs(article);
    } catch (error) {
      console.error("Fetching error news by query", error);
      return [];
    }
  }
  searchField.value = "";
});
async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=8&apiKey=${api_key}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.log("Error fetching random newsquery!", error);
  }
}
