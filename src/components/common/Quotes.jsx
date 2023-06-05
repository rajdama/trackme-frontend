import { useEffect, useState } from 'react'

const Quotes = () => {
  const [quotes, setquotes] = useState({})

  const fetchquotes = () => {
    fetch('https://type.fit/api/quotes')
      .then((response) => response.json())
      .then((response) => {
        setquotes(response[getRndInteger(0, 1200)])
      })
      .catch((err) => console.error(err))
  }

  const getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  useEffect(() => {
    fetchquotes()
  }, [])

  return (
    <div className="quotes">
      <div id="say">{quotes['text']}</div>
      <div id="aname">- {quotes['author']}</div>
    </div>
  )
}

export default Quotes
