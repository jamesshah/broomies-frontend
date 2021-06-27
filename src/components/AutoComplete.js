import React, { useState, useCallback, useEffect } from 'react'
import { FormControl, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { GeoAlt } from 'react-bootstrap-icons'

const AutoComplete = ({
  className,
  placeholder,
  userLocation,
  setUserLocation,
}) => {
  // const place = placeName
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [valid, setValid] = useState(true)

  useEffect(() => {
    setSearch(userLocation?.place_name)
  }, [userLocation])

  const makeRequest = async (query) => {
    console.log(query)
    if (query) {
      setLoading(true)
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?country=IN&autocomplete=true&access_token=pk.eyJ1IjoidmV3YW1hbTI5MSIsImEiOiJja3E0MG81c3kwaWxyMnZvNjFtbnFjNjY0In0.4eO5797VhghTYmHa1MPG8w`

      let results = await axios.get(url)
      let features = results.data.features
      if (features.length !== 0) {
        setSuggestions(features)
        setLoading(false)
        setValid(true)
      } else {
        setSuggestions([])
        setLoading(false)
        setValid(false)
      }
    } else {
      setLoading(false)
      setValid(true)
      setSuggestions([])
    }
  }

  const listOnClick = (suggestion) => {
    setValid(true)
    setLoading(false)
    setSuggestions([])
    setSearch(suggestion.place_name)
    setUserLocation(suggestion)
  }

  // eslint-disable-next-line
  const debouncedSave = useCallback(
    debounce((newValue) => makeRequest(newValue), 1000),
    []
  )

  //   const getSuggestions = (query) => {

  const updateValue = (newValue) => {
    // console.log(search)
    setLoading(true)
    setSearch(newValue)
    // setUserLocation(newValue)
    debouncedSave(newValue)
  }

  return (
    <>
      <FormControl
        type='text'
        // className={className}
        placeholder={placeholder ? placeholder : 'Find broomies near...'}
        value={search}
        onChange={(e) => updateValue(e.target.value)}
        required
      />
      <ListGroup className={className}>
        {loading && <ListGroup.Item>Loading...</ListGroup.Item>}
        {!valid && !loading && (
          <ListGroup.Item>Please select a valid location</ListGroup.Item>
        )}
        {suggestions.length > 0 &&
          !loading &&
          suggestions.map((suggestion) => {
            return (
              <ListGroup.Item
                action
                key={suggestion.id}
                onClick={() => listOnClick(suggestion)}
              >
                <GeoAlt className='me-2' />
                {suggestion.place_name}
              </ListGroup.Item>
            )
          })}
      </ListGroup>
    </>
  )
}

export default AutoComplete
