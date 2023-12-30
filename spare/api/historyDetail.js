// historyDetail.js

document.addEventListener('DOMContentLoaded', function () {
    const selectedScreenshot = document.getElementById('selectedScreenshot');
    const loader = document.getElementById('loader');
    const output = document.getElementById('output');
  
    // Get the selected screenshot path from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const imagePath = urlParams.get('imagePath');
  
    // Set the selected screenshot source
    selectedScreenshot.src = imagePath;
  
    // Call the API to analyze the selected screenshot
    analyzeScreenshot(imagePath);
  
    function analyzeScreenshot(imagePath) {
      loader.style.display = 'block';
  
      // Make API request using analyzeContent.js
      // You need to adapt this part based on how your API request works
      analyzeContent(imagePath, function (response) {
        loader.style.display = 'none';
        output.textContent = response;
      });
    }
  });
  