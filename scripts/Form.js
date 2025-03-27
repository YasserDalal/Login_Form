function viewLabel() {
  const toggleViewPassword = document.querySelectorAll('.toggle-password');

  toggleViewPassword.forEach(button => {
    button.addEventListener('click', function() {
      const eyeIcon = this.querySelector('i');
      const passwordEye = this.querySelector('i').getAttribute('data-target');
      const passwordInput = document.querySelector(passwordEye);

      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.add('fa-eye');
        eyeIcon.classList.remove('fa-eye-slash');
      } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
      }
    });
  });
}

function progressBar() {
  const progress = document.querySelector('.progress-percentage-icon');
  const inputName = document.querySelector('#full-name');
  const email = document.querySelector('#email');
  const passwordEnter = document.querySelector('#Enter-Password');
  const verifyPassword = document.querySelector('#Verify-Password');
  const form = document.querySelector('form');
  let progressValue = 0;

  let nameCompleted = false;
  let emailHasAt = false;
  let passwordHasAt = false;
  let passwordVerifyHasAt = false;


  let passwordVerify = verifyPassword.value
  function updateProgress() {
    if (progressValue < 0) progressValue = 0;
    if (progressValue > 100) progressValue = 100;

    document.documentElement.style.setProperty('--progress-percent', `${progressValue}%`);
    progress.innerHTML = `${progressValue}%`;
  }

  function checkInputFields(e) {
    let lengthName = inputName.value.length;
    let emailValue = email.value;
    let passwordLength = passwordEnter.value.length;
    let passwordValid = passwordEnter.checkValidity();
    let passwordVerifyValid = verifyPassword.checkValidity();

    // Fullname input validation
    if (e.target === inputName) {
      if (lengthName === 0 && nameCompleted) {
        progressValue -= 10;
        nameCompleted = false;
      } else if (lengthName >= 2 && !nameCompleted) {
        progressValue += 10;
        nameCompleted = true;
      }
    }

    // Email input validation
    if (e.target === email) {
      if (emailValue.length === 0 && emailHasAt) {
        progressValue -= 10;
        emailHasAt = false;
      } else if (emailValue.includes('@') && !emailHasAt) {
        progressValue += 10;
        emailHasAt = true;
      }
    }

    // Password input validation
    if (e.target === passwordEnter) {
      if (passwordLength < 1 && passwordHasAt) {
        progressValue -= 10;
        passwordHasAt = false;
      } else if (passwordValid) {
        passwordEnter.removeAttribute("title");
        if (!passwordHasAt) {
          progressValue += 10;
          passwordHasAt = true;
        }
      } else {
        if (passwordHasAt) {
          progressValue -= 10;
          passwordHasAt = false;
        }
        passwordEnter.setAttribute("title", "Password must have: \n- 10 characters with 1 special characters [ @#$%! ]");
      }
    }

    // Verify Password input validation
    if (e.target === verifyPassword && verifyPassword.value !== passwordVerify){
      if(verifyPassword.value === passwordEnter.value){
        progressValue += 10
        passwordVerifyHasAt = false
      } else {
        if(!passwordVerifyHasAt){
          progressValue -= 10
          passwordVerifyHasAt = true
        }
      }
    }

    updateProgress();
  }

  // ✅ DITO ILALAGAY ANG FORM EVENT LISTENER  
  form.addEventListener('submit', (e) => {
    if (verifyPassword.value === passwordEnter.value) {
      verifyPassword.setCustomValidity(""); // Clear error message
    } else {
      verifyPassword.setCustomValidity("Passwords must match");
      verifyPassword.reportValidity();
      e.preventDefault(); // Pigilan lang kapag mali ang password
    }
  });

  verifyPassword.addEventListener('input', (e) => {
    if(e.target === verifyPassword) {
      if (verifyPassword.value === passwordEnter.value) {
        verifyPassword.setCustomValidity(""); // ✅ Auto-clear ang error kapag tumama
      }
    }
  });

  // Listen for input events
  inputName.addEventListener('input', checkInputFields);
  email.addEventListener('input', checkInputFields);
  passwordEnter.addEventListener('input', checkInputFields);
  verifyPassword.addEventListener('input', checkInputFields);
}

progressBar();
viewLabel();
