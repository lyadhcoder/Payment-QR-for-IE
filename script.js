    /* =========================================
       UPI LIST
    ========================================= */

    const UPI_LIST = [

      {
        name: "HDFC CC-4020 BHIM UPI",
        id: "thesourav@upi"
      },

      {
        name: "HDFC CC-4020 PhonePe UPI",
        id: "indranielectronics@ibl"
      },
      {
        name: "ICICI CC MARCHENT QR",
        id: "indranielectronics@icici"
      },

      {
        name: "HDFC CC-4020 MARCHENT QR BOX",
        id: "Vyapar.177783680339@hdfcbank"
      }

      // Add more:
      // {
      //   name: "UPI 4",
      //   id: "newupi@upi"
      // }

    ];


    /* =========================================
       ELEMENTS
    ========================================= */

    const amountInput =
      document.getElementById("amount");

    const upiSelect =
      document.getElementById("upiSelect");

    const descriptionInput =
      document.getElementById("description");

    const splitPayment =
      document.getElementById("splitPayment");

    const splitOptions =
      document.getElementById("splitOptions");

    const qrResults =
      document.getElementById("qrResults");

    const errorBox =
      document.getElementById("errorBox");

    const themeToggle =
      document.getElementById("themeToggle");


    /* =========================================
       LOAD UPI LIST
    ========================================= */

    function loadUPIList() {

      upiSelect.innerHTML =
        '<option value="">Select UPI</option>';

      UPI_LIST.forEach((upi, index) => {

        const option =
          document.createElement("option");

        option.value = index;

        option.textContent = upi.name;

        upiSelect.appendChild(option);

      });

    }


    /* =========================================
       SPLIT PAYMENT TOGGLE
       
       Split ON:
       Description disabled
    ========================================= */

    splitPayment.addEventListener(
      "change",
      function () {

        if (this.checked) {

          splitOptions.classList.add("active");

          descriptionInput.value = "";
          descriptionInput.disabled = true;

        } else {

          splitOptions.classList.remove("active");

          descriptionInput.disabled = false;

        }

      }
    );


    /* =========================================
       ERROR
    ========================================= */

    function showError(message) {

      errorBox.textContent = message;

      errorBox.classList.add("show");

    }


    function hideError() {

      errorBox.textContent = "";

      errorBox.classList.remove("show");

    }


    /* =========================================
       CREATE UPI PAYMENT LINK
       
       tn = Payment Description
    ========================================= */

    function createUPILink(
      upiID,
      amount,
      description
    ) {

      let link =
        "upi://pay" +
        "?pa=" + encodeURIComponent(upiID) +
        "&pn=" + encodeURIComponent("Payment") +
        "&am=" + Number(amount).toFixed(2) +
        "&cu=INR";

      /*
        Description is added only when
        Split Payment is OFF.
      */

      if (
        !splitPayment.checked &&
        description.trim() !== ""
      ) {

        link +=
          "&tn=" +
          encodeURIComponent(description.trim());

      }

      return link;

    }


    /* =========================================
       FORMAT MONEY
    ========================================= */

    function formatAmount(amount) {

      return Number(amount).toLocaleString(
        "en-IN",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }
      );

    }


    /* =========================================
       EQUAL PART CALCULATION
       
       Every QR stays BELOW ₹1,999
    ========================================= */

    function calculateEqualParts(total) {

      let count;

      if (total < 1999) {

        count = 1;

      } else {

        count =
          Math.floor(total / 1999) + 1;

      }


      const baseAmount =
        Math.floor(
          (total / count) * 100
        ) / 100;


      let parts = [];

      let used = 0;


      for (
        let i = 0;
        i < count - 1;
        i++
      ) {

        parts.push(baseAmount);

        used += baseAmount;

      }


      const lastAmount =
        Math.round(
          (total - used) * 100
        ) / 100;


      parts.push(lastAmount);


      return parts;

    }


    /* =========================================
       MAX ₹1,999 CALCULATION
    ========================================= */

    function calculateMax1999(total) {

      const parts = [];

      let remaining =
        Math.round(total * 100) / 100;


      while (remaining > 0) {

        const part =
          Math.min(1999, remaining);


        parts.push(
          Math.round(part * 100) / 100
        );


        remaining =
          Math.round(
            (remaining - part) * 100
          ) / 100;

      }


      return parts;

    }


    /* =========================================
       MARK QR AS PAID
    ========================================= */

    function markAsPaid(button) {

      const qrCard =
        button.closest(".qr-card");

      if (!qrCard) return;


      /*
        Toggle paid/unpaid
      */

      const isPaid =
        qrCard.classList.contains("paid");


      if (isPaid) {

        qrCard.classList.remove("paid");

        button.textContent = "Mark as Paid";

      } else {

        qrCard.classList.add("paid");

        button.textContent = "Undo Paid";

      }

    }


    /* =========================================
       GENERATE QR
    ========================================= */

    function generateQR() {

      hideError();

      qrResults.innerHTML = "";


      /* AMOUNT */

      const total =
        parseFloat(amountInput.value);


      if (!total || total <= 0) {

        showError(
          "Please enter a valid amount."
        );

        amountInput.focus();

        return;

      }


      /* UPI */

      const selectedIndex =
        upiSelect.value;


      if (selectedIndex === "") {

        showError(
          "Please select a UPI."
        );

        upiSelect.focus();

        return;

      }


      const selectedUPI =
        UPI_LIST[selectedIndex];


      /* DESCRIPTION */

      const description =
        descriptionInput.value.trim();


      /* CALCULATE PARTS */

      let parts = [total];


      if (splitPayment.checked) {

        const method =
          document.querySelector(
            'input[name="splitMethod"]:checked'
          ).value;


        if (method === "equal") {

          parts =
            calculateEqualParts(total);

        } else if (
          method === "max1999"
        ) {

          parts =
            calculateMax1999(total);

        }

      }


      /* CREATE QR CARDS */

      parts.forEach(
        (amount, index) => {

          const card =
            document.createElement("div");

          card.className =
            "qr-card";


          /* TITLE */

          const title =
            document.createElement("div");

          title.className =
            "qr-title";


          if (parts.length === 1) {

            title.textContent =
              "Payment QR";

          } else {

            title.textContent =
              "QR " + (index + 1);

          }


          /* AMOUNT */

          const amountText =
            document.createElement("div");

          amountText.className =
            "qr-amount";

          amountText.textContent =
            "₹" + formatAmount(amount);


          /* QR */

          const qrContainer =
            document.createElement("div");

          qrContainer.className =
            "qr-code";


          /* PAID STATUS */

          const paidStatus =
            document.createElement("div");

          paidStatus.className =
            "paid-status";

          paidStatus.innerHTML =
            `
              <div>✓ PAID</div>
              <small>Payment completed</small>
            `;


          /* NOTE */

          const note =
            document.createElement("div");

          note.className =
            "qr-note";

          note.textContent =
            "Scan to pay";


          /* PAID BUTTON */

          const paidButton =
            document.createElement("button");

          paidButton.type =
            "button";

          paidButton.className =
            "paid-btn";

          paidButton.textContent =
            "Mark as Paid";


          /*
            Paid button works only
            for Split Payment QR codes.
          */

          paidButton.onclick =
            function () {

              markAsPaid(this);

            };


          /* APPEND */

          card.appendChild(title);

          card.appendChild(amountText);

          card.appendChild(qrContainer);

          card.appendChild(paidStatus);

          card.appendChild(note);


          /*
            Paid button only appears
            when there are multiple QR codes.
          */

          if (parts.length > 1) {

            card.appendChild(paidButton);

          }


          qrResults.appendChild(card);


          /* UPI LINK */

          const upiLink =
            createUPILink(
              selectedUPI.id,
              amount,
              description
            );


          /* GENERATE QR */

          new QRCode(
            qrContainer,
            {
              text: upiLink,
              width: 200,
              height: 200,
              colorDark: "#000000",
              colorLight: "#ffffff",
              correctLevel:
                QRCode.CorrectLevel.M
            }
          );

        }
      );

    }


    /* =========================================
       RESET
    ========================================= */

    function resetAll() {

      amountInput.value = "";

      upiSelect.value = "";

      descriptionInput.value = "";

      descriptionInput.disabled = false;

      splitPayment.checked = false;

      splitOptions.classList.remove(
        "active"
      );


      document.querySelector(
        'input[name="splitMethod"][value="equal"]'
      ).checked = true;


      qrResults.innerHTML = "";

      hideError();

    }


    /* =========================================
       DARK MODE
       
       DEFAULT = DARK
    ========================================= */

    const savedTheme =
      localStorage.getItem("theme");


    if (savedTheme === "light") {

      document.body.classList.remove(
        "dark-mode"
      );

      themeToggle.textContent = "🌙";

    } else {

      document.body.classList.add(
        "dark-mode"
      );

      themeToggle.textContent = "☀️";

    }


    function toggleDarkMode() {

      document.body.classList.toggle(
        "dark-mode"
      );


      const isDark =
        document.body.classList.contains(
          "dark-mode"
        );


      if (isDark) {

        themeToggle.textContent = "☀️";

        localStorage.setItem(
          "theme",
          "dark"
        );

      } else {

        themeToggle.textContent = "🌙";

        localStorage.setItem(
          "theme",
          "light"
        );

      }

    }


    /* =========================================
       INITIAL LOAD
    ========================================= */

    loadUPIList();

    /* =========================================
       মাউস স্ক্রোল বন্ধ করার জন্য
    ========================================= */
  
  document.addEventListener("wheel", function (event) {
    if (document.activeElement.type === "number") {
      document.activeElement.blur();
    }
  });

   /* =========================================
       Copyright Year Automatic Load
    ========================================= */
  document.getElementById("year").textContent = new Date().getFullYear();
