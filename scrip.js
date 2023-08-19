let background = document.querySelector(".background");
let object = document.querySelector(".object");
let text = document.querySelector(".bcg h2");

window.addEventListener("scroll", () => {
  background.style.transform = `translateY(${window.scrollY}px)`;
  text.style.transform = `translateY(${window.scrollY * 2}px)`;
});
window.addEventListener("load", function () {
  var header = document.querySelector(".bcg h2");
  header.style.display = "none";
});
window.addEventListener("scroll", function () {
  var header = document.querySelector(".bcg h2");
  if (window.pageYOffset > 0) {
    header.style.display = "block";
  } else {
    header.style.display = "none";
  }
});
// Smooth scroll to next page section
const scrollButton = document.querySelector(".scroll-button");

scrollButton.addEventListener("click", (event) => {
  event.preventDefault();

  const nextPageSection = document.querySelector("#next-page");
  nextPageSection.scrollIntoView({ behavior: "smooth" });
});

window.addEventListener("scroll", function () {
  var header = document.querySelector(".bcg h2");
  if (window.pageYOffset > 0) {
    header.classList.add("visible");
  } else {
    header.classList.remove("visible");
  }
});

// main-portion starts
const API_key = `2c5065370c5e2ab533d63bf20431293d`;
const IMAGE_path = `https://image.tmdb.org/t/p/w500`;
const genre_path = `https://api.themoviedb.org/3/genre/movie/list?api_key=2c5065370c5e2ab533d63bf20431293d`;
const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

let input = document.querySelector(".search input");
let btn = document.querySelector(".search button");
let search_contents = document.querySelector(".search-content");
let search_grid_title = document.querySelector(".searched h1");
let favorities_grid = document.querySelector(".fav-movies-content");
const genreContainer = document.querySelector(".genre-container");
const tagGenre = document.querySelector(".genres");
const clearButtonContainer = document.querySelector(".clear-button-container");

const popup_container = document.querySelector(".popup-container");
const heartBtn = document.querySelector(".heart-btn");
const trending_el = document.querySelector(".trending .trending-content");

const castContainer = document.querySelector(".cast-container");
const castRow1 = document.querySelector(".cast-row-1");
const castRow2 = document.querySelector(".cast-row-2");
//loader
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader");

  // Function to show the loader
  function showLoader() {
    loader.classList.add("active");
  }

  // Function to hide the loader
  function hideLoader() {
    loader.classList.remove("active");
  }

  // Example usage: Simulate loading for 3 seconds, then hide the loader
  showLoader();
  setTimeout(function () {
    hideLoader();
  }, 3000); // Replace 3000 with the actual time it takes for your content to load
});

