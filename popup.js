document.addEventListener('DOMContentLoaded', function () {
    const insightsElement = document.getElementById('insights');
    const startBtn = document.getElementById('startBtn');
  
    // Event listener for the Start Tracking button
    startBtn.addEventListener('click', function () {
      // You can implement tracking logic here
      // For simplicity, let's just display a message
      insightsElement.textContent = 'Tracking started!';
  
      // You might want to send a message to background.js to start tracking
      chrome.runtime.sendMessage({ action: 'startTracking' });
    });
  
    // You can retrieve and display tracked data here
    // For simplicity, let's just display a sample message
    insightsElement.textContent = 'Total AI-generated content tracked today: 0\nFake content tracked today: 0';
  });
  