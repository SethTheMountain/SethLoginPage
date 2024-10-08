(function(){
  const fonts = ["cursive", "sans-serif", "serif", "monospace"];
  let captchaValue = "";

  // Generate Captcha
  function generateCaptcha(){
    let value = btoa(Math.random() * 1000000000);
    value = value.substring(0, 5 + Math.random() * 5); 
    captchaValue = value;
  }

  // Set Captcha to HTML
  function setCaptcha(){
    let html = captchaValue.split("").map((char) => {
      const rotate = -20 + Math.trunc(Math.random() * 30);
      const font = Math.trunc(Math.random() * fonts.length);
      return `<span style="transform:rotate(${rotate}deg); font-family:${fonts[font]}">${char}</span>`;
    }).join("");
    document.querySelector(".login-form .captcha .preview").innerHTML = html;
  }

  // Initialize captcha
  function initCaptcha(){
    document.querySelector(".login-form .captcha .captcha-refresh").addEventListener("click", function(){
      generateCaptcha();
      setCaptcha();
    });

    generateCaptcha();
    setCaptcha();
  }

  // Call initCaptcha
  initCaptcha();

  // Handle login button click
  document.querySelector("#login-btn").addEventListener("click", function(){
    let inputCaptchaValue = document.querySelector("#captcha-input").value;

    if (inputCaptchaValue === captchaValue) {
      // SweetAlert for successful login
      Swal.fire({
        title: "Success",
        text: "Logging In!",
        icon: "success"
      });
    } else {
      // SweetAlert for invalid captcha
      Swal.fire({
        title: "Error",
        text: "Invalid captcha",
        icon: "error"
      });
    }
  });
})();