document.addEventListener("DOMContentLoaded", function () {
  const backToTopButton = document.querySelector(".back-to-top");
  const footer = document.querySelector(".foot");
  const favSection = document.querySelector("#favorites-section");

  // Function to show/hide the "Back to Top" button based on the scroll position
  function toggleBackToTopButton() {
    if (window.scrollY > favSection.offsetTop - window.innerHeight) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  }

  // Function to update the footer's position based on the scroll position
  function updateFooterPosition() {
    if (window.scrollY > favSection.offsetTop - window.innerHeight) {
      footer.classList.add("fixed-footer");
    } else {
      footer.classList.remove("fixed-footer");
    }
  }

  // Scroll event listener to toggle the "Back to Top" button and update the footer's position
  window.addEventListener("scroll", function () {
    toggleBackToTopButton();
    updateFooterPosition();
  });

  // Click event listener to scroll back to the top
  backToTopButton.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

async function getMovieCast(id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_key}`
    );
    const castData = await response.json();

    // Extract the cast information and return it
    return castData.cast;
  } catch (error) {
    console.error("Error fetching movie cast:", error);
    return []; // Return an empty array if there's an error to prevent further issues
  }
}

//what if use presses enter key insteat of search btn
input.addEventListener("keyup", async (event) => {
  // Check if the key pressed is the Enter key (key code 13)
  if (event.keyCode === 13) {
    // Trigger the search function with the input value
    let data = await get_movies_by_search(input.value);
    if (data && data.length > 0) {
      search_grid_title.innerText = "Search results...";
      search_contents.innerHTML = data
        .map((e) => {
          let rateClass = "";
          if (e.vote_average < 5) {
            rateClass = "red";
          } else if (e.vote_average >= 5 && e.vote_average <= 7) {
            rateClass = "yellow";
          } else if (e.vote_average > 7) {
            rateClass = "green";
          }
          return `
            <div class="card" data-id="${e.id}">
            <div class="image">
            ${
              e.poster_path
                ? `<img src="${IMAGE_path + e.poster_path}" alt="" />`
                : `
                <div class="placeholder">
                  <div class="placeholder-text">Movie poster not available</div>
                </div>
                `
            }
          </div>
              <div class="details">
                <h2>${e.title}</h2>
                <div class="each-detail">
                  <span>Rate: </span>
                  <span class="${rateClass}">${e.vote_average}</span>
                </div>
                <div class="each-detail">
                  <span>Release Date: </span>
                  <span>${e.release_date}</span>
                </div>
              </div>
            </div>
          `;
        })
        .join("");

      //collecting each card in order to show that popup when clicked
      let cards = document.querySelectorAll(".card");
      card_clicked(cards);
    } else {
      search_grid_title.innerText = "No results";
      search_contents.innerHTML = "";
    }
  }
});

let categ_btn = document.querySelector(".category-btn");
categ_btn.addEventListener("click", () => {
  tagGenre.classList.toggle("genres-visible");
  if (categ_btn.textContent === "Close categories") {
    categ_btn.textContent = "Categories";
    search_grid_title.innerText = "";
    search_contents.innerHTML = "";
  } else {
    categ_btn.textContent = "Close categories";
  }
});
setGenre();
selectedGenre = [];
async function setGenre() {
  tagGenre.innerHTML = "";

  // Fetch genre data from TMDB API
  const response = await fetch(genre_path);
  const genreData = await response.json();
  const genres = genreData.genres;

  genres.forEach((genre) => {
    let item = document.createElement("div");
    item.classList.add("tag");
    item.id = genre.id;
    item.innerText = genre.name;
    item.addEventListener("click", () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, index) => {
            if (id == genre.id) {
              selectedGenre.splice(index, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      selectedTag();
      getMoviesByGenre(selectedGenre); // Fetch and display movies based on selected genres
    });
    tagGenre.append(item);
  });
}

async function getMoviesByGenre(genres) {
  const genreIds = genres.join(",");
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_key}&with_genres=${genreIds}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Clear the DOM if no genres are selected
    if (genres.length === 0) {
      search_grid_title.innerText = "";
      search_contents.innerHTML = "";
      return;
    }
    // Update the DOM with movies based on selected genres
    search_grid_title.innerText = "Filtered results...";
    if (data.results.length == 0) {
      search_grid_title.innerText = "No results...";
    }
    search_contents.innerHTML = data.results
      .map((e) => {
        let rateClass = "";
        if (e.vote_average < 5) {
          rateClass = "red";
        } else if (e.vote_average >= 5 && e.vote_average <= 7) {
          rateClass = "yellow";
        } else if (e.vote_average > 7) {
          rateClass = "green";
        }
        return `
          <div class="card" data-id="${e.id}">
          <div class="image">
          ${
            e.poster_path
              ? `<img src="${IMAGE_path + e.poster_path}" alt="" />`
              : `
              <div class="placeholder">
                <div class="placeholder-text">Movie poster not available</div>
              </div>
              `
          }
        </div>
            <div class="details">
              <h2>${e.title}</h2>
              <div class="each-detail">
                <span>Rate: </span>
                <span class="${rateClass}">${e.vote_average}</span>
              </div>
              <div class="each-detail">
                <span>Release Date: </span>
                <span>${e.release_date}</span>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    let cards = document.querySelectorAll(".card");
    card_clicked(cards);
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
  }
}
function selectedTag() {
  let tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.classList.remove("highlight");
  });
  clearBtn();
  if (selectedGenre.length != 0) {
    selectedGenre.forEach((id) => {
      let highlightedTag = document.getElementById(id);
      highlightedTag.classList.add("highlight");
    });
  }
}
function clearBtn() {
  let clearBtn = document.getElementById("clear");
  if (selectedGenre.length !== 0) {
    if (clearBtn) {
      clearBtn.classList.add("highlight");
    } else {
      let clear = document.createElement("div");
      clear.classList.add("tag", "highlight");
      clear.style.color = "black";
      clear.style.fontWeight = 600;
      clear.style.borderRadius = "8px";
      clear.id = "clear";
      clear.innerText = "CLEAR";
      clear.addEventListener("click", () => {
        selectedGenre = [];
        selectedTag(); // Update the genre tags
        search_grid_title.innerText = "";
        search_contents.innerHTML = "";
      });
      clearButtonContainer.append(clear);
    }
  } else {
    if (clearBtn) {
      clearBtn.remove();
    }
  }
}

