
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'

import useFetchPhotos from './hooks/useFetchPhotos'
import {
  favouritesReducer,
  loadFavourites,
} from './reducers/favouritesReducer'

function App() {
  const { photos, loading, error } = useFetchPhotos()
  const [search, setSearch] = useState('')

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    loadFavourites
  )

  useEffect(() => {
    localStorage.setItem(
      'photo-gallery-favourites',
      JSON.stringify(favourites)
    )
  }, [favourites])

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase()

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    )
  }, [photos, search])

  const toggleFavourite = (photo) => {
    dispatch({
      type: 'TOGGLE_FAVOURITE',
      photo,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold tracking-tight">
            Photo Gallery
          </h1>
          <span className="text-sm text-gray-500">
            Discover beautiful photos
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Explore photos
          </h2>
          <p className="mt-2 text-gray-600">
            Browse photos and save your favourites.
          </p>
        </div>

        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search photos by author..."
          aria-label="Search photos by author"
          className="mb-8 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        />

        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <span>
            Favourites: <strong>{favourites.length}</strong>
          </span>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div
              className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600"
              role="status"
              aria-label="Loading photos"
            />
          </div>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 p-4 text-red-700" role="alert">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <p className="mb-4 text-sm text-gray-500">
              Showing {filteredPhotos.length} of {photos.length} photos
            </p>

            {filteredPhotos.length === 0 ? (
              <p className="py-12 text-center text-gray-500">
                No photos found. Try another author name.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredPhotos.map((photo) => {
                  const isFavourite = favourites.some(
                    (item) => item.id === photo.id
                  )

                  return (
                    <article
                      key={photo.id}
                      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                    >
                      <img
                        src={`https://picsum.photos/id/${photo.id}/500/350`}
                        alt={`Photo by ${photo.author}`}
                        className="h-56 w-full object-cover"
                        loading="lazy"
                      />

                      <div className="flex items-center justify-between p-4">
                        <span className="font-medium">
                          {photo.author}
                        </span>

                        <button
                          type="button"
                          onClick={() => toggleFavourite(photo)}
                          aria-pressed={isFavourite}
                          aria-label={
                            isFavourite
                              ? `Remove ${photo.author} from favourites`
                              : `Add ${photo.author} to favourites`
                          }
                          className={`text-2xl transition ${
                            isFavourite
                              ? 'text-red-500'
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          {isFavourite ? '♥' : '♡'}
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}

export default App
