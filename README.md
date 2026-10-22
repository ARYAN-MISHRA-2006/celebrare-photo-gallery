
# Celebrare Photo Gallery

A responsive photo gallery built with React, Vite, and Tailwind CSS for the Celebrare Frontend Internship pre-screening assignment.

## Features

- Fetches 30 photos from the Picsum Photos API
- Displays photos in a responsive grid
- Searches photos by author name in real time
- Adds and removes favourites using React's useReducer
- Persists favourites across page refreshes using localStorage
- Handles loading and API error states
- Uses useCallback and useMemo for the search functionality

## Tech Stack

- React
- Vite
- Tailwind CSS
- Picsum Photos API

## Getting Started

### Prerequisites

Install Node.js and npm.

### Installation

Clone the repository:

```bash
git clone https://github.com/ARYAN-MISHRA-2006/celebrare-photo-gallery.git
cd celebrare-photo-gallery
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## API

Photos are fetched from:

https://picsum.photos/v2/list?limit=30

## Author

Aryan Mishra
