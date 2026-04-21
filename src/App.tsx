
import './App.css'
import { Accordion } from './lib/components/accordion'

function App() {

  return (
    <>
      <Accordion
        panels={[
          { title: 'Panel one', content: 'Content for panel one' },
          { title: 'Panel two', content: 'Content for panel two' },
          { title: 'Panel three', content: 'Content for panel three' },
    ]}
  />
    </>
  )
}

export default App
