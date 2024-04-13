document.addEventListener("DOMContentLoaded", function() {
  var form = document.getElementById("taxForm");
  var modal = document.getElementById("modal");
  var finalValues = document.getElementById("finalValues");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    validateForm();
  });

  function validateForm() {
    var age = document.getElementById("age").value;
    var grossAnnualIncome = document.getElementById("grossAnnualIncome").value;
    var extraIncome = document.getElementById("extraIncome").value;
    var deductions = document.getElementById("deductions").value;

    if (age === "") {
      showErrorIcon("ageErrorIcon");
    } else {
      hideErrorIcon("ageErrorIcon");
    }

    if (grossAnnualIncome === "" || extraIncome === "" || deductions === "") {
      showErrorIcon("incomeErrorIcon");
      showErrorIcon("extraIncomeErrorIcon");
      showErrorIcon("deductionsErrorIcon");
    } else {
      hideErrorIcon("incomeErrorIcon");
      hideErrorIcon("extraIncomeErrorIcon");
      hideErrorIcon("deductionsErrorIcon");

      calculateTax(age, grossAnnualIncome, extraIncome, deductions);
    }
  }

  function calculateTax(age, grossAnnualIncome, extraIncome, deductions) {
    // Calculate total income
    var totalIncome = parseInt(grossAnnualIncome) + parseInt(extraIncome) - parseInt(deductions);

    // Calculate tax based on age and total income
    var tax = 0;
    if (totalIncome > 800000) {
      if (age === "<40") {
        tax = 0.3 * (totalIncome - 800000);
      } else if (age === ">=40&<60") {
        tax = 0.4 * (totalIncome - 800000);
      } else {
        tax = 0.1 * (totalIncome - 800000);
      }
    }

    // Calculate remaining amount after tax deduction
    var remainingAmount = totalIncome - tax;

    // Show modal with final values
    showModal(totalIncome, tax, remainingAmount);
  }

  function showErrorIcon(elementId) {
    document.getElementById(elementId).style.display = "inline";
  }

  function hideErrorIcon(elementId) {
    document.getElementById(elementId).style.display = "none";
  }

  function showModal(totalIncome, tax, remainingAmount) {
    finalValues.innerHTML = "Total Income: " + totalIncome + " Lakhs<br>Tax: " + tax + " Lakhs<br>Remaining Amount: " + remainingAmount + " Lakhs";
    $('#modal').modal('show');
  }

  var closeButton = document.getElementsByClassName("close")[0];
  closeButton.onclick = function() {
    $('#modal').modal('hide');
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      $('#modal').modal('hide');
    }
  }
});
