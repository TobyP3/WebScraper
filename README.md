# Trivipedia

Trivipedia is a full-stack web application that scrapes Wikipedia’s main page and presents daily trivia in a clean, interactive interface. The project demonstrates both backend and frontend development skills, including web scraping, data processing, API design, and dynamic client-side rendering.

## Features

- **Web Scraping:** Automatically fetches sections from Wikipedia’s main page:
  - **ITN** – In The News
  - **TFA** – Today’s Featured Article
  - **DYK** – Did You Know?
  - **OTD** – On This Day

- **Data Storage:** Saves scraped data as a CSV for persistence.

- **Backend API:**
  - Built with **FastAPI**
  - Serves JSON-formatted trivia data for the frontend
  - Handles CORS to allow client requests

- **Frontend Features:**
  - **Dynamic dropdown** to select a date
  - **Search box with autocomplete**
  - **Highlighting** of search terms within trivia
  - **Dark mode toggle** (saves preference in localStorage)
  - **Random Fact Button** – shows a random trivia item (work in progress)

## Tech Stack

- **Backend:** Python, FastAPI, Pandas, BeautifulSoup
- **Frontend:** HTML, CSS, JavaScript
- **Persistence:** CSV (planned future switch to database)

The stack demonstrates **full-stack integration**: the backend scrapes and processes Wikipedia data, then exposes it via an API. The frontend consumes the API, dynamically renders content, and allows interactive features like search, highlights, and dark mode.

## Future Enhancements

Planned improvements include:

- Switching from CSV storage to a database
- Scheduling automated scraping jobs
- Additional API endpoints for flexibility
- UI improvements using frameworks like Tailwind or Bootstrap
- Expanding the Random Fact button functionality
- Favorites system (localStorage or user login)
- Summarization via NLP or OpenAI API
- Visualizations such as timelines or charts
- Related article recommendations
- Dockerization and deployment to platforms like Render, Netlify, or Vercel

## Project Goals

- Showcase **full-stack development skills** by integrating scraping, backend API, and dynamic frontend features.
- Demonstrate ability to **process and structure real-world data** efficiently.
- Create an **interactive and user-friendly interface** highlighting search, random facts, and dark mode.
