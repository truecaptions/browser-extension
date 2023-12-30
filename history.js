// history.js
document.addEventListener('DOMContentLoaded', function () {
    const historyContainer = document.getElementById('historyContainer');
  
    chrome.storage.local.get(['capturedScreenshots'], function(result) {
      const capturedScreenshots = result.capturedScreenshots || [];
  
      // Display each screenshot in a card with the aspect ratio
      capturedScreenshots.forEach(imageData => {
        storeScreenshotInCard(imageData, 'aspect-ratio');
      });
    });
  
    function storeScreenshotInCard(imageData, aspectRatioClass) {
      // Create a card wrapper for the screenshot
      const card = document.createElement('div');
      card.className = `screenshot-card ${aspectRatioClass}`;
  
      // Create an image element and set the source to the captured screenshot
      const img = document.createElement('img');
      img.src = imageData;
  
      // Append the image to the card
      card.appendChild(img);
  
      // Append the card to the history container
      historyContainer.appendChild(card);
    }
  });
  