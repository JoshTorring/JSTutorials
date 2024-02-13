// Fetch API
// Callbacks, Promises, Thenables, Async/Awaits...


// maybe from a form (as if triggered by the submit button on a form).



const categories = [
    "age", "alone", "amazing", "anger", "architecture",
    "art", "attitude", "beauty", "best", "birthday",
    "business", "car", "change", "communication", "computers",
    "cool", "courage", "dad", "dating", "death",
    "design", "dreams", "education", "environmental", "equality",
    "experience", "failure", "faith", "family", "famous",
    "fear", "fitness", "food", "forgiveness", "freedom",
    "friendship", "funny", "future", "god", "good",
    "government", "graduation", "great", "happiness", "health",
    "history", "home", "hope", "humor", "imagination",
    "inspirational", "intelligence", "jealousy", "knowledge", "leadership",
    "learning", "legal", "life", "love", "marriage",
    "medical", "men", "mom", "money", "morning",
    "movies", "success"
  ];

const createOptions = (parent, text) => {
    const newOption = document.createElement("option");
    newOption.value = text;
    newOption.textContent = text.toUpperCase();
    parent.append(newOption);
}

const addCategories = () => {
    const categorySelector = document.querySelector("#category-select");
    categories.forEach((element) => {
        createOptions(categorySelector, element)
    })
}


document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        console.log("readyState: complete");
        addCategories();
        initApp();
    }
});

const initApp = () => {
    const submitButton = document.querySelector("#submit-btn");
    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        console.log("submit event");
        processQuoteRequest();
    });
};




const buildRequestUrl = (selectedCategory) => {
    let builtUrl;
    if (selectedCategory === "RANDOM") {
        const randomPick = Math.floor(Math.random()*categories.length);
        const category = categories[randomPick];
        builtUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`
    } else {
        builtUrl = `https://api.api-ninjas.com/v1/quotes?category=${selectedCategory}`;
    }
    return builtUrl;
}

const requestAQuote = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'X-Api-Key': 'Uf2F+Z8T9U8AjzNiDixz0g==1UcrsdVnvD4chDVi' },
        contentType: 'application/json',
    });
    const quoteResponse = await response.json(); 
    
    postQuoteToPage(quoteResponse);
}

const postQuoteToPage = (quoteResponse) => {
    const quoteDisplay = document.querySelector("#quote-display");
    const authorDisplay = document.querySelector("#author-display");
    console.log(quoteResponse);
    const quote = `\u{0275D}${quoteResponse[0].quote}\u{0275E}`
    const author = `\u{02712}  ${quoteResponse[0].author}`
    quoteDisplay.textContent = quote;
    authorDisplay.textContent = author;
}

// procedural workflow function (this is what would be triggered by clicking submit on the form).

const processQuoteRequest = async () => {
    const selectElement = document.getElementById('category-select');
    const selectedCategory = selectElement.options[selectElement.selectedIndex].text;
    const requestUrl = buildRequestUrl(selectedCategory);
    console.log(requestUrl);
    await requestAQuote(requestUrl);
    console.log("finished!");
}