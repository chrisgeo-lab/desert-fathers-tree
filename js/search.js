// js/search.js

function setupSearch(network, nodes) {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
      const results = nodes.get({
        filter: (item) => {
          return item.label.toLowerCase().includes(searchTerm);
        },
      });
      if (results.length > 0) {
        network.focus(results[0].id, {
          scale: 1.5,
          animation: {
            duration: 1000,
            easingFunction: 'easeInOutQuad',
          },
        });
        network.selectNodes([results[0].id]);
      } else {
        alert('No results found.');
      }
    }
  });
}
