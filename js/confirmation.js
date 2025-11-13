const confirmation = document.getElementById("thank-you-message")

const thankYouMessage = document.createElement("h2")
thankYouMessage.classList.add("thank-you")
thankYouMessage.textContent = "Thank you for your purchase!"
confirmation.appendChild(thankYouMessage)

const emailConfirmation = document.createElement("p")
emailConfirmation.classList.add("email-confirmation")
emailConfirmation.textContent = "You will shortly recieve an email confirmation with your ordernumber"
confirmation.appendChild(emailConfirmation)