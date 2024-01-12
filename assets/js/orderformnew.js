document.addEventListener('DOMContentLoaded', function () {
    let domains = [];

    document.getElementById('addDomainButton').addEventListener('click', function() {
        const domainIndex = domains.length;
        domains.push({ name: '', forwarding: '', register: false, mailboxes: [] });
        addDomainDiv(domainIndex);
    });

    function addDomainDiv(domainIndex) {
        const domainDiv = document.createElement('div');
        domainDiv.id = `domain_${domainIndex}`;
        domainDiv.className = 'domain mb-3';
        domainDiv.innerHTML = `
            <div class='form-group mb-2'>
                <input type='text' placeholder='Domain Name' name='domainName_${domainIndex}' class='form-control'>
                <input type='text' placeholder='Forwarding Domain' name='forwardingDomain_${domainIndex}' class='form-control'>
                <div class="form-check mt-2">
                    <input type='checkbox' class='form-check-input' id='registerDomain_${domainIndex}' name='registerDomain_${domainIndex}'>
                    <label class="form-check-label" for='registerDomain_${domainIndex}'>Register New Domain</label>
                </div>
            </div>
            <button type='button' onclick='addMailbox(${domainIndex})' class='btn btn-secondary mb-2'>Add Mailbox</button>
            <div id='mailboxes_${domainIndex}' class='mb-3'></div>
        `;
        document.getElementById('domains').appendChild(domainDiv);

        attachDomainInputListeners(domainIndex);
    }

    function attachDomainInputListeners(domainIndex) {
        const domainDiv = document.getElementById(`domain_${domainIndex}`);
        domainDiv.querySelector(`input[name='domainName_${domainIndex}']`).addEventListener('input', function() {
            domains[domainIndex].name = this.value.trim();
            updateOrderSummary();
        });
        domainDiv.querySelector(`input[name='forwardingDomain_${domainIndex}']`).addEventListener('input', function() {
            domains[domainIndex].forwarding = this.value.trim();
            updateOrderSummary();
        });
        domainDiv.querySelector(`input[name='registerDomain_${domainIndex}']`).addEventListener('change', function() {
            domains[domainIndex].register = this.checked;
            updateOrderSummary();
        });
    }

    window.addMailbox = function(domainIndex) {
        const mailboxIndex = domains[domainIndex].mailboxes.length;
        domains[domainIndex].mailboxes.push('');
        addMailboxDiv(domainIndex, mailboxIndex);
    };

    function addMailboxDiv(domainIndex, mailboxIndex) {
        const mailboxDiv = document.createElement('div');
        mailboxDiv.id = `mailbox_${domainIndex}_${mailboxIndex}`;
        mailboxDiv.className = 'form-group mb-2';
        mailboxDiv.innerHTML = `
            <input type='text' placeholder='Mailbox Name' name='mailboxName_${domainIndex}_${mailboxIndex}' class='form-control'>
        `;
        document.getElementById(`mailboxes_${domainIndex}`).appendChild(mailboxDiv);

        mailboxDiv.querySelector('input').addEventListener('input', function() {
            domains[domainIndex].mailboxes[mailboxIndex] = this.value.trim();
            updateOrderSummary();
        });
    }

    function updateOrderSummary() {
        let totalDomainCost = 0;
        let totalMailboxCost = 0;
        let totalMailboxes = 0;

        domains.forEach(domain => {
            if (domain.register) {
                totalDomainCost += 12; // Assuming $12 for domain registration
            }
            totalMailboxes += domain.mailboxes.length;
        });

        totalMailboxCost = calculateMailboxCost(totalMailboxes);

        const summaryContainer = document.querySelector('.order-summary');
        summaryContainer.innerHTML = `
            <div class="summary-item">
                <div>Domain Registration Fees:</div>
                <div>$${totalDomainCost.toFixed(2)}</div>
            </div>
            <div class="summary-item">
                <div>Mailbox Fees:</div>
                <div>$${totalMailboxCost.toFixed(2)}</div>
            </div>
            <button class="confirm-button">Confirm Order</button>
        `;

        updateDomainDataInput(JSON.stringify(domains));
    }

    function calculateMailboxCost(totalMailboxes) {
        if (totalMailboxes <= 49) {
            return totalMailboxes * 1.75;
        } else if (totalMailboxes <= 99) {
            return totalMailboxes * 1.50;
        } else if (totalMailboxes <= 199) {
            return totalMailboxes * 1.25;
        } else {
            return totalMailboxes * 1.00;
        }
    }

    function updateDomainDataInput(dataString) {
        let domainDataInput = document.getElementById('domainData');
        if (!domainDataInput) {
            domainDataInput = document.createElement('input');
            domainDataInput.type = 'hidden';
            domainDataInput.id = 'domainData';
            domainDataInput.name = 'domainData';
            document.getElementById('orderForm').appendChild(domainDataInput);
        }
        domainDataInput.value = dataString;
    }

    emailjs.init("IJH8Fig-Kw72k-KcW");

    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Validate form inputs before sending
        if (!validateOrderForm()) {
            alert('Please fill all required fields correctly.');
            return;
        }

        emailjs.sendForm('service_yzmsej5', 'template_yvgx87b', this)
            .then(function() {
                console.log('SUCCESS!');
                alert('Order submitted successfully!');
            }, function(error) {
                console.log('FAILED...', error);
                alert('Failed to send the order. Please try again.');
            });
    });

    function validateOrderForm() {
        // Add form validation logic here
        // Return true if the form is valid, otherwise false
    }
});
