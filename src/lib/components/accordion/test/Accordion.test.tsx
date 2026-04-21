import {describe, test, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import {Accordion} from '../Accordion'
import { renderWithUser } from './renderWithUser'
import '@testing-library/jest-dom'

const panels = [
  { title: 'Panel one', content: 'Content for panel one' },
  { title: 'Panel two', content: 'Content for panel two' },
  { title: 'Panel three', content: 'Content for panel three' },
]

describe('Accordion', () => {  
  test('renders accordion with multiple panels', () => {  
    render(<Accordion panels={panels}/>);  
    const buttons = screen.getAllByRole('button');  
    expect(buttons).toHaveLength(3);  
    // expect(screen.queryByText('Content for panel one')).toBeNull();  
    // expect(screen.queryByText('Content for panel two')).toBeNull();  
    // expect(screen.queryByText('Content for panel three')).toBeNull();  
    expect(screen.queryByText('Content for panel one')).not.toBeVisible();
    expect(screen.queryByText('Content for panel two')).not.toBeVisible();  
    expect(screen.queryByText('Content for panel three')).not.toBeVisible(); 
  });  
  
  test('shows content for the clicked panel and hides the rest', async () => {  
    const { user } = renderWithUser(<Accordion panels={panels}/>);  
    const buttons = screen.getAllByRole('button');  
    await user.click(buttons[1]);  
    // expect(screen.getByText('Content for panel two')).toBeVisible();  
    // expect(screen.queryByText('Content for panel one')).toBeNull();  
    // expect(screen.queryByText('Content for panel three')).toBeNull();  
    expect(screen.getByText('Content for panel two')).toBeVisible();  
    expect(screen.queryByText('Content for panel one')).not.toBeVisible();  
    expect(screen.queryByText('Content for panel three')).not.toBeVisible();  
  });  
  
  test('hides content when an expanded panel is clicked again', async () => {  
    const { user } = renderWithUser(<Accordion panels={panels}/>);  
    const buttons = screen.getAllByRole('button');  
    await user.click(buttons[2]);  
    expect(screen.getByText('Content for panel three')).toBeVisible();  
    await user.click(buttons[2]);  
    // expect(screen.queryByText('Content for panel three')).toBeNull();  
    expect(screen.queryByText('Content for panel three')).not.toBeVisible();  
    
  });  
  
  test('can expand multiple panels at the same time by default', async () => {  
    const { user } = renderWithUser(<Accordion panels={panels}/>);  
    const buttons = screen.getAllByRole('button');  
    await user.click(buttons[0]);  
    await user.click(buttons[2]);  
    expect(screen.getByText('Content for panel one')).toBeVisible();  
    // expect(screen.queryByText('Content for panel two')).toBeNull();  
    expect(screen.queryByText('Content for panel two')).not.toBeVisible();  
    expect(screen.getByText('Content for panel three')).toBeVisible();  
  });  
  
  describe('when allowMultiplePanelsExpanded is false', () => {  
    test('only one panel is visible at a time', async () => {  
      const { user } = renderWithUser(<Accordion panels={panels} allowMultiplePanelsExpanded={false}/>);  
      const buttons = screen.getAllByRole('button');  
      await user.click(buttons[0]);  
      expect(screen.getByText('Content for panel one')).toBeVisible();  
      await user.click(buttons[2]);  
      expect(screen.getByText('Content for panel three')).toBeVisible();  
      // expect(screen.queryByText('Content for panel one')).toBeNull();  
      expect(screen.queryByText('Content for panel one')).not.toBeVisible();  
    });  
  });  
  
  describe('accessibility', () => {  
    test('each button has aria-controls pointing to its content region', () => {  
      render(<Accordion panels={panels}/>);  
      const buttons = screen.getAllByRole('button');  
      buttons.forEach((button) => {  
        const controlsId = button.getAttribute('aria-controls');  
        expect(controlsId).toBeTruthy();  
        expect(document.getElementById(controlsId!)).toBeInTheDocument();  
      });  
    });  
  
    test('content regions have aria-labelledby pointing back to their title', () => {  
      render(<Accordion panels={panels}/>);  
      const regions = screen.getAllByRole('region', { hidden: true });  
      regions.forEach((region) => {  
        const labelledBy = region.getAttribute('aria-labelledby');  
        expect(labelledBy).toBeTruthy();  
        expect(document.getElementById(labelledBy!)).toBeInTheDocument();  
      });  
    });  
  });  
});