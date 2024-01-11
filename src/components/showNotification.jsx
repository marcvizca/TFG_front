import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export function showNotification(message, type = "success") {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: type === "success" ? "green" : "red" ,
        },
        onClick: function(){} // Callback after click
      }).showToast();
}