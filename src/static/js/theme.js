(function() {
  // Theme management
  const STORAGE_KEY = 'theme-preference';
  
  // Get saved theme or detect system preference
  const getThemePreference = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Apply theme to document
  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  // Save theme preference
  const saveThemePreference = (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
  };

  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    saveThemePreference(newTheme);
  };

  // Initialize theme on page load
  const initTheme = () => {
    const theme = getThemePreference();
    applyTheme(theme);
  };

  // Watch for system theme changes
  const watchSystemTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      // Only apply system theme if user hasn't set a preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  };

  // Run initialization immediately (before DOM loads to prevent flash)
  initTheme();

  // Set up event listeners after DOM loads
  document.addEventListener('DOMContentLoaded', () => {
    // Attach click handler to theme toggle button
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }

    // Watch for system theme changes
    watchSystemTheme();
  });

  // Expose toggle function globally for Alpine.js or other uses
  window.toggleTheme = toggleTheme;
})();