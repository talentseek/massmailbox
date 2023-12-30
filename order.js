document.addEventListener('DOMContentLoaded', function() {
    let domainCount = 0;

    function addDomain(isRegistered) {
        domainCount++;
        const domainSection = document.getElementById('domainsSection');
        const newDomainDiv = document.createElement('div');
        newDomainDiv.classList.add('domain-entry');
        newDomainDiv.innerHTML = `
            <label>Domain Name</label>
            <input type="text" class="form-control mb-2 domain-name" required>
            <label>Forwarding Domain (Website to forward new domain to)</label>
            <input type="text" class="form-control mb-2 forwarding-domain" required>
            <div>Domain Type: ${isRegistered ? 'Registered ($15.00)' : 'Own Domain ($0.00)'}</div>
            <div class="mailboxes mb-2" id="mailboxes${domainCount}"></div>
            <label>Mailboxes (e.g. firstname@, lastname@) we reccommend no more than 3 mailboxes per domain</label>
            <button type="button" class="btn btn-secondary btn-sm mb-2 add-mailbox">Add Mailbox</button>
            <button type="button" class="btn btn-danger btn-sm remove-domain">Remove Domain</button>
            <hr>
        `;
        domainSection.appendChild(newDomainDiv);

        // Add Mailbox
        newDomainDiv.querySelector('.add-mailbox').addEventListener('click', function() {
            const mailboxesDiv = document.getElementById(`mailboxes${domainCount}`);
            const mailboxInput = document.createElement('input');
            mailboxInput.type = 'text';
            mailboxInput.classList.add('form-control', 'mb-2', 'mailbox');
            mailboxesDiv.appendChild(mailboxInput);
        });

        // Remove Domain
        newDomainDiv.querySelector('.remove-domain').addEventListener('click', function() {
            newDomainDiv.remove();
        });
    }

    document.getElementById('registerDomainButton').addEventListener('click', function() {
        addDomain(true);
    });

    document.getElementById('addOwnDomainButton').addEventListener('click', function() {
        addDomain(false);
    });

    document.getElementById('orderForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const emailAddress = document.getElementById('emailAddress').value;
        const domains = document.getElementsByClassName('domain-entry');
        let totalDomainCost = 0;
        let totalMailboxCount = 0;
        let summaryHtml = `<h3>Order Summary for ${fullName} (${emailAddress})</h3>`;

        Array.from(domains).forEach((domain, index) => {
            const domainName = domain.querySelector('.domain-name').value;
            const forwardingDomain = domain.querySelector('.forwarding-domain').value;
            const isRegistered = domain.innerHTML.includes('Registered ($15.00)');
            const domainCost = isRegistered ? 15.00 : 0.00;
            totalDomainCost += domainCost;
            const mailboxes = domain.querySelectorAll('.mailbox');
            totalMailboxCount += mailboxes.length;

            summaryHtml += `<p>Domain ${index + 1}: ${domainName} (Forwarding to: ${forwardingDomain}) - ${isRegistered ? 'Registered' : 'Own Domain'} - Cost: $${domainCost.toFixed(2)}</p>`;
            summaryHtml += '<ul>';
            mailboxes.forEach(mailbox => {
                summaryHtml += `<li>Mailbox: ${mailbox.value}</li>`;
            });
            summaryHtml += '</ul>';
        });

        const totalMonthlyFee = calculateMonthlyFee(totalMailboxCount);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() + 21); // 3 weeks from today

        summaryHtml += `<p>Total Domain Registration Fees: $${totalDomainCost.toFixed(2)}</p>`;
        summaryHtml += `<p>Total Monthly Fee (Starting ${startDate.toDateString()}): $${totalMonthlyFee.toFixed(2)}</p>`;
        summaryHtml += `<p>Total Payable Now for Domain Registration: $${totalDomainCost.toFixed(2)}</p>`;

        document.getElementById('orderSummary').innerHTML = summaryHtml;
    });

    function calculateMonthlyFee(totalMailboxes) {
        var perMailboxPrice = 1.75;
        if (totalMailboxes >= 50 && totalMailboxes < 100) {
            perMailboxPrice = 1.50;
        } else if (totalMailboxes >= 100 && totalMailboxes < 200) {
            perMailboxPrice = 1.25;
        } else if (totalMailboxes >= 200 && totalMailboxes <= 500) {
            perMailboxPrice = 1.00;
        }
        return totalMailboxes * perMailboxPrice;
    }
});
