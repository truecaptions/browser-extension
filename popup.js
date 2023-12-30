// popup.js
document.addEventListener('DOMContentLoaded', function () {
  const startBtn = document.getElementById('startBtn');
  const historyBtn = document.getElementById('historyBtn');
  const historyContainer = document.getElementById('historyContainer');
  const totalScreenshotsCountElement = document.getElementById('totalScreenshotsCount');
  const backBtn = document.getElementById('backBtn');

  let capturedScreenshots = [];

  // Load the previous data from storage
  chrome.storage.local.get(['capturedScreenshots'], function(result) {
    capturedScreenshots = result.capturedScreenshots || [];
    updateTotalScreenshotsCount();
  });

  startBtn.addEventListener('click', function () {
    // Capture a screenshot and store it in the history
    captureAndStoreScreenshot();
  });

  historyBtn.addEventListener('click', function () {
    // Show the history of captured screenshots
    showHistory();
  });

  backBtn.addEventListener('click', function () {
    // Show the main view and hide history
    historyContainer.style.display = 'none';
    backBtn.style.display = 'none';
    startBtn.style.display = 'block';
    historyBtn.style.display = 'block';
    updateTotalScreenshotsCount();
  });

  function captureAndStoreScreenshot() {
    // Use chrome extension APIs to capture the visible part of the current tab
    chrome.tabs.captureVisibleTab({ format: 'png' }, function (screenshotUrl) {
      // Update the total screenshots count
      updateTotalScreenshotsCount();

      // Store the captured screenshot in the history
      capturedScreenshots.push(screenshotUrl);

      // Save the data to storage
      chrome.storage.local.set({
        'capturedScreenshots': capturedScreenshots
      });
    });
  }

  function showHistory() {
    // Hide the main view and show history
    historyContainer.innerHTML = '';

    // Display each screenshot in a card with the aspect ratio
    capturedScreenshots.forEach((imageData, index) => {
      storeScreenshotInCard(imageData, 'aspect-ratio', index);
    });

    // Show the history container and back button
    historyContainer.style.display = 'block';
    backBtn.style.display = 'block';
    startBtn.style.display = 'none';
    historyBtn.style.display = 'none';
  }

  function storeScreenshotInCard(imageData, aspectRatioClass, index) {
    // Create a card wrapper for the screenshot
    const card = document.createElement('div');
    card.className = `screenshot-card ${aspectRatioClass}`;

    // Create an image element and set the source to the captured screenshot
    const img = document.createElement('img');
    img.src = imageData;


    const openBtn = document.createElement('button');
    openBtn.textContent = 'Open';
    openBtn.className = 'open-btn';
    openBtn.addEventListener('click', function () {
      // Open the dynamic page within the extension window
      openDynamicPage(index);
    });




    // Create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function () {
      // Remove the screenshot from the array and update UI
      capturedScreenshots.splice(index, 1);
      updateTotalScreenshotsCount();
      showHistory();
      // Save the updated data to storage
      chrome.storage.local.set({
        'capturedScreenshots': capturedScreenshots
      });
    });


    // Append the image and delete button to the card
    card.appendChild(img);
    card.appendChild(openBtn);
    card.appendChild(deleteBtn);

    // Append the card to the history container
    historyContainer.appendChild(card);
  }

  function updateTotalScreenshotsCount() {
    // Check if the element exists before updating its content
    if (totalScreenshotsCountElement) {
      totalScreenshotsCountElement.textContent = capturedScreenshots.length;
    } else {
      console.error("Element totalScreenshotsCountElement not found.");
    }
  }

  function openDynamicPage(index) {
    // Retrieve the captured screenshot URL from storage
    chrome.storage.local.get(['capturedScreenshots'], function (result) {
      const capturedScreenshots = result.capturedScreenshots || [];
      const screenshotUrl = capturedScreenshots[index];

      // Create a modal container
      const modalContainer = document.createElement('div');
      modalContainer.className = 'modal-container';

      
      // Create a title for the modal
      const title = document.createElement('h3');
      title.textContent = 'Truecaptions Analyzer';

      // Create an image element for the screenshot
      const img = document.createElement('img');
      img.src = screenshotUrl;

      // Create an "Analyze" button
      const analyzeBtn = document.createElement('button');
      analyzeBtn.textContent = 'Analyze';
      analyzeBtn.className = 'analyze-btn';
      analyzeBtn.addEventListener('click', function () {
        // Implement your analyze logic here
        alert('Analyzing...');
      });

      // Create a "Back" button
      const backBtn = document.createElement('button');
      backBtn.textContent = 'Back';
      backBtn.className = 'back-btn';
      backBtn.addEventListener('click', function () {
        // Remove the modal container
        modalContainer.remove();
      });

      // Append the title, image, analyze button, and back button to the modal container
      modalContainer.appendChild(title);
      modalContainer.appendChild(img);
      modalContainer.appendChild(analyzeBtn);
      modalContainer.appendChild(backBtn);

      // Append the modal container to the body
      document.body.appendChild(modalContainer);
    });
  }



  
});
