// Functionality for dropdown menu
function dropDownMenu() {
  var x = document.querySelector("#drop-down-menu");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}


// Function to fetch data from the provided URL
function fetchData(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch(error => console.error("Error fetching JSON:", error));
}


// Function to create DOM elements from JSON data array
function createElementsFromJSON(jsonDataArray) {
  // Loop through each JSON object in the array
  jsonDataArray.forEach(jsonData => {
    const container = document.getElementById(jsonData.id);
    if (!container) {
      console.error(`Container with ID ${jsonData.id} not found`);
      return; // Exit the loop iteration if container is not found
    }

    const contents = jsonData.data;
    for (let tag in contents) {
      if (contents.hasOwnProperty(tag)) {
        const element = document.createElement(tag);
        const innerContent = document.createTextNode(contents[tag]);

        element.appendChild(innerContent);
        // Add the newly created element and its content into the DOM
        container.appendChild(element);
      }
    }
  });
}


// Function to fetch and inject navbar HTML
function fetchAndInjectSection(section) {
  // Fetch the navbar HTML section
  const sectionURL = "sections/" + section + ".html"

  // Fetch and inject navbar HTML
  return fetch(sectionURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to load " + sectionURL);
      }
      return response.text();
    })
    .then(html => {
      // Inject the retrieved HTML into the document
      document.getElementById(section).innerHTML = html;
      console.log("loaded " + section);
    })
    .catch(error => console.error("Error loading section:", error));
}


// Function to fetch data and create DOM elements from JSON
function fetchAndInjectContent() {
  // Get the pathName of the current URL
  const pathName = window.location.pathname;

  // Extract the file name from the pathName
  const fileName = pathName.split("/").pop().replace("html", "json");
  const path = "content/" + fileName;

  // Fetch data and create DOM elements from JSON
  fetchData(path)
    .then(data => {
      createElementsFromJSON(data);
      console.log(data);
      console.log("loaded "+ path);
    });

  // populate footer
  const footerPath = "content/footer.json"
  fetchData(footerPath)
    .then(data => {
      createElementsFromJSON(data);
      console.log("loaded "+ footerPath);
    });
}


// Event listener for DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
  fetchAndInjectSection("nav");
  const fetchBugFix = fetchAndInjectSection("footer");

  fetchBugFix.then(() => {
    // Navbar fetch is complete, now fetch and inject content
    fetchAndInjectContent();
  });
});
