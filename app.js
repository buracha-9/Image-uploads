document
  .getElementById("upload-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = e.target.elements.image;
    formData.append("image", fileInput.files[0]);

    // Show loading spinner or message
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '<p>Uploading image...</p><div class="spinner"></div>';

    try {
      const response = await fetch("http://localhost:5500/upload-image", {
        method: "POST",
        body: formData,
      });

      console.log("Response Status:", response.status);
      const responseText = await response.text();
      console.log("Response Text:", responseText);

      if (!response.ok) {
        throw new Error(`Error: ${responseText}`);
      }

      const data = JSON.parse(responseText);

      // Display the uploaded image
      resultDiv.innerHTML = `
        <img src="${data.url}" alt="Uploaded Image" style="max-width: 300px;"/>
      `;
    } catch (error) {
      resultDiv.innerText = `Error: ${error.message}`;
    }
  });
