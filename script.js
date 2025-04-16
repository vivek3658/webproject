function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");}
  const dishes = [
    {
      img: "pancake.jpg",
      title: "Pancake",
      desc: "A tasty Tasty make You happy."
    },
    {
      img: "sushi.jpg",
      title: "Sushi",
      desc: "Japanese Sushi Made up of Fresh Fishes."
    },
    {
      img: "paneer.jpg",
      title: "Matar Paneer",
      desc: "A healty paneer."
    }
  ];
  
  let currentIndex = 0;
  
  function updateBanner() {
    const banner = document.getElementById("bannerSection");
    const title = document.getElementById("dishTitle");
    const desc = document.getElementById("dishDesc");
  
    banner.style.backgroundImage = `url('${dishes[currentIndex].img}')`;
    title.textContent = dishes[currentIndex].title;
    desc.textContent = dishes[currentIndex].desc;
  
    currentIndex = (currentIndex + 1) % dishes.length;
  }
  
  updateBanner(); // initial call
  setInterval(updateBanner, 5000);
 
  
  const searchInput = document.getElementById("searchInput");
  const suggestions = document.getElementById("suggestions");
  const mealResult = document.getElementById("mealResult");
  const commentsContainer = document.getElementById("commentsContainer");
  
  // Search Suggestions
  searchInput.addEventListener("input", function () {
    const query = this.value.trim();
    if (query.length < 2) {
      suggestions.innerHTML = "";
      return;
    }
  
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(res => res.json())
      .then(data => {
        suggestions.innerHTML = "";
        if (data.meals) {
          data.meals.slice(0, 5).forEach(meal => {
            const li = document.createElement("li");
            li.textContent = meal.strMeal;
            li.onclick = () => {
              searchInput.value = meal.strMeal;
              suggestions.innerHTML = "";
              fetchMeal(meal.strMeal);
            };
            suggestions.appendChild(li);
          });
        } else {
          suggestions.innerHTML = "<li>No match found</li>";
        }
      });
  });
  
  // Fetch meal data
  function fetchMeal(query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals && data.meals.length > 0) {
          const meal = data.meals[0];
  
          // Get ingredients
          let ingredients = "";
          for (let i = 1; i <= 20; i++) {
            const ing = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ing && ing.trim()) {
              ingredients += `
                <label>
                  <input type="checkbox"> ${ing} (${measure.trim()})
                </label><br>`;
            }
          }
  
          mealResult.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="300" />
            <h4>Ingredients:</h4>
            ${ingredients}
            <h4>Instructions:</h4>
            <p>${meal.strInstructions}</p>
          `;
        } else {
          mealResult.innerHTML = "<p>No results found.</p>";
        }
      });
  }
  
  let currentRating = 0;

  const stars = document.querySelectorAll('.star');
  const ratingValue = document.getElementById('ratingValue');
  
  // Event listener for rating stars
  stars.forEach(star => {
    star.addEventListener('click', () => {
      currentRating = star.getAttribute('data-rating');
      ratingValue.textContent = `Your Rating: ${currentRating}`;
      updateStarColors();
    });
  });
  
  // Update the color of stars based on rating
  function updateStarColors() {
    stars.forEach(star => {
      if (star.getAttribute('data-rating') <= currentRating) {
        star.style.color = '#f1c40f'; // Gold color for active stars
      } else {
        star.style.color = '#f4b400'; // Default color
      }
    });
  }
  
  // Add comment functionality
  function addComment() {
    const commentInput = document.getElementById("commentInput");
    const comment = commentInput.value.trim();
    
    if (comment === "") return;
  
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
  
    // Create comment with user input
    const commentText = document.createElement("p");
    commentText.textContent = comment;
  
    const commentRating = document.createElement("p");
    commentRating.textContent = `Rating: ${currentRating || 'Not rated yet'}`;
  
    commentDiv.appendChild(commentText);
    commentDiv.appendChild(commentRating);
  
    // Display the comment at the top of the comments container
    const commentsContainer = document.getElementById("commentsContainer");
    commentsContainer.prepend(commentDiv);
    
    // Clear the input field after posting the comment
    commentInput.value = "";
  }
  
  const vegDishes = [
    {
      img: "vegan1.jpg",
      title: "Vegan Salad",
      desc: "A refreshing and healthy salad made with fresh greens."
    },
    {
      img: "vegan2.jpg",
      title: "Vegan Burger",
      desc: "A delicious plant-based burger with all the flavors."
    },
    {
      img: "vegan3.jpg",
      title: "Vegan Tacos",
      desc: "Tasty tacos made with vegan-friendly ingredients."
    }
  ];
  
  const nonVegDishes = [
    {
      img: "nonveg1.jpg",
      title: "Grilled Chicken",
      desc: "A juicy grilled chicken served with sides."
    },
    {
      img: "nonveg2.jpg",
      title: "Beef Steak",
      desc: "Perfectly cooked beef steak with herbs and spices."
    },
    {
      img: "nonveg3.jpg",
      title: "Shrimp Curry",
      desc: "A spicy shrimp curry with rich flavors."
    }
  ];
  
  // Function to generate dish cards
  function createDishCards(dishes, containerId) {
    const container = document.querySelector(`#${containerId} .dish-cards`);
    dishes.forEach(dish => {
      const card = document.createElement("div");
      card.classList.add("dish-card");
      card.innerHTML = `
        <img src="${dish.img}" alt="${dish.title}">
        <h3>${dish.title}</h3>
        <p>${dish.desc}</p>
      `;
      container.appendChild(card);
    });
  }
  
  // Create cards for Vegan and Non-Vegan dishes
  createDishCards(vegDishes, "veg-dishes");
  createDishCards(nonVegDishes, "non-veg-dishes");
  