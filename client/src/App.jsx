import { useState, useEffect } from 'react'
import axios from 'axios'

import Button from './components/library/Button'
import Card from './components/Card'
import Alert from './components/Alert'
import Accordion from './components/Accordion'
import IconPreview from './components/IconPreview'

export default function App() {
  const [requestLog, setRequestLog] = useState([])
  function simulateHTTPRequest(q) {
    setRequestLog((v) => [...v, q])
  }

  const [flippedCard, setFlippedCard] = useState(null)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [bio, setBio] = useState('')

  const [iconStyle, setIconStyle] = useState({ background: '#ffffff', foreground: '#2b1f0f' })

  const [produceData, setProduceData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [dataError, setDataError] = useState(undefined)
  useEffect(() => {
    axios.get('/api/produce')
      .then((response) => {
        setProduceData(response.data)
      })
      .catch((error) => {
      })
      .finally(() => {
      })
  }, [])

  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => {
    simulateHTTPRequest(searchQuery)
  }, [])

  const cardData = [
    {
      id: 'galaxy',
      imgUri: "/images/galaxy.webp",
      altText: "galaxy",
      caption: "A galaxy is a collection of stars, gas, and dust held together by gravity.",
      citation: "Microsoft Copilot",
    },
    {
      id: 'asteroid',
      imgUri: '/images/asteroid.webp',
      altText: 'asteroid',
      caption: 'An asteroid is a small rocky body that orbits the sun.',
    },
    {
      id: 'black-hole',
      imgUri: '/images/black-hole.webp',
      altText: 'black hole',
      caption: 'A black hole, a region of space where gravity is so strong that nothing can escape it.',
    },
    {
      id: 'cloud-nebulae',
      imgUri: '/images/cloud-nebulae.webp',
      altText: 'cloud nebulae',
      caption: 'A cloud of gas and dust in space.',
      bgColor: '#d8e0ff',
    },
    {
      id: 'distant-space',
      imgUri: '/images/distant-space.webp',
      altText: 'distant space',
      citation: 'Microsoft Copilot',
      bgColor: '#c9f4e2',
    },
    {
      id: 'galaxy-collision',
      imgUri: '/images/galaxy-collision.webp',
      altText: 'galaxy collision',
      caption: 'A galaxy collision is a cosmic event that occurs when two or more galaxies come close enough to interact gravitationally.',
    },
    {
      id: 'moon',
      imgUri: '/images/moon.webp',
      altText: 'moon',
      citation: 'Microsoft Copilot',
    },
    {
      id: 'pulsar',
      imgUri: '/images/pulsar.webp',
      caption: 'A pulsar is a rapidly rotating neutron star that emits beams of electromagnetic radiation.',
      altText: 'pulsar',
      bgColor: '#e3cef2',
    },
    {
      id: 'star-death',
      imgUri: '/images/star-death.webp',
      altText: 'star death',
      caption: 'The death of a star is a natural part of its life cycle.',
    },
    {
      id: 'sun',
      imgUri: '/images/sun.webp',
      altText: 'sun',
      caption: 'The sun is a star at the center of our solar system.',
    }
  ]

  const accordionData = [
    {
      title: 'What is a galaxy?',
      content: <p>A galaxy is a huge collection of stars, gas, and dust held together by gravity. Our solar system is part of the <strong>Milky Way</strong> galaxy.</p>,
    },
    {
      title: 'How do black holes work?',
      content: <p>A black hole is a region of space where gravity is so strong that nothing, not even light, can escape <em>once it crosses the event horizon</em>.</p>,
    },
    {
      title: 'What is a pulsar?',
      content: <p>A pulsar is a rapidly rotating neutron star that emits beams of radiation. As it spins, those beams sweep across space like a lighthouse signal.</p>,
    }
  ]

  return (
    <main>
      {!!dataError && // TODO: show when rejected
        <Alert message="Error fetching produce data." />
      }

      <h2>Component Library & HTTP Request Data</h2>
      <div className="space-x-4">
        {!!isLoading && // TODO: show when pending
          <ul className="flex flex-wrap gap-2">
            {Array.from({ length: 16 }).map((_, index) => (
              <li className="inline-block" key={index}>
                <div className="h-12 w-32 bg-gray-50 rounded-2xl animate-pulse" />
              </li>
            ))}
          </ul>
        }

        {producedData && // TODO: show when fulfilled
          <ul className="flex flex-wrap gap-2">
            {produceData.map((item) => (
              <li className="inline-block" key={item.id}>
                <Button>{item.name}</Button>
              </li>
            ))}
          </ul>
        }
      </div>

      <h2>Debounce</h2>
      <input type="text" placeholder="Search..." className="mb-4 p-2 border rounded bg-white"
        value={searchQuery}
        onChange={(e) => { setSearchQuery(e.target.value) }}
      />

      <ol className="list-decimal ml-4">
        {requestLog.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ol>

      <h2><abbr title="Frequently Asked Questions">FAQ</abbr></h2>
      <Accordion items={accordionData} />

      <h2>Gallery</h2>
      <div className="gallery">
        {cardData.map((card, index) => (
          <Card
            key={card.id}
            imgUri={card.imgUri}
            altText={card.altText}
            caption={card.caption}
            citation={card.citation}
            bgColor={card.bgColor}
            isFlipped={flippedCard === card.id}
            onFlip={(showBack) => setFlippedCard(showBack ? card.id : null)}
          />
        ))}
      </div>

      <h2>Icon Editor</h2>
      <section className="icon-editor" aria-label="Icon editor">
        <div className="icon-editor-controls">
          <label htmlFor="icon-background">Background</label>
          <input
            id="icon-background"
            type="color"
            value={iconStyle.background}
            onChange={(event) => setIconStyle((style) => ({ ...style, background: event.target.value }))}
          />

          <label htmlFor="icon-foreground">Foreground</label>
          <input
            id="icon-foreground"
            type="color"
            value={iconStyle.foreground}
            onChange={(event) => setIconStyle((style) => ({ ...style, foreground: event.target.value }))}
          />
        </div>

        <IconPreview
          backgroundColor={iconStyle.background}
          foregroundColor={iconStyle.foreground}
        />
      </section>

      <h2>Controlled Inputs</h2>

      <label>
        <input type="checkbox"
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        Accept terms and conditions
      </label>

      <label htmlFor="bio">Bio</label>
      <textarea
        id="bio"
        placeholder="Tell us about yourself..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <h2>Debug Info</h2>
      <p>{new Date().toLocaleString()}</p>
    </main>
  )
}
