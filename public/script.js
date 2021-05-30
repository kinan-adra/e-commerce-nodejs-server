// A reference to Stripe.js
var stripe = Stripe("pk_test_51IkwkYBhbv5f3TBMFG7FdAvqXmolHsbdlYzkgEryzz4ntBnLpolUIyjykwfoBxw3SKofxsfvbN4nFtIxsysjoVDs00YYmLqIeW")

var orderData = {
  cartItems:[
        {
            price: 50,
            quantity:1
        },{
            price: 40.6,
            quantity:2
        }
    ],
    description: "any description",
    receipt_email: "example2@gmail.com",
    shipping:{
        name:"kinan adra",
        address: {
            line1:"any address"
        }
    }
}

// Disable the button until we have Stripe set up on the page
document.querySelector("button").disabled = true;

fetch("http://localhost:3000/payment", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  //mode: 'no-cors',
  body: JSON.stringify(orderData)
})
  .then((result) => {
    return result.json()
  })
  .then((data) => {
    return setupElements(data);
  })
  .then(({ stripe, card, clientSecret })=> {
    document.querySelector("button").disabled = false;

    // Handle form submission.
    var form = document.getElementById("payment-form");
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      // Initiate payment when the submit button is clicked
      pay(stripe, card, clientSecret);
    });
  });

// Set up Stripe.js and Elements to use in checkout form
var setupElements = function(data) {
  stripe = Stripe("pk_test_51IkwkYBhbv5f3TBMFG7FdAvqXmolHsbdlYzkgEryzz4ntBnLpolUIyjykwfoBxw3SKofxsfvbN4nFtIxsysjoVDs00YYmLqIeW");
  var elements = stripe.elements();
  var style = {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4"
      }
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a"
    }
  };

  var card = elements.create("card", { style: style });
  card.mount("#card-element");

  return {
    stripe: stripe,
    card: card,
    clientSecret: data.clientSecret
  };
};

/*
 * Calls stripe.confirmCardPayment which creates a pop-up modal to
 * prompt the user to enter extra authentication details without leaving your page
 */
var pay = function(stripe, card, clientSecret) {
  changeLoadingState(true);

  // Initiate the payment.
  // If authentication is required, confirmCardPayment will automatically display a modal
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card
      }
    })
    .then(function(result) {
      if (result.error) {
        // Show error to your customer
        showError(result.error.message);
      } else {
        // The payment has been processed!
        orderComplete(clientSecret);
      }
    });
};

/* ------- Post-payment helpers ------- */

/* Shows a success / error message when the payment is complete */
var orderComplete = function(clientSecret) {
  // Just for the purpose of the sample, show the PaymentIntent response object
  stripe.retrievePaymentIntent(clientSecret).then(function(result) {
    var paymentIntent = result.paymentIntent;
    var paymentIntentJson = JSON.stringify(paymentIntent, null, 2);

    document.querySelector(".sr-payment-form").classList.add("hidden");
    document.querySelector("pre").textContent = paymentIntentJson;

    document.querySelector(".sr-result").classList.remove("hidden");
    setTimeout(function() {
      document.querySelector(".sr-result").classList.add("expand");
    }, 200);

    changeLoadingState(false);
  });
};

var showError = function(errorMsgText) {
  changeLoadingState(false);
  var errorMsg = document.querySelector(".sr-field-error");
  errorMsg.textContent = errorMsgText;
  setTimeout(function() {
    errorMsg.textContent = "";
  }, 4000);
};

// Show a spinner on payment submission
var changeLoadingState = function(isLoading) {
  if (isLoading) {
    document.querySelector("button").disabled = true;
    document.querySelector("#spinner").classList.remove("hidden");
    document.querySelector("#button-text").classList.add("hidden");
  } else {
    document.querySelector("button").disabled = false;
    document.querySelector("#spinner").classList.add("hidden");
    document.querySelector("#button-text").classList.remove("hidden");
  }
};