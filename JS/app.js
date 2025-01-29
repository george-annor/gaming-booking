document.addEventListener('DOMContentLoaded', () => {
  // Handle Others checkbox functionality
  const othersCheckbox = document.querySelector('input[value="Others"]');
  const othersTextarea = document.getElementById('others');

  othersTextarea.disabled = !othersCheckbox.checked;
  othersCheckbox.addEventListener('change', () => {
      othersTextarea.disabled = !othersCheckbox.checked;
      if (!othersCheckbox.checked) othersTextarea.value = '';
  });
});

(function() {
  function handleFormSubmit(event) {  
      event.preventDefault();
      const form = event.target;
      const submitBtn = form.querySelector('button[type="submit"]');
      
      // Disable button during submission
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      // Create new FormData object
      const formData = new FormData(form);
      const scriptURL = form.action;
      
      fetch(scriptURL, { 
          method: 'POST', 
          body: formData 
      })
      .then(response => {
          // Show success message
          form.style.display = 'none';
          document.querySelector('.thankyou_message').style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Book Now';
      })
      .catch(error => {
          console.error('Error!', error.message);
          alert('Error submitting form! Please try again.');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Book Now';
      });
  }

  // Initialize form submission handlers
  document.querySelectorAll('form.gform').forEach(form => {
      form.addEventListener('submit', handleFormSubmit);
  });
})();