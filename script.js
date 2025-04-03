document.addEventListener('DOMContentLoaded', function() {
    // Code for Read More/Read Less functionality
    const readMoreBtn = document.getElementById('read-more-btn');
    const fullAboutMe = document.getElementById('full-about-me');
    const shortAboutMe = document.getElementById('short-about-me');

    if (readMoreBtn && fullAboutMe && shortAboutMe) {
        readMoreBtn.addEventListener('click', function() {
            if (fullAboutMe.style.display === 'none' || fullAboutMe.style.display === '') {
                fullAboutMe.style.display = 'block';
                shortAboutMe.style.display = 'none';
                readMoreBtn.textContent = 'Read Less';
            } else {
                fullAboutMe.style.display = 'none';
                shortAboutMe.style.display = 'block';
                readMoreBtn.textContent = 'Read More';
            }
        });
    }

    // Code for Contact Form Submission
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            const formData = {
                name: name,
                email: email,
                subject: subject,
                message: message
            };

            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message); 
                    contactForm.reset(); // Clear the form after successful submission
                } else if (data.error) {
                    alert(data.error); 
                }
            })
            .catch(error => {
                console.error("There was an error sending the message:", error);
                alert('Failed to send message. Please try again later.'); // Generic error message
            });
        });
    }
});