heartBtn.addEventListener("click", () => {
  const favoritesSection = document.getElementById("favorites-section");
  favoritesSection.scrollIntoView({ behavior: "smooth" });
});

function card_clicked(cards) {
  cards.forEach((card) => {
    card.addEventListener("click", () => showPopup(card));
  });
}

// movie search
async function get_movies_by_search(movie) {
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${movie}&api_key=${API_key}`
  );
  let respData = await response.json();
  return respData.results;
}
btn.addEventListener("click", async () => {
  let data = await get_movies_by_search(input.value);
  selectedGenre = [];
  setGenre();
  if (data && data.length > 0) {
    search_grid_title.innerText = "Search results...";
    search_contents.innerHTML = data
      .map((e) => {
        let rateClass = "";
        if (e.vote_average < 5) {
          rateClass = "red";
        } else if (e.vote_average >= 5 && e.vote_average <= 7) {
          rateClass = "yellow";
        } else if (e.vote_average > 7) {
          rateClass = "green";
        }
        return `
          <div class="card" data-id="${e.id}">
          <div class="image">
          ${
            e.poster_path
              ? `<img src="${IMAGE_path + e.poster_path}" alt="" />`
              : `
              <div class="placeholder">
                <div class="placeholder-text">Movie poster not available</div>
              </div>
              `
          }
        </div>
            <div class="details">
              <h2>${e.title}</h2>
              <div class="each-detail">
                <span>Rate: </span>
                <span class="${rateClass}">${e.vote_average}</span>
              </div>
              <div class="each-detail">
                <span>Release Date: </span>
                <span>${e.release_date}</span>
              </div>
            </div>
          </div>
        `;
      })
      .join("");

    //collecting each card in order to show that popup when clicked
    let cards = document.querySelectorAll(".card");
    card_clicked(cards);
  } else {
    search_grid_title.innerText = "No results";
    search_contents.innerHTML = "";
  }
});

//popup on clicked over any card
async function get_movies_by_id(id) {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_key}`
  );
  let respData = await response.json();
  return respData;
}
async function get_movie_trailer(id) {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_key}`
  );
  let respData = await response.json();
  return respData.results[0].key;
}
async function showPopup(card) {
  function createCardsForCast(castData) {
    const maxCastToShow = 16;
    const castSlice = castData.slice(0, maxCastToShow);

    return castSlice
      .map((cast) => {
        if (cast.profile_path) {
          return `
            <div class="cardzz-content">
              <div class="cardzz-image" style="background-image: url(${
                IMAGE_path + cast.profile_path
              })"></div>
              <p class="cast-name">${cast.name}</p>
            </div>
          `;
        } else {
          return `
            <div class="cardzz-content">
              <div class="cardzz-image placeholder" style="background-image: url('brokenImg.jpg')"></div>
              <p class="cast-name">${cast.name}</p>
            </div>
          `;
        }
      })
      .join("");
  }

  function createColumnsForCast(castData) {
    const maxCastToShow = 16;
    const numCols = Math.ceil(maxCastToShow / 4);
    const castSlice = castData.slice(0, maxCastToShow);

    let castHTML = "";

    for (let i = 0; i < numCols; i++) {
      const colSlice = castSlice.slice(i * 4, (i + 1) * 4);

      const colHTML = `
        <div class="cols">
          <div class="col" ontouchstart="this.classList.toggle('hover');">
            ${colSlice
              .map((cast) => {
                // Check if profile_path is available
                if (cast.profile_path) {
                  return `
                    <div class="container">
                      <div
                        class="front"
                        style="background-image: url(${
                          IMAGE_path + cast.profile_path
                        })"
                      >
                      </div>
                      <div class="back">
                        <div class="inner">
                          <p>${cast.name}</p>
                          <span id="cast-char">${cast.character}</span>
                        </div>
                      </div>
                    </div>
                  `;
                } else {
                  // If profile_path is not available, use a dummy container with text
                  return `
                    <div class="container">
                      <div class="front" style="background-color: #f0f0f0; color: black;display: flex; align-items: center; justify-content: center;">
                        <p>Profile Not Available!</p>
                      </div>
                      <div class="back">
                        <div class="inner">
                          <p>${cast.name}</p>
                          <span>${cast.character}</span>
                        </div>
                      </div>
                    </div>
                  `;
                }
              })
              .join("")}
          </div>
        </div>
      `;

      castHTML += colHTML;
    }

    return castHTML;
  }

  try {
    popup_container.classList.add("show-popup");
    let movie_id = card.getAttribute("data-id");
    let movie = await get_movies_by_id(movie_id);
    let movie_trailer = await get_movie_trailer(movie_id);
    let movie_cast = await getMovieCast(movie_id); // Fetch the movie cast information
    // Get the cast container and the two rows for cast members
    if (!movie || !movie.title || !movie.poster_path || !movie.overview) {
      throw new Error("Failed to load movie details.");
    }

    if (!movie_cast || movie_cast.length === 0) {
      throw new Error("Failed to load movie cast.");
    }

    popup_container.style.background = `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7)),url(${
      IMAGE_path + movie.poster_path
    })`;
    let castContainer;
    let castHeading = "Cast";
    if (screen.width > 770) {
      castContainer = createColumnsForCast(movie_cast);
    }

    popup_container.innerHTML = `
      <span class="x-icon">&#10006;</span>
      <div class="content">
        <div class="left">
          <div class="poster-img">
            <img src="${IMAGE_path + movie.poster_path}">
          </div>
          <div class="left-single-info">
            <span class="AddTofav">Add to favourites</span>
            <span class="heart-icon ${
              get_local_storage().includes(movie_id) ? "change-color" : ""
            }">&#9829;</span>
          </div>
        </div>
        <div class="right">
         <div class="movieTitle"> <h1>${movie.title}</h1></div>
         <div class="movieTagline"> <h3>${movie.tagline}</h3></div>
          <div class="single-info-container">
            <div class="single-info">
              <span>Language:&nbsp;&nbsp;&nbsp;</span>
              <span>${movie.spoken_languages[0]?.name || "N/A"}</span>
            </div>
            <div class="single-info">
              <span>Length:&nbsp;&nbsp;&nbsp;</span>
              <span>${movie.runtime}&nbsp;minutes</span>
            </div>
            <div class="single-info">
              <span>Rating:&nbsp;&nbsp;&nbsp;</span>
              <span>${movie.vote_average}</span>
            </div>
            <div class="single-info">
              <span>Budget:&nbsp;&nbsp;&nbsp;</span>
              <span>$${movie.budget}</span>
            </div>
            <div class="single-info">
              <span>Release Date:&nbsp;&nbsp;&nbsp;</span>
              <span>${movie.release_date}</span>
            </div>
          </div>
          <div class="genere">
            <h2>Genres</h2>
            <ul>
              ${movie.genres.map((e) => `<li>${e.name}</li>`).join("")}
            </ul>
          </div>
          <div class="overview">
            <h2>Overview</h2>
            <p>${movie.overview}</p>
          </div>
          <div class="trailer">
            <h2>Trailer</h2>
            <iframe width="560" height="315"
              src="https://www.youtube.com/embed/${movie_trailer}" frameborder="0"
              allowfullscreen></iframe>
          </div>
          ${
            screen.width <= 770
              ? `
              <h1>${castHeading}</h1>
              <div class="cardzz">
              ${createCardsForCast(movie_cast)}
              </div>
              `
              : ""
          }
          ${
            screen.width > 770
              ? `
              <br><br><h1>${castHeading}</h1>
              <div class="wrapper">
                <div class="cols">
                  ${castContainer}
                </div>
              </div>
              `
              : ""
          }
        </div>
      </div>
      `;

    // x icon functionality
    let x_icon = document.querySelector(".x-icon");
    x_icon.addEventListener("click", () => {
      popup_container.classList.remove("show-popup");
      document.body.style.overflow = "auto";
      popup_container.style.background = "rgba(0,0,0,0)";
      // Stopping the YouTube trailer video when the popup is closed
      let youtubeIframe = document.querySelector(".trailer iframe");
      youtubeIframe.removeAttribute("src");
      // Remove the cast carousel when the popup is closed
      // castCarousel.remove();
    });

    // heart icon functionality
    let heart = popup_container.querySelector(".heart-icon");

    heart.addEventListener("click", () => {
      const isFavorite = get_local_storage().includes(movie_id);

      if (isFavorite) {
        remove_from_LS(movie_id);
        heart.classList.remove("change-color");
      } else {
        add_to_LS(movie_id);
        heart.classList.add("change-color");
      }

      fetch_fav_movies(); // Update the favorites section
    });
  } catch (error) {
    console.error("Error loading movie details:", error);

    // Display error message in popup container
    popup_container.innerHTML = `
      <div class="error-message">
        <p>Sorry, Error loading movie details !</p>
        <br>
        <button class="close-error-btn" style=cursor:pointer>CLOSE</button>
      </div>
    `;

    // Close error message event listener
    const closeErrorBtn = popup_container.querySelector(".close-error-btn");
    closeErrorBtn.addEventListener("click", () => {
      popup_container.classList.remove("show-popup");
      document.body.style.overflow = "auto";
    });
  }
}

//getting local storage
function get_local_storage() {
  let movie_ids = JSON.parse(localStorage.getItem("movie-id"));
  return movie_ids === null ? [] : movie_ids;
}

function showNotification(message) {
  let notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;

  // Add the notification to the page
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 10);
  // Remove the notification after a few seconds (e.g., 3 seconds)
  setTimeout(() => {
    // Trigger the fade-out effect by removing the 'show' class
    notification.classList.remove("show");

    // Remove the notification from the DOM after the fade-out effect is complete
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000); // 3000 milliseconds (3 seconds) after the fade-in effect
}

function add_to_LS(id) {
  let movie_ids = get_local_storage();
  localStorage.setItem("movie-id", JSON.stringify([...movie_ids, id]));

  // Show a notification when the movie is added to favorites
  let message = `Added to favorites!`;
  showNotification(message);
}

function remove_from_LS(id) {
  let movie_ids = get_local_storage();
  localStorage.setItem(
    "movie-id",
    JSON.stringify(movie_ids.filter((e) => e !== id))
  );

  let message = `Removed from favorites!`;
  showNotification(message);
}
fetch_fav_movies();
async function fetch_fav_movies() {
  favorities_grid.innerHTML = "";
  let movies_ls = await get_local_storage();
  let movies = [];
  for (let i = 0; i <= movies_ls.length - 1; i++) {
    let movie__id = movies_ls[i];
    let movie = await get_movies_by_id(movie__id);
    fav_to_DOM_from_LS(movie);
    movies.push(movie);
  }
  if (movies.length === 0) {
    const favoritesHeading = favorities_grid.parentElement.querySelector("h1");
    favoritesHeading.textContent = "Your Favorites will display here...";
  } else {
    favorities_grid.parentElement.querySelector("h1").textContent = "Favorites";
  }
}
function fav_to_DOM_from_LS(movie_data) {
  favorities_grid.innerHTML += `
  <div class="card" data-id="${movie_data.id}">
            <div class="image">
              <img src="${IMAGE_path + movie_data.poster_path}"/>
            </div>
            <div class="details">
              <h2>${movie_data.title}</h2>
              <div class="each-detail">
                <span>Rate: </span>
                <span>${movie_data.vote_average}</span>
              </div>
              <div class="each-detail">
                <span>Release Date: </span>
                <span>${movie_data.release_date}</span>
              </div>
            </div>
          </div>
  `;
  let cards = document.querySelectorAll(".card");
  card_clicked(cards);
}

// trending section
get_movies_by_trends();
async function get_movies_by_trends() {
  let response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?&api_key=${API_key}`
  );
  let respData = await response.json();
  return respData.results;
}
trending_add_to_dom();
async function trending_add_to_dom() {
  let data = await get_movies_by_trends();
  trending_el.innerHTML = data
    .slice(0, 12)
    .map((e) => {
      let rateClass = "";
      if (e.vote_average < 5) {
        rateClass = "red";
      } else if (e.vote_average >= 5 && e.vote_average <= 7) {
        rateClass = "yellow";
      } else if (e.vote_average > 7) {
        rateClass = "green";
      }
      return `
        <div class="card" data-id="${e.id}">
          <div class="image">
            <img src="${IMAGE_path + e.poster_path}" alt="" />
          </div>
          <div class="details">
            <h2>${e.title}</h2>
            <div class="each-detail">
              <span>Rate: </span>
              <span class="${rateClass}">${e.vote_average}</span>
            </div>
            <div class="each-detail">
              <span>Release Date: </span>
              <span>${e.release_date}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
  let cards = document.querySelectorAll(".card");
  card_clicked(cards);
}
