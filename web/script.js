const datedropdown = document.getElementById('datedropdown');
const searchBox = document.getElementById('search-box');
const searchBtn = document.getElementById('search-btn');
const RandomBtn = document.getElementById('random-btn')
const searchStatus = document.getElementById('search-status');
const sections = ['itn', 'tfa', 'dyk', 'otd'];
const searchSuggestions = document.getElementById('search-suggestions');



fetch("https://your-service.onrender.com/api/data")
.then(response => response.json())
.then(data => {
    let dates = Object.keys(data);
    dates.sort((a, b) => new Date(b) - new Date(a));

    dates.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        datedropdown.appendChild(option);
    })

    function updateAutoComplete(term) {
        searchSuggestions.innerHTML = ''; // Clear previous suggestions
        if (!term) return;

        const matches = [];

        Object.keys(data).forEach(date => {
            sections.forEach(section => {
                const items = data[date][section] || [];
                items.forEach(item => {
                    const words = item.split(/\s+/); // split by spaces
                    words.forEach(word => {
                        if (word.toLowerCase().includes(term.toLowerCase())) {
                            matches.push({text: word, fullItem: item, date, section});
                        }
                    });
                });
            });
        });

        matches.slice(0, 10).forEach(match => { // limit to 10 suggestions
            const li = document.createElement('li');
            li.textContent = `${match.text} (${match.section.toUpperCase()} - ${match.date})`;
            li.addEventListener('click', () => {
                searchBox.value = match.text;
                datedropdown.value = match.date;
                displayDataForDate(match.date);
                highlightSearch(match.text);
                searchStatus.textContent = `Found in ${match.section.toUpperCase()} on ${match.date}`;
                searchSuggestions.innerHTML = ''; // hide suggestions

                const sectionTile = document.getElementById(`${match.section}-tile`);
                if (sectionTile) {
                    sectionTile.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
            searchSuggestions.appendChild(li);
        });
    }

    searchBox.addEventListener('input', (e) => {
        const term = e.target.value.trim();
        updateAutoComplete(term);
    });

    function displayDataForDate(selectedDate){
        const sections = ['itn', 'tfa', 'dyk', 'otd'];
        const dateData = data[selectedDate];

        sections.forEach(section => {
            const tile = document.getElementById(`${section}-tile`);
            const list = tile.querySelector('ul');
            list.innerHTML = '';
            if (dateData[section] && dateData[section].length > 0) {
                dateData[section].forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    li.addEventListener('click', () => {
                        const sectionTitle = tile.querySelector('h3').textContent; 
                        showFactFullscreen(item, sectionTitle);
                    });
                    list.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = 'No data available';
                list.appendChild(li);
            }
        });
        
    }

    datedropdown.addEventListener('change',(event) => {
        const selectedDate = event.target.value;
        displayDataForDate(selectedDate);
    });

    if (dates.length > 0) {
        const latest_date = dates[0];
        datedropdown.value = latest_date;
        displayDataForDate(latest_date);
    }
    RandomBtn.addEventListener('click', () => {
        let randomDate = dates[Math.floor(Math.random() * dates.length)];
        let randomSection = sections[Math.floor(Math.random() * sections.length)];
        let sectionsItems = data[randomDate][randomSection];
        let randomFact = sectionsItems[Math.floor(Math.random() * sectionsItems.length)];
        let sectionSentence = '';
        if (randomSection === "dyk") {
            sectionSentence = `Did you know that on ${randomDate}:`;
        } else if (randomSection === "otd") {
            sectionSentence = `On ${randomDate} in history:`;
        } else if (randomSection === "itn") {
            sectionSentence = `In the news on ${randomDate}:`;
        } else if (randomSection === "tfa") {
            sectionSentence = `Featured article from ${randomDate}:`;
        }

        showFactFullscreen(randomFact, sectionSentence);


    })
    
    searchBtn.addEventListener('click', () => {
        const term = searchBox.value.toLowerCase().trim();
        if (!term) {
            searchStatus.textContent = "Please enter a search term.";
            return;
        }

        let found = false;

        for (let date of Object.keys(data).reverse()) {
            const dateData = data[date];
            const sections = ['itn', 'tfa', 'dyk', 'otd'];

            for (let section of sections) {
                if (dateData[section]) {
                    const match = dateData[section].some(item =>
                        item.toLowerCase().includes(term)
                    );

                    if (match) {
                        datedropdown.value = date;
                        displayDataForDate(date);
                        highlightSearch(term);

                        searchStatus.textContent = `Found in ${section.toUpperCase()} on ${date}`;
                        found = true;
                        return;
                    }
                }
            }
        }

        if (!found) {
            searchStatus.textContent = "No matches found.";
        }
    });

    
})
.catch(error => console.error("Error fetching data:", error));

document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    // Load saved theme
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true; // show switch as ON
    }

    darkModeToggle.addEventListener("change", () => {
        if (darkModeToggle.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }
    });

});

function highlightSearch(term) {
    if (!term) return;
    const sections = ['itn', 'tfa', 'dyk', 'otd'];
    sections.forEach(section => {
        const tile = document.getElementById(`${section}-tile`);
        const listItems =tile.querySelectorAll('li');

        listItems.forEach(li => {
            const text = li.textContent;
            const regex = new RegExp(`(${term})`, 'gi');
            li.innerHTML = text.replace(regex,  '<span class="highlight">$1</span>');
        });

    });
}

function showFactFullscreen(text, sectionTitle) {
    const box = document.getElementById('fact-box');
    const content = document.getElementById('fact-content');
    const title = document.getElementById('fact-title');

    content.textContent = text;
    title.textContent = sectionTitle;


    box.classList.remove('hidden');

    setTimeout(() => {
        box.dataset.active ="true";
    },0);
}

document.addEventListener('click', (e) => {
    const factBox = document.getElementById('fact-box');
    const factContent = document.getElementById('fact-content');

    if (factBox.dataset.active === "true" && !factContent.contains(e.target)) {
        factBox.classList.add('hidden');
        factBox.dataset.active = "false";
    }
});

document.addEventListener('keydown', (e) => {
    const factBox = document.getElementById('fact-box');
    if (e.key === 'Escape' && !factBox.classList.contains('hidden')) {
        factBox.classList.add('hidden');
        factBox.dataset.active = "false";
    }
});



document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target) && !searchSuggestions.contains(e.target)) {
        searchSuggestions.innerHTML = '';
    }
});
