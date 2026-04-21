# Reusable Component Library

This library can be imported into your project to utilize reusable React components. 

## Tech and packages used:

- Typescript
- React
- React Testing Library
- Vitest

## Formatting / Linting

- Prettier
- ES Lint

## Components Included
 - Accordion

# Installation
```bash
npm install @reusable-component-library
```
## Usage
 To use the component library, import a component:

 ```javascript
import { Accordion } from '@your-scope/accordion'

const panels = [
  { title: 'Panel one', content: 'Content for panel one' },
  { title: 'Panel two', content: 'Content for panel two' },
  { title: 'Panel three', content: 'Content for panel three' },
]

export function App() {
  return 
}
```


## Testing
Testing is done through Vitest, React Testing Library, and Jest

Run this command to start testing. 
```bash 
npx vitest
```