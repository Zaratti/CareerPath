document.getElementById('career-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    event.target.submit();

    const careerGoal = document.getElementById('career-goal').value;
    const resumeFile = document.getElementById('resume-upload').files[0];
    const errorElement = document.getElementById('error-message');
    const flowchartElement = document.getElementById('flowchart');

    // Clear previous error messages
    errorElement.textContent = '';

    // Validate career goal
    if (!careerGoal) {
        errorElement.textContent = 'Please enter your career goal.';
        return;
    }

    const formData = new FormData();
    formData.append('career', careerGoal);
    if (resumeFile) {
        formData.append('resume', resumeFile);
    }

    try {
        // Show a loading state
        if (flowchartElement) {
            flowchartElement.innerHTML = '<p>Generating roadmap... Please wait.</p>';
        }

        // Send data to Flask backend
        const response = await fetch('/', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'An unknown error occurred.');
        }

        const data = await response.json();

        // Redirect to the URL provided by the backend
        if (data.redirect_url) {
            window.location.href = data.redirect_url;
        } else {
            throw new Error('No redirect URL provided.');
        }
    } catch (error) {
        console.error('Error generating roadmap:', error);
        errorElement.textContent = error.message || 'Failed to generate the roadmap. Please try again.';
    }
});
