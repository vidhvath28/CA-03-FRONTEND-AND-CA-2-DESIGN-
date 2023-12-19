
    // Fetch a random meal and update the UI on page load and when the 'todays-dish' element is clicked
    async function fetchRandomMeal() {
        try {
          const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
          const data = await response.json();
          const randomMeal = data.meals[0];
  
          document.querySelector('.todays-dish').innerText = randomMeal.strMeal;
          document.querySelector('.pasta-1-icon').src = randomMeal.strMealThumb;
        } catch (error) {
          console.error('Error fetching random meal:', error);
        }
      }
      window.addEventListener('load', fetchRandomMeal);
      document.querySelector('.todays-dish').addEventListener('click', fetchRandomMeal);
  
      
  
     
      const button = document.getElementById('search');
      button.addEventListener('click', () => {
          const customerInput = document.getElementById('customerInput');
          const row = document.getElementById('row');
      // Fetch meals based on user input and update the UI
          fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${customerInput.value}`)
              .then(response => response.json())
              .then(data => {
                  let html = " ";
                  if (data.meals) {
                      data.meals.forEach(meal => {
                          html += `
                              <div class="col-md-3" style="margin-top: 20px;" data-id="${meal.idMeal}">
                              <div class=" card text-center "  style="background-color:#F8F7F5;border-radius: 2%; ">
                                  <img src="${meal.strMealThumb}" data-id="${meal.idMeal}" class="card-img-top " style="width: 100%; border-top-right-radius: 2%; border-top-left-radius: 2%; ">
                                  <div class="card-body " data-id="${meal.idMeal}" style="padding-top: 7px;padding-bottom: 7px; ">
                                      <h3 class="card-text text-center " data-id="${meal.idMeal}" style="font-size:17px">${meal.strMeal}</h3>
                                  </div>
                              </div>
                          </div>
                              `;
                      });
                  } else {
                    // Display a message if no meals are found
                      html = "Didn't Find Any Food for You.";
                      row.classList.add('not-found');
                  }
                  row.innerHTML = html;
              })
      });
      
 
 // Function to handle meal search and update UI
    function searchMeal() {
        const customerInput = document.getElementById('customerInput');
        const row = document.getElementById('row');
         // Fetch meals based on user input and update the UI
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${customerInput.value}`)
            .then(response => response.json())
            .then(data => {
                let html = " ";
                if (data.meals) {
                    data.meals.forEach(meal => {
                        html += `
                            <div class="col-md-3" style="margin-top: 20px;" data-id="${meal.idMeal}">
                                <div class="card text-center "  style="background-color:#F8F7F5;border-radius: 2%; ">
                                    <img src="${meal.strMealThumb}" data-id="${meal.idMeal}" class="card-img-top " style="width: 100%; border-top-right-radius: 2%; border-top-left-radius: 2%; ">
                                    <div class="card-body " data-id="${meal.idMeal}" style="padding-top: 7px;padding-bottom: 7px; ">
                                        <h3 class="card-text text-center " data-id="${meal.idMeal}" style="font-size:17px">${meal.strMeal}</h3>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                } else {
                    html = "Didn't Find Any Food for You.";
                    row.classList.add('not-found');
                }
                row.innerHTML = html;
            });
    }

    const button1 = document.getElementById('search');
    button1.addEventListener('click', searchMeal);

    const row = document.getElementById('row');
    row.addEventListener('click', (event) => {
        const idFind = event.target;
        const detailsId = idFind.dataset.id;
         // Fetch details of the selected meal
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${detailsId}`)
            .then(response => response.json())
            .then(data => {
                const details = document.getElementById('details');
                details.style.display = 'block';
                let itemDetails = " ";
                if (data.meals) {
                    data.meals.forEach(meal => {
                        itemDetails += `
                            <div class="card mb-3">
                                <button type="button" class="close" aria-label="Close">
                                    <span aria-hidden="true" id="close" style="margin-right: 10px;margin-top: 15px;font-size: 40px;">&times;</span>
                                </button>
                                <img class="card-img-top" style="width: 40%; border-top-right-radius: 2%; border-top-left-radius: 2%; margin-top:20px; " src="${meal.strMealThumb}" data-id="${meal.idMeal}" alt="Card image cap">
                                <div class="card-body">
                                    <h4>Category: <span>${meal.strCategory}</span></h4>
                                    <h5 class="card-title text-lite">Item: <span>${meal.strArea}</span></h5>
                                    <p class="card-text text-center" style="width: 80%;margin:auto;padding-bottom: 30px; font-size:20px;font-weight:bold;">Details: <span style="font-size:15px;font-weight:400;">${meal.strInstructions}</span></p>
                                </div>
                            </div>
                        `;
                    });
                    details.innerHTML = itemDetails;

                    const close = document.getElementById('close');
                    close.addEventListener('click', () => {
                        details.style.display = 'none';
                    });
                }
            });
    });
