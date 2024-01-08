document.getElementById('addDomainButton').addEventListener('click', function() {
    const domainList = document.getElementById('domainList');
    const domainIndex = domainList.children.length;
    const newDomainHtml = `
        <div id="domainGroup_${domainIndex}" class="domain-group">
            <label>Domain Name:</label>
            <input type="text" name="domainName[]" required>
            <label>Forward to:</label>
            <input type="text" name="forwardTo[]" required>
            <label>Register or Transfer:</label>
            <select name="domainType[]">
                <option value="register">Register</option>
                <option value="transfer">Transfer</option>
            </select>
            <button type="button" onclick="addMailbox(${domainIndex})">Add Mailbox</button>
            <button type="button" onclick="removeDomain(${domainIndex})">Remove Domain</button>
            <div id="mailboxList_${domainIndex}" class="mailbox-list"></div>
        </div>
    `;
    domainList.insertAdjacentHTML('beforeend', newDomainHtml);
});

function addMailbox(domainIndex) {
    const mailboxList = document.getElementById(`mailboxList_${domainIndex}`);
    const mailboxIndex = mailboxList.children.length;
    const newMailboxHtml = `
        <div id="mailboxGroup_${domainIndex}_${mailboxIndex}" class="mailbox-group">
            <label>Mailbox Name:</label>
            <input type="text" name="mailboxName_${domainIndex}[]" required>
            <button type="button" onclick="removeMailbox(${domainIndex}, ${mailboxIndex})">Remove Mailbox</button>
        </div>
    `;
    mailboxList.insertAdjacentHTML('beforeend', newMailboxHtml);
}

function removeDomain(domainIndex) {
    const domainGroup = document.getElementById(`domainGroup_${domainIndex}`);
    domainGroup.parentNode.removeChild(domainGroup);
}

function removeMailbox(domainIndex, mailboxIndex) {
    const mailboxGroup = document.getElementById(`mailboxGroup_${domainIndex}_${mailboxIndex}`);
    mailboxGroup.parentNode.removeChild(mailboxGroup);
}

document.getElementById('dynamicOrderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Logic to calculate total cost and handle form submission...
});
