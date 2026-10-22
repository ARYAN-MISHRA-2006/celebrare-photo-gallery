
const STORAGE_KEY = 'photo-gallery-favourites'

export function loadFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const exists = state.some(
        (photo) => photo.id === action.photo.id
      )

      if (exists) {
        return state.filter(
          (photo) => photo.id !== action.photo.id
        )
      }

      return [...state, action.photo]
    }

    default:
      return state
  }
}
