# DLS Team — Take-Home Assessment

## Scenario
We've accidentally deleted our reusable component library repository(!) but thankfully we were able to recover some unit tests from an old backup. Can you help us recreate our component?

## Instructions
You should spend no more than 2.5 hours in total on the challenge as a whole.
Each task is of equal importance, so it is better to partially complete both tasks rather than fully complete one, leaving comments as to your intention.
We are interested in seeing your performance on the task within the given time, and will take the given time into consideration when assessing performance.
The resulting code repository should be provided back to us as a GitHub repository.

## Task One — Configuration and Documentation
Your initial task is to build a repository that we could use as a foundation for a component library. Use technology and packages that you are comfortable with. As a quick-start we would recommend:

- TypeScript
- React
- React Testing Library
- Vitest


Consider how you might handle linting, formatting, and any other Developer Experience improvements or quality of life support. Include these in the README.md as future improvements.
You are free to configure the project however you like. What is important is that you document the choices you make and why you made them.

If you run out of time to perform the actual configuration, please document what you would have done.

## Task Two — Component Build
Using the following unit test as a foundation, recreate a reusable component that would result in all of these tests passing.

Whilst the unit test was originally written with a specific testing library, if you need to refactor the functions to reflect a different package that is fine.

Consider the flexibility of this component, how you might break this down for different use cases, what configuration the end-consumer might need or want.

NOTE: However you configure the project from Task One, the expectation would be that this component can be seen rendered.

```typescript
describe('Accordion', () => {  
  test('renders accordion with multiple panels', () => {  
    render(/** Your component **/);  
    const buttons = screen.getAllByRole('button');  
    expect(buttons).toHaveLength(3);  
    expect(screen.queryByText('Content for panel one')).toBeNull();  
    expect(screen.queryByText('Content for panel two')).toBeNull();  
    expect(screen.queryByText('Content for panel three')).toBeNull();  
  });  
  
  test('shows content for the clicked panel and hides the rest', async () => {  
    const { user } = renderWithUser(/** Your component **/);  
    const buttons = screen.getAllByRole('button');  
    await user.click(buttons[1]);  
    expect(screen.getByText('Content for panel two')).toBeVisible();  
    expect(screen.queryByText('Content for panel one')).toBeNull();  
    expect(screen.queryByText('Content for panel three')).toBeNull();  
  });  
  
  test('hides content when an expanded panel is clicked again', async () => {  
    const { user } = renderWithUser(/** Your component **/);  
    const buttons = screen.getAllByRole('button');  
    await user.click(buttons[2]);  
    expect(screen.getByText('Content for panel three')).toBeVisible();  
    await user.click(buttons[2]);  
    expect(screen.queryByText('Content for panel three')).toBeNull();  
  });  
  
  test('can expand multiple panels at the same time by default', async () => {  
    const { user } = renderWithUser(/** Your component **/);  
    const buttons = screen.getAllByRole('button');  
    await user.click(buttons[0]);  
    await user.click(buttons[2]);  
    expect(screen.getByText('Content for panel one')).toBeVisible();  
    expect(screen.queryByText('Content for panel two')).toBeNull();  
    expect(screen.getByText('Content for panel three')).toBeVisible();  
  });  
  
  describe('when shouldAllowMultipleExpanded is false', () => {  
    test('only one panel is visible at a time', async () => {  
      const { user } = renderWithUser(/** Your component **/);  
      const buttons = screen.getAllByRole('button');  
      await user.click(buttons[0]);  
      expect(screen.getByText('Content for panel one')).toBeVisible();  
      await user.click(buttons[2]);  
      expect(screen.getByText('Content for panel three')).toBeVisible();  
      expect(screen.queryByText('Content for panel one')).toBeNull();  
    });  
  });  
  
  describe('accessibility', () => {  
    test('each button has aria-controls pointing to its content region', () => {  
      render(/** Your component **/);  
      const buttons = screen.getAllByRole('button');  
      buttons.forEach((button) => {  
        const controlsId = button.getAttribute('aria-controls');  
        expect(controlsId).toBeTruthy();  
        expect(document.getElementById(controlsId!)).toBeInTheDocument();  
      });  
    });  
  
    test('content regions have aria-labelledby pointing back to their header', () => {  
      render(/** Your component **/);  
      const regions = screen.getAllByRole('region', { hidden: true });  
      regions.forEach((region) => {  
        const labelledBy = region.getAttribute('aria-labelledby');  
        expect(labelledBy).toBeTruthy();  
        expect(document.getElementById(labelledBy!)).toBeInTheDocument();  
      });  
    });  
  });  
});
```