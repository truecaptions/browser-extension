// dynamic_page.js

document.addEventListener('DOMContentLoaded', function () {
    const backBtn = document.getElementById('backBtn');
    const screenshotImage = document.getElementById('screenshotImage');
  
    backBtn.addEventListener('click', function () {
      // Go back to the history page
      window.history.back();
    });
  
    // Get the index from the query parameter
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');
  
    // Retrieve the captured screenshot URL from storage
    chrome.storage.local.get(['capturedScreenshots'], function (result) {
      const capturedScreenshots = result.capturedScreenshots || [];
      const screenshotUrl = capturedScreenshots[index];
  
      // Set the screenshot image source
      screenshotImage.src = screenshotUrl;
    });
  });
  