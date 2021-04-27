document.addEventListener("DOMContentLoaded", () => {
    console.log("Document loaded...");

    const imageForm = document.getElementById("imageForm");

    const imageField = document.getElementById("uploadedImageFormControl");
    const saturationField = document.getElementById("saturationControl");

    const loadingIndicator = document.getElementById("loadingIndicator");

    // Auto preview image
    imageField.addEventListener("change", (event) => {
        let reader = new FileReader();

        reader.readAsDataURL(imageField.files[0]);

        reader.onload = (e) => {
            document.getElementById("beforeImage").src = e.target.result;
        }
    });

    // Form submission
    imageForm.addEventListener("submit", (event) => {
        event.preventDefault();

        new FormData(imageForm);
    });

    imageForm.addEventListener("formdata", (event) => {
        console.log("Uploading file...");

        const formData = event.formData;
        console.log(formData);

        document.getElementById("afterImage").src = "";
        loadingIndicator.style.display = "block";

        fetch("outfit-upload", {
        	method: "POST",
        	body: formData
        })
        .then(data => data.blob())
        .then(data => {
        	const urlCreator = window.URL || window.webkitURL;

            loadingIndicator.style.display = "none"
        	document.getElementById("afterImage").src = urlCreator.createObjectURL(data);
        })
        .catch(error => {
        	console.error(error);
        });
    });
}); 