describe('DogPage', () => {
    it('renders loading component for the initial render');
    it('renders loading component if no dog images are fetched');
    it('renders loading component if the fetch call is being made');
    it('renders DogCard components when dog images data are available');
    it('renders only unique dog image - filters the duplicates');
    it('fetches additional dog images when the scroll reaches to the bottom and renders them');
    it('tests the debounce allows the additional dog image fetch per certain time period');
});