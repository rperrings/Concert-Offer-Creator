(() => {
    const { jsPDF } = window.jspdf;

    // --- Agency → Agent data map ---
    // Add agents for each agency here. Agencies with empty arrays will show only "Other".
    const AGENCY_AGENTS = {
        'Ace Agency': [],
        'Anna Agency': [],
        'APA': [],
        'Arrival Artists': [],
        'CAA': ['Alex Becket', 'Ferry Rais-Shaghaghi', 'Hunter Williams', 'Joseph Harris', 'Mac Clark', 'Phil Quist', 'Roger Semaan'],
        'CS3': ['Brandon Finney', 'Conor Sheldon', 'Corey Koyama', 'Jordan Goldberg', 'Justin Mullins'],
        'DGI Management': ['Tae Na', 'Yoni Goldberg'],
        'Gongaware Group': [],
        'ICM': [],
        'Independent Artist Group': [],
        'Mint Talent': [],
        'OBO': [],
        'Primary Talent': [],
        'SKAM': ['Sujit Kundu'],
        'Spin Agency': [],
        'UTA': ['Ben Hogan', 'Chad Cohen', 'David Gordoni', 'Kevin Gimble', 'Shaq Millington', 'Steve Gordon'],
        'Wasserman': ['Alan Gary', 'Antonio Dell\'Aglio', 'Ben Shprits', 'Brad Owen', 'Brent Smith', 'Cody Chapman', 'De\'Mont Callender', 'Evan Hancock', 'Jay Moss', 'Latane Hughes', 'Lee Anderson', 'Len Chenfeld', 'Marty Diamond', 'Matt Rodriguez', 'Max Braun', 'Sam Hunt', 'Steve Goodgold', 'Tom Windish'],
        'WME': ['Annie Chung', 'Brian Ahern', 'Ian Wilkerson', 'Jonas Schumann', 'Kyle Bandler', 'Stephanie Lafera'],
    };

    // --- Artist autocomplete data (sourced from Notion: Brightside Dance Talent Options List) ---
    const ARTISTS = [
        '3lau', '4B', 'Above & Beyond', 'AC Slater', 'Acraze', 'Adam Ten', 'Adriatique',
        'Adventure Club', 'Afrojack', 'Ahmed Spins', 'Alan Walker', 'Alesso', 'Alison Wonderland',
        'Alok', 'Amelie Lens', 'Andrew Rayel', 'Anna Lunoe', 'Anotr', 'Anyma', 'Argy',
        'Armin Van Buuren', 'ARMNHMR', 'Arty', 'A Trak', 'ATB', 'Au/Ra', 'Audien', 'Autograf',
        'Axwell', 'Baauer', 'Bakermat', 'Barry Can\'t Swim', 'Bassjackers', 'Bedouin',
        'Benny Benassi', 'Bhaskar', 'Big Gigantic', 'Big Wild', 'Bingo Players', 'Black Tiger Sex Machine',
        'Blasterjaxx', 'Bob Sinclar', 'Boombox Cartel', 'Borgeous', 'Borgore', 'Boris Brejcha',
        'Boys Noize', 'Breathe Carolina', 'Brklyn', 'Brohug', 'Brooke Evers', 'Calvin Harris',
        'Camelphat', 'Caribou', 'Carl Cox', 'Carlita', 'Cash Cash', 'Cashmere Cat', 'Cat Dealers',
        'Catching Flies', 'Cedric Gervais', 'Chantel Jefferies', 'Charly Jordan', 'Charlotte De Witte',
        'Cheat Codes', 'Chemical Brothers', 'Chris Lake', 'Chris Lorenzo', 'Chris Stussy',
        'Christian Loffler', 'Christoph', 'Chromeo', 'Chuckie', 'CID', 'Claptone', 'Cloonee',
        'Clozee', 'Cosmic Gate', 'Craze', 'Cut Copy', 'Dada Life', 'Damaged Goods', 'David Guetta',
        'deadmau5', 'Deeper Purpose', 'Dennis Cruz', 'Deorro', 'Devault', 'Dillon Francis',
        'Dimitri Vegas Like Mike', 'Diplo', 'Disco Line', 'Disclosure', 'Dixon', 'DJ Diesel',
        'DJ Mustard', 'DJ Seinfeld', 'DJ Snake', 'DJ Tennis', 'Dom Dolla', 'Dombresky',
        'Don Diablo', 'Dubdogz', 'Duke Dumont', 'Dyro', 'Dzeko', 'EDX', 'Ekali', 'Elderbrook',
        'Elephante', 'Eric Prydz', 'Example', 'Fatboy Slim', 'Fedde le Grand', 'Ferry Corsten',
        'Fisher', 'Flosstradamus', 'Flume', 'Forester', 'Four Tet', 'Francis Mercier',
        'Frank Walker', 'Franky Wah', 'Fred Again', 'French 79', 'Galantis', 'Gareth Emery',
        'Gessaflestein', 'Getter', 'GG Magree', 'Gorgon City', 'Grabbitz', 'Green Velvet',
        'Gryffin', 'Hayden James', 'Hugel', 'Icona Pop', 'Illenium', 'Imanbek', 'Inzo',
        'Jaded', 'Jai Wolf', 'Jaime Jones', 'James Hype', 'James Kennedy', 'Jamie XX',
        'Jan Blomqvist', 'Jauz', 'Jermaine Dupri', 'Jimi Jules', 'Joel Corry', 'John Summit',
        'Jonas Blue', 'Julian Jordan', 'Justice', 'K?d', 'Kasablanca', 'Kaskade', 'Kaysan',
        'Kaytranada', 'Kaz James', 'Keys n Krates', 'Knock2', 'Konstantina Gianni', 'Korolova',
        'Kream', 'Krewella', 'Kromi', 'KSHMR', 'Kungs', 'KX5', 'Kyle Walker', 'Kygo',
        'Laidback Luke', 'Lane 8', 'Layla Benitez', 'LAYZ', 'Lee Burridge', 'Lee Foss',
        'Lil Jon', 'Lost Frequencies', 'Lost Kings', 'Loud Luxury', 'LP Giobbi', 'LSDream',
        'Lucas & Steve', 'Madds', 'Madeon', 'Maddix', 'Magdalena', 'Major Lazer', 'Makj',
        'Malaa', 'Marco Carola', 'Mark Knight', 'Markus Schulz', 'Marshmello', 'Martin Garrix',
        'Martin Solveig', 'Martinez Bros', 'Maruda', 'Mat Zo', 'Matoma', 'Matroda', 'Max Styler',
        'Medasin', 'Meduza', 'Mercer', 'Mersiv', 'Metro Boomin', 'Michael Bibi', 'Michael Brun',
        'MIJA', 'Mike Williams', 'MK', 'Monolink', 'Moon Boots', 'Morgan Page', 'Morten',
        'MSTRKRFT', 'Mura Masa', 'Murda Beatz', 'Nervo', 'NGHTMRE', 'Nic Fanciulli',
        'Nicky Romero', 'Night Tales', 'Niiko x Swae', 'Nitti Gritti', 'Noizu',
        'Nora En Pure', 'Nora Van Elken', 'Nostalgix', 'NOTD', 'Odd Mob', 'Odesza', 'Ofenbach',
        'Offaiah', 'Oliver Heldens', 'Oliver Tree', 'OMNOM', 'Party Favor', 'Paul Oakenfold',
        'Paul Van Dyk', 'Pauly D', 'Pawsa', 'Peggy Guo', 'Phantoms', 'Pickle', 'Pluko', 'Pnau',
        'Poolside', 'Porter Robinson', 'R3hab', 'Regard', 'Rezz', 'RL Grime', 'Robin Schulz',
        'Roger Sanchez', 'Rufus Du Sol', 'RY X', 'Sabai', 'Said The Sky', 'Sam Feldt',
        'San Holo', 'San Pancho', 'Sander Van Doorn', 'Sasha', 'SAYMYNAME', 'Secondcity',
        'Seth Troxler', 'Seven Lions', 'Shane Codd', 'Shaun Frank', 'Showtek', 'Sidepiece',
        'Sigala', 'Skrillex', 'Slander', 'Slushii', 'Snakehips', 'SNBRN', 'Sofi Tukker',
        'Solardo', 'Sommer Ray', 'Sonny Fodera', 'Stafford Brothers', 'Steve Angello',
        'Steve Aoki', 'Subtronics', 'Sultan + Ned', 'Sunnery James Ryan Marciano',
        'SVDDEN DEATH', 'Swedish House Mafia', 'Tale Of Us', 'Tchami', 'Telykast', 'Test Pilot',
        'The Blaze', 'The Chainsmokers', 'The Magician', 'Thomas Gold', 'Throttle', 'Tiesto',
        'Timmy Trumpet', 'TJR', 'Tokimonsta', 'Tritonal', 'Troyboi', 'Two Feet', 'Two Friends',
        'Tycho', 'Uncle Waffles', 'Valentino Khan', 'Vicetone', 'Vincent', 'Vintage Culture',
        'W&W', 'Walker & Royce', 'Wax Motif', 'Whethan', 'Who Made Who', 'Will Clarke',
        'Win & Woo', 'Wolfgang Gartner', 'Wooli', 'Yotto', 'Young Bombs', 'Zedd',
        'Zeds Dead', 'Zhu',
    ];

    // DOM elements
    const form = document.getElementById('termSheetForm');
    const paymentInput = document.getElementById('payment');
    const grossInput = document.getElementById('gross');
    const grossHint = document.getElementById('grossHint');
    const agencySelect = document.getElementById('talentAgency');
    const agencyOtherInput = document.getElementById('talentAgencyOther');
    const agentSelect = document.getElementById('talentAgent');
    const agentOtherInput = document.getElementById('talentAgentOther');

    let grossManuallyEdited = false;

    // --- Offer Type toggle ---

    const offerTypeSelect = document.getElementById('offerType');
    const hardTicketSection = document.getElementById('hardTicketFields');
    const softTicketSection = document.getElementById('softTicketFields');
    const privateEventSection = document.getElementById('privateEventFields');
    const hospitalityRiderSelect = document.getElementById('hospitalityRider');
    const mealPerDiemSelect = document.getElementById('mealPerDiem');
    const alcoholCompSelect = document.getElementById('alcoholComp');
    const privateEventTypeSelect = document.getElementById('privateEventType');
    const privateEventTypeOtherInput = document.getElementById('privateEventTypeOther');

    const nonCompeteRow = document.getElementById('nonCompeteRow');
    const eventDetailsField = document.getElementById('eventDetailsField');
    const mealAlcoholFields = document.getElementById('mealAlcoholFields');
    const theaterSection = document.getElementById('theaterFields');
    const sharedEventDetails = document.getElementById('sharedEventDetails');
    const sharedTerms = document.getElementById('sharedTerms');

    // Required fields in shared sections that must be toggled for Theater
    const sharedRequiredFields = [
        document.getElementById('venueName'),
        document.getElementById('venueCity'),
        document.getElementById('eventContact'),
        document.getElementById('engagementDate'),
        document.getElementById('offerExpiration'),
        document.getElementById('payment'),
    ];

    function setSharedRequired(isRequired) {
        sharedRequiredFields.forEach(field => {
            if (isRequired) {
                field.setAttribute('required', '');
            } else {
                field.removeAttribute('required');
            }
        });
    }

    // Segmented control: attach click listeners to each button
    offerTypeSelect.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active state
            offerTypeSelect.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Hide all type-specific sections
            hardTicketSection.style.display = 'none';
            softTicketSection.style.display = 'none';
            privateEventSection.style.display = 'none';
            theaterSection.style.display = 'none';
            nonCompeteRow.style.display = '';
            eventDetailsField.style.display = 'none';
            mealAlcoholFields.style.display = '';
            // Show shared sections by default
            sharedEventDetails.style.display = '';
            sharedTerms.style.display = '';
            setSharedRequired(true);

            const type = btn.dataset.value;
            if (type === 'Festival') {
                hardTicketSection.style.display = 'block';
                eventDetailsField.style.display = 'block';
                mealAlcoholFields.style.display = 'none';
            } else if (type === 'Soft Ticket (Nightclub/Dayclub)') {
                softTicketSection.style.display = 'block';
                // Apply hospitality rider defaults
                applyHospitalityRider();
            } else if (type === 'Private Event' || type === 'Public Corporate Event') {
                privateEventSection.style.display = 'block';
                nonCompeteRow.style.display = 'none';
                eventDetailsField.style.display = 'block';
                mealAlcoholFields.style.display = 'none';
            } else if (type === 'Hard Tickets') {
                theaterSection.style.display = 'block';
                sharedEventDetails.style.display = 'none';
                sharedTerms.style.display = 'none';
                setSharedRequired(false);
            }
        });
    });

    // --- Hospitality Rider auto-set ---

    function applyHospitalityRider() {
        if (hospitalityRiderSelect.value === 'Yes') {
            alcoholCompSelect.value = '0';
            mealPerDiemSelect.value = '0';
        } else {
            alcoholCompSelect.value = '2000';
            mealPerDiemSelect.value = '500';
        }
    }

    hospitalityRiderSelect.addEventListener('change', applyHospitalityRider);

    // --- Private Event "Other" event type toggle ---

    privateEventTypeSelect.addEventListener('change', () => {
        if (privateEventTypeSelect.value === 'other') {
            privateEventTypeOtherInput.style.display = 'block';
            privateEventTypeOtherInput.focus();
        } else {
            privateEventTypeOtherInput.style.display = 'none';
            privateEventTypeOtherInput.value = '';
        }
    });

    // --- Ticket Scaling ---

    const ticketScalingContainer = document.getElementById('ticketScalingContainer');
    const addTicketScalingBtn = document.getElementById('addTicketScalingBtn');
    const ticketGrossPotentialInput = document.getElementById('ticketGrossPotential');

    function updateTicketScalingRow(row) {
        const grossCap = parseNumber(row.querySelector('.scaling-gross-cap').value);
        const comps = parseNumber(row.querySelector('.scaling-comps').value);
        const kills = parseNumber(row.querySelector('.scaling-kills').value);
        const price = parseNumber(row.querySelector('.scaling-price').value);
        const sellable = Math.max(0, grossCap - comps - kills);
        const gross = sellable * price;
        row.querySelector('.scaling-sellable').value = sellable > 0 ? sellable.toLocaleString('en-US') : '';
        row.querySelector('.scaling-gross').value = gross > 0 ? formatCurrency(gross) : '';
        updateGrossPotential();
    }

    // --- Summary Potential auto-calc ---
    const variableExpenseIds = [
        'expenseAscapTotal', 'expenseBmiTotal', 'expenseCcFeesTotal',
        'expenseInsuranceTotal', 'expenseGmrTotal', 'expenseSesacTotal',
    ];
    const fixedExpenseIds = [
        'expenseAdvertisingTotal', 'expenseCateringTotal', 'expenseHouseNutTotal',
        'expenseSecurityTotal', 'expenseRunnersTotal', 'expenseStagehandsTotal',
    ];

    function updateSummaryPotential() {
        const netGP = parseNumber(document.getElementById('theaterNetGrossPotential').value);
        document.getElementById('summaryNetGrossPotential').value = netGP > 0 ? formatCurrency(netGP) : '$0';

        let totalFixed = 0;
        fixedExpenseIds.forEach(id => { totalFixed += parseNumber(document.getElementById(id).value); });
        document.getElementById('summaryTotalFixedExpenses').value = totalFixed > 0 ? formatCurrency(totalFixed) : '$0';

        let totalVariable = 0;
        variableExpenseIds.forEach(id => { totalVariable += parseNumber(document.getElementById(id).value); });
        document.getElementById('summaryTotalVariableExpenses').value = totalVariable > 0 ? formatCurrency(totalVariable) : '$0';

        const talentCost = parseNumber(document.getElementById('theaterTotalTalentCost').value);
        document.getElementById('summaryTotalArtistExpenses').value = talentCost > 0 ? formatCurrency(talentCost) : '$0';

        updateEarningsPotential();
    }

    function updateEarningsPotential() {
        const headlinerFee = parseNumber(document.getElementById('theaterHeadlinerFee').value);
        const supportFee = parseNumber(document.getElementById('theaterSupportFee').value);
        const talentCost = parseNumber(document.getElementById('theaterTotalTalentCost').value);
        const netGP = parseNumber(document.getElementById('theaterNetGrossPotential').value);
        const totalExp = parseNumber(document.getElementById('expensesTotalAmount').value);
        const dealStructure = getActiveValue(document.getElementById('theaterDealStructure'));
        const dsValText = document.getElementById('theaterDealStructureValue').value;
        const dsMatch = dsValText.match(/([\d.]+)/);
        const dsPercent = dsMatch ? parseFloat(dsMatch[1]) / 100 : 0;

        let headlineTalent = headlinerFee;
        let totalArtist = talentCost;

        if (dealStructure === 'Versus' && dsPercent > 0) {
            // Profit Pool = Net GP - Total Expenses
            const profitPool = netGP - totalExp;
            // Artist share = Profit Pool × percentage
            const versusAmount = profitPool * dsPercent;
            // Headliner gets the greater of their guarantee or versus amount
            headlineTalent = Math.max(headlinerFee, versusAmount);
            // Total artist = headliner earnings + support flat fee
            totalArtist = headlineTalent + supportFee;
        } else if (dealStructure === 'Plus Deal' && dsPercent > 0) {
            // Guarantee PLUS a percentage of profit pool
            const profitPool = netGP - totalExp;
            const plusAmount = profitPool * dsPercent;
            headlineTalent = headlinerFee + plusAmount;
            totalArtist = headlineTalent + supportFee;
        } else if (dealStructure === 'Straight Percentage' && dsPercent > 0) {
            // Straight percentage of net gross after expenses
            const profitPool = netGP - totalExp;
            headlineTalent = profitPool * dsPercent;
            totalArtist = headlineTalent + supportFee;
        }
        // Flat Guarantee (or no selection): use fees directly (headlineTalent & totalArtist stay as defaults)

        const promoterEarnings = netGP - totalExp - totalArtist;

        document.getElementById('earningsHeadlineTalent').value = headlineTalent > 0 ? formatCurrency(headlineTalent) : '$0';
        document.getElementById('earningsTotalArtist').value = totalArtist > 0 ? formatCurrency(totalArtist) : '$0';
        document.getElementById('earningsPromoter').value = promoterEarnings !== 0 ? formatCurrency(promoterEarnings) : '$0';
    }

    function updateAscapTotal() {
        const rateText = document.getElementById('expenseAscapRate').value;
        const rateMatch = rateText.match(/([\d.]+)\s*%/);
        const rate = rateMatch ? parseFloat(rateMatch[1]) / 100 : 0;
        const grossPotential = parseNumber(ticketGrossPotentialInput.value);
        const total = rate * grossPotential;
        document.getElementById('expenseAscapTotal').value = total > 0 ? formatCurrency(total) : '';
        updateTotalExpenses();
    }

    function updateBmiTotal() {
        const rateText = document.getElementById('expenseBmiRate').value;
        const rateMatch = rateText.match(/([\d.]+)\s*%/);
        const rate = rateMatch ? parseFloat(rateMatch[1]) / 100 : 0;
        const grossPotential = parseNumber(ticketGrossPotentialInput.value);
        const total = rate * grossPotential;
        document.getElementById('expenseBmiTotal').value = total > 0 ? formatCurrency(total) : '';
        updateTotalExpenses();
    }

    function updateCcFeesTotal() {
        const rateText = document.getElementById('expenseCcFeesRate').value;
        const rateMatch = rateText.match(/([\d.]+)\s*%/);
        const rate = rateMatch ? parseFloat(rateMatch[1]) / 100 : 0;
        const grossPotential = parseNumber(ticketGrossPotentialInput.value);
        const total = rate * grossPotential;
        document.getElementById('expenseCcFeesTotal').value = total > 0 ? formatCurrency(total) : '';
        updateTotalExpenses();
    }

    function updateGmrTotal() {
        const rateText = document.getElementById('expenseGmrRate').value;
        const rateMatch = rateText.match(/([\d.]+)\s*%/);
        const rate = rateMatch ? parseFloat(rateMatch[1]) / 100 : 0;
        const netGross = parseNumber(document.getElementById('theaterNetGrossPotential').value);
        const total = rate * netGross;
        document.getElementById('expenseGmrTotal').value = total > 0 ? formatCurrency(total) : '';
        updateTotalExpenses();
    }

    function updateSesacTotal() {
        const rateText = document.getElementById('expenseSesacRate').value;
        const rateMatch = rateText.match(/([\d.]+)\s*%/);
        const rate = rateMatch ? parseFloat(rateMatch[1]) / 100 : 0;
        const netGross = parseNumber(document.getElementById('theaterNetGrossPotential').value);
        const total = rate * netGross;
        document.getElementById('expenseSesacTotal').value = total > 0 ? formatCurrency(total) : '';
        updateTotalExpenses();
    }

    function updateInsuranceTotal() {
        const rateText = document.getElementById('expenseInsuranceRate').value;
        const rateMatch = rateText.match(/\$?([\d.]+)/);
        const perCap = rateMatch ? parseFloat(rateMatch[1]) : 0;
        let totalGrossCap = 0;
        ticketScalingContainer.querySelectorAll('.ticket-scaling-row').forEach(row => {
            totalGrossCap += parseNumber(row.querySelector('.scaling-gross-cap').value);
        });
        const total = perCap * totalGrossCap;
        document.getElementById('expenseInsuranceTotal').value = total > 0 ? formatCurrency(total) : '';
        updateTotalExpenses();
    }

    function updateAdjustedGross() {
        const grossPotential = parseNumber(ticketGrossPotentialInput.value);
        const fmfTotal = parseNumber(document.getElementById('theaterFmfChargeTotal').value);
        const adjusted = grossPotential - fmfTotal;
        const val = adjusted > 0 ? formatCurrency(adjusted) : '';
        document.getElementById('theaterAdjustedGrossPotential').value = val;
        document.getElementById('theaterNetGrossPotential').value = val;
        updateGmrTotal();
        updateSesacTotal();
        updateSummaryPotential();
    }

    function updateFmfTotal() {
        const rate = parseNumber(document.getElementById('theaterFmfChargeRate').value);
        let totalSellable = 0;
        ticketScalingContainer.querySelectorAll('.ticket-scaling-row').forEach(row => {
            const grossCap = parseNumber(row.querySelector('.scaling-gross-cap').value);
            const comps = parseNumber(row.querySelector('.scaling-comps').value);
            const kills = parseNumber(row.querySelector('.scaling-kills').value);
            totalSellable += Math.max(0, grossCap - comps - kills);
        });
        const total = rate * totalSellable;
        document.getElementById('theaterFmfChargeTotal').value = total > 0 ? formatCurrency(total) : '';
        updateAdjustedGross();
    }

    function updateGrossPotential() {
        let total = 0;
        ticketScalingContainer.querySelectorAll('.ticket-scaling-row').forEach(row => {
            const grossCap = parseNumber(row.querySelector('.scaling-gross-cap').value);
            const comps = parseNumber(row.querySelector('.scaling-comps').value);
            const kills = parseNumber(row.querySelector('.scaling-kills').value);
            const price = parseNumber(row.querySelector('.scaling-price').value);
            const sellable = Math.max(0, grossCap - comps - kills);
            total += sellable * price;
        });
        ticketGrossPotentialInput.value = total > 0 ? formatCurrency(total) : '$0';
        updateFmfTotal();
        updateAscapTotal();
        updateBmiTotal();
        updateCcFeesTotal();
        updateInsuranceTotal();
    }

    function createTicketScalingRow() {
        const row = document.createElement('div');
        row.className = 'ticket-scaling-row';
        row.innerHTML = `
            <input type="text" class="scaling-type" placeholder="e.g., Orchestra">
            <input type="text" class="scaling-gross-cap" placeholder="0" inputmode="numeric">
            <input type="text" class="scaling-comps" placeholder="0" inputmode="numeric">
            <input type="text" class="scaling-kills" placeholder="0" inputmode="numeric">
            <input type="text" class="scaling-sellable" readonly placeholder="—">
            <input type="text" class="scaling-price" placeholder="$0" inputmode="decimal">
            <input type="text" class="scaling-notes" placeholder="Notes">
            <input type="text" class="scaling-gross" readonly placeholder="—">
            <button type="button" class="remove-scaling-btn" title="Remove">&times;</button>
        `;
        ['scaling-gross-cap', 'scaling-comps', 'scaling-kills', 'scaling-price'].forEach(cls => {
            row.querySelector('.' + cls).addEventListener('input', () => updateTicketScalingRow(row));
        });
        row.querySelector('.remove-scaling-btn').addEventListener('click', () => {
            row.remove();
            updateGrossPotential();
        });
        ticketScalingContainer.appendChild(row);
    }

    // Create one default row
    createTicketScalingRow();

    addTicketScalingBtn.addEventListener('click', () => {
        createTicketScalingRow();
    });

    // --- Expense Total Auto-Sum ---

    const expenseTotalIds = [
        'expenseAdvertisingTotal', 'expenseAscapTotal', 'expenseBmiTotal',
        'expenseCateringTotal', 'expenseCcFeesTotal',
        'expenseInsuranceTotal', 'expenseGmrTotal', 'expenseHouseNutTotal',
        'expenseSecurityTotal', 'expenseRunnersTotal',
        'expenseSesacTotal', 'expenseStagehandsTotal',
    ];

    function updateTotalExpenses() {
        let total = 0;
        expenseTotalIds.forEach(id => {
            total += parseNumber(document.getElementById(id).value);
        });
        document.getElementById('expensesTotalAmount').value = total > 0 ? formatCurrency(total) : '$0';
        updateSummaryPotential();
    }

    expenseTotalIds.forEach(id => {
        document.getElementById(id).addEventListener('input', updateTotalExpenses);
    });

    // --- Total Talent Cost Auto-Sum ---
    function updateTotalTalentCost() {
        const headlinerFee = parseNumber(document.getElementById('theaterHeadlinerFee').value);
        const supportFee = parseNumber(document.getElementById('theaterSupportFee').value);
        const total = headlinerFee + supportFee;
        document.getElementById('theaterTotalTalentCost').value = total > 0 ? formatCurrency(total) : '';
        updateSummaryPotential();
    }
    document.getElementById('theaterHeadlinerFee').addEventListener('input', () => {
        updateTotalTalentCost();
        // Auto-populate deal structure value when Flat Guarantee is selected
        const activeDeal = getActiveValue(theaterDealStructureToggle);
        if (activeDeal === 'Flat Guarantee') {
            dealStructureValueInput.value = document.getElementById('theaterHeadlinerFee').value;
        }
    });
    document.getElementById('theaterSupportFee').addEventListener('input', updateTotalTalentCost);

    // --- FMF/Venue Charge auto-calc on rate change ---
    document.getElementById('theaterFmfChargeRate').addEventListener('input', updateFmfTotal);

    // --- ASCAP auto-calc on rate change ---
    document.getElementById('expenseAscapRate').addEventListener('input', updateAscapTotal);

    // --- BMI auto-calc on rate change ---
    document.getElementById('expenseBmiRate').addEventListener('input', updateBmiTotal);

    // --- CC Fees auto-calc on rate change ---
    document.getElementById('expenseCcFeesRate').addEventListener('input', updateCcFeesTotal);

    // --- Event Insurance auto-calc on rate change ---
    document.getElementById('expenseInsuranceRate').addEventListener('input', updateInsuranceTotal);

    // --- GMR auto-calc on rate change ---
    document.getElementById('expenseGmrRate').addEventListener('input', updateGmrTotal);

    // --- SESAC auto-calc on rate change ---
    document.getElementById('expenseSesacRate').addEventListener('input', updateSesacTotal);

    // --- Deal Structure segmented control toggle ---
    const theaterDealStructureToggle = document.getElementById('theaterDealStructure');
    const dealStructureValueInput = document.getElementById('theaterDealStructureValue');
    const dealStructurePlaceholders = {
        'Flat Guarantee': 'Guarantee amount set below',
        'Versus': 'e.g., 85%',
        'Plus Deal': 'e.g., 10%',
        'Straight Percentage': 'e.g., 100%',
    };

    const headlinerFeeGroup = document.getElementById('headlinerFeeGroup');

    theaterDealStructureToggle.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            theaterDealStructureToggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            dealStructureValueInput.style.display = 'block';
            dealStructureValueInput.placeholder = dealStructurePlaceholders[btn.dataset.value] || 'Enter value';
            // Auto-populate from Headliner Fee if Flat Guarantee selected
            if (btn.dataset.value === 'Flat Guarantee') {
                const hFee = document.getElementById('theaterHeadlinerFee').value;
                if (hFee) dealStructureValueInput.value = hFee;
            }
            // Hide Headliner Fee for Straight Percentage
            headlinerFeeGroup.style.display = btn.dataset.value === 'Straight Percentage' ? 'none' : 'block';
            dealStructureValueInput.focus();
            updateEarningsPotential();
        });
    });
    dealStructureValueInput.addEventListener('input', updateEarningsPotential);

    // --- Support Yes/No toggle ---
    const supportToggle = document.getElementById('theaterSupportToggle');
    const supportFields = document.getElementById('theaterSupportFields');

    supportToggle.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            supportToggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.value === 'Yes') {
                supportFields.style.display = 'block';
            } else {
                supportFields.style.display = 'none';
            }
        });
    });

    // --- Agency "Other" toggle + Agent population ---

    agencySelect.addEventListener('change', () => {
        if (agencySelect.value === 'other') {
            agencyOtherInput.style.display = 'block';
            agencyOtherInput.focus();
            // For "Other" agency, switch agent to free-text only
            agentSelect.style.display = 'none';
            agentOtherInput.style.display = 'block';
            agentOtherInput.value = '';
            agentOtherInput.placeholder = 'Enter agent name';
            agentOtherInput.focus();
        } else {
            agencyOtherInput.style.display = 'none';
            agencyOtherInput.value = '';
            // Populate agent dropdown with agents for this agency
            agentSelect.style.display = 'block';
            agentOtherInput.style.display = 'none';
            agentOtherInput.value = '';
            populateAgentDropdown(agencySelect.value);
        }
    });

    // --- Agent "Other" toggle ---

    agentSelect.addEventListener('change', () => {
        if (agentSelect.value === 'other') {
            agentOtherInput.style.display = 'block';
            agentOtherInput.focus();
        } else {
            agentOtherInput.style.display = 'none';
            agentOtherInput.value = '';
        }
    });

    function populateAgentDropdown(agencyValue) {
        const agents = AGENCY_AGENTS[agencyValue] || [];
        // Clear existing options
        agentSelect.innerHTML = '';
        if (agents.length > 0) {
            const placeholder = document.createElement('option');
            placeholder.value = '';
            placeholder.disabled = true;
            placeholder.selected = true;
            placeholder.textContent = 'Select agent';
            agentSelect.appendChild(placeholder);
            agents.forEach(name => {
                const opt = document.createElement('option');
                opt.value = name;
                opt.textContent = name;
                agentSelect.appendChild(opt);
            });
        }
        // Always add "Other" option
        const otherOpt = document.createElement('option');
        otherOpt.value = 'other';
        otherOpt.textContent = 'Other';
        if (agents.length === 0) {
            // If no agents defined, default to "Other" selected and show text input
            otherOpt.selected = true;
            agentSelect.appendChild(otherOpt);
            agentOtherInput.style.display = 'block';
            agentOtherInput.value = '';
            agentOtherInput.focus();
        } else {
            agentSelect.appendChild(otherOpt);
        }
        agentSelect.disabled = false;
    }

    // --- Accommodations Included toggle ---

    // --- Bonus toggle (segmented control) ---

    const bonusToggle = document.getElementById('bonusToggle');
    const bonusFieldsDiv = document.getElementById('bonusFields');

    bonusToggle.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            bonusToggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.value === 'Yes') {
                bonusFieldsDiv.style.display = 'block';
            } else {
                bonusFieldsDiv.style.display = 'none';
                document.getElementById('bonusAmount').value = '';
                document.getElementById('bonusDescription').value = '';
            }
        });
    });

    // --- Accommodations toggle ---

    const accommodationsToggle = document.getElementById('accommodationsIncluded');
    const accommodationsFieldsDiv = document.getElementById('accommodationsFields');

    accommodationsToggle.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            accommodationsToggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.value === 'Yes') {
                accommodationsFieldsDiv.style.display = 'block';
            } else {
                accommodationsFieldsDiv.style.display = 'none';
                // Reset room values to defaults
                document.getElementById('numKingRooms').value = '0';
                document.getElementById('numSuites').value = '0';
                document.getElementById('numOtherRooms').value = '0';
                document.getElementById('numNights').value = '1';
                otherRoomTypeInput.style.display = 'none';
                otherRoomTypeInput.value = '';
            }
        });
    });

    // --- Other Rooms toggle ---

    const otherRoomsSelect = document.getElementById('numOtherRooms');
    const otherRoomTypeInput = document.getElementById('otherRoomType');

    otherRoomsSelect.addEventListener('change', () => {
        if (parseInt(otherRoomsSelect.value) > 0) {
            otherRoomTypeInput.style.display = 'block';
            otherRoomTypeInput.focus();
        } else {
            otherRoomTypeInput.style.display = 'none';
            otherRoomTypeInput.value = '';
        }
    });

    // --- Travel segmented control toggle ---

    const travelToggle = document.getElementById('travel');
    const travelDetailsInput = document.getElementById('travelDetails');

    travelToggle.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            travelToggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.value === 'Included') {
                travelDetailsInput.style.display = 'block';
                travelDetailsInput.focus();
            } else {
                travelDetailsInput.style.display = 'none';
                travelDetailsInput.value = '';
            }
        });
    });

    // --- Transportation segmented control + Ground Type cascade ---

    const transportationToggle = document.getElementById('transportation');
    const groundTypeField = document.getElementById('groundTypeField');
    const groundTypeToggle = document.getElementById('groundType');
    const uberBuyoutField = document.getElementById('uberBuyoutField');
    const uberBuyoutToggle = document.getElementById('uberBuyoutAmount');

    function getActiveValue(toggle) {
        const btn = toggle.querySelector('button.active');
        return btn ? btn.dataset.value : '';
    }

    transportationToggle.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            transportationToggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.value === 'Ground Provided') {
                groundTypeField.style.display = 'block';
                uberBuyoutField.style.display = getActiveValue(groundTypeToggle) === 'Uber Buyout' ? 'block' : 'none';
            } else {
                groundTypeField.style.display = 'none';
                uberBuyoutField.style.display = 'none';
            }
        });
    });

    groundTypeToggle.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            groundTypeToggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.value === 'Uber Buyout') {
                uberBuyoutField.style.display = 'block';
            } else {
                uberBuyoutField.style.display = 'none';
            }
        });
    });

    uberBuyoutToggle.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            uberBuyoutToggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Show ground type field on page load since "Ground Provided" is default
    groundTypeField.style.display = 'block';

    // --- Non-Compete segmented control toggle ---

    const nonCompeteToggle = document.getElementById('nonCompeteToggle');
    const nonCompeteFieldsDiv = document.getElementById('nonCompeteFields');

    nonCompeteToggle.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            nonCompeteToggle.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.value === 'Yes') {
                nonCompeteFieldsDiv.style.display = '';
            } else {
                nonCompeteFieldsDiv.style.display = 'none';
            }
        });
    });

    // --- Performance Time slider ---

    const perfTimeSlider = document.getElementById('performanceTime');
    const perfTimeDisplay = document.getElementById('performanceTimeDisplay');
    const perfTimeOtherInput = document.getElementById('performanceTimeOther');

    function updatePerfTimeDisplay() {
        const mins = parseInt(perfTimeSlider.value);
        if (mins > 180) {
            perfTimeDisplay.textContent = 'Other';
            perfTimeOtherInput.style.display = 'block';
            perfTimeOtherInput.focus();
        } else {
            perfTimeDisplay.textContent = `${mins} min`;
            perfTimeOtherInput.style.display = 'none';
            perfTimeOtherInput.value = '';
        }
    }

    perfTimeSlider.addEventListener('input', updatePerfTimeDisplay);
    updatePerfTimeDisplay();

    // --- Theater Time-of-Day Sliders (Doors / Show / Curfew) ---

    function minsToTimeStr(totalMins) {
        const wrapped = totalMins >= 1440 ? totalMins - 1440 : totalMins;
        const hours = Math.floor(wrapped / 60);
        const m = wrapped % 60;
        const period = hours >= 12 ? 'PM' : 'AM';
        let displayHour = hours % 12;
        if (displayHour === 0) displayHour = 12;
        return `${displayHour}:${String(m).padStart(2, '0')} ${period}`;
    }

    function attachTimeSlider(sliderId, displayId, otherId) {
        const slider = document.getElementById(sliderId);
        const display = document.getElementById(displayId);
        const otherRow = document.getElementById(otherId);
        if (!slider || !display) return;

        const minVal = parseInt(slider.min);
        const maxVal = parseInt(slider.max);

        function update() {
            const val = parseInt(slider.value);
            if (val <= minVal || val >= maxVal) {
                display.textContent = 'Other';
                if (otherRow) otherRow.style.display = 'grid';
            } else {
                display.textContent = minsToTimeStr(val);
                if (otherRow) otherRow.style.display = 'none';
            }
        }
        slider.addEventListener('input', update);
        update();
    }

    attachTimeSlider('theaterDoorsTime', 'theaterDoorsTimeDisplay', 'theaterDoorsTimeOther');
    attachTimeSlider('theaterShowTime', 'theaterShowTimeDisplay', 'theaterShowTimeOther');
    attachTimeSlider('theaterCurfewTime', 'theaterCurfewTimeDisplay', 'theaterCurfewTimeOther');
    attachTimeSlider('theaterOnSaleTime', 'theaterOnSaleTimeDisplay', 'theaterOnSaleTimeOther');

    // Helper: read time value from a theater time slider (checks for Other → dropdown fallback)
    function getTheaterTime(sliderId, hourId, minuteId, periodId) {
        const slider = document.getElementById(sliderId);
        const val = parseInt(slider.value);
        const minVal = parseInt(slider.min);
        const maxVal = parseInt(slider.max);
        if (val <= minVal || val >= maxVal) {
            const h = document.getElementById(hourId).value;
            const m = document.getElementById(minuteId).value;
            const p = document.getElementById(periodId).value;
            return `${h}:${m} ${p}`;
        }
        return minsToTimeStr(val);
    }

    // --- Frosted Glass Date Picker ---

    const MONTH_NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    function attachDatePicker(displayInput, hiddenInput) {
        const wrapper = displayInput.parentNode;
        wrapper.style.position = 'relative';

        let popup = null;
        let overlay = null;
        let selectedDate = null;
        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();
        const baseMonth = currentMonth;
        const baseYear = currentYear;

        function getOrdinalDP(n) {
            const s = ['th', 'st', 'nd', 'rd'];
            const v = n % 100;
            return s[(v - 20) % 10] || s[v] || s[0];
        }

        function formatDisplay(y, m, d) {
            return `${MONTH_NAMES[m]} ${d}${getOrdinalDP(d)}, ${y}`;
        }

        function toISODate(y, m, d) {
            return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        }

        function buildGrid(container) {
            container.innerHTML = '';
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
            const today = new Date();

            // Previous month trailing days
            for (let i = firstDay - 1; i >= 0; i--) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'date-picker-day other-month';
                btn.textContent = daysInPrevMonth - i;
                container.appendChild(btn);
            }

            // Current month days
            for (let d = 1; d <= daysInMonth; d++) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'date-picker-day';

                if (today.getDate() === d && today.getMonth() === currentMonth && today.getFullYear() === currentYear) {
                    btn.classList.add('today');
                }
                if (selectedDate && selectedDate.day === d && selectedDate.month === currentMonth && selectedDate.year === currentYear) {
                    btn.classList.add('selected');
                }

                btn.textContent = d;
                btn.addEventListener('click', () => {
                    selectedDate = { year: currentYear, month: currentMonth, day: d };
                    hiddenInput.value = toISODate(currentYear, currentMonth, d);
                    displayInput.value = formatDisplay(currentYear, currentMonth, d);
                    closePopup();
                });
                container.appendChild(btn);
            }

            // Next month leading days
            const totalCells = firstDay + daysInMonth;
            const remaining = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;
            for (let i = 1; i <= remaining; i++) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'date-picker-day other-month';
                btn.textContent = i;
                container.appendChild(btn);
            }
        }

        function openPopup() {
            if (popup) return;

            // Overlay
            overlay = document.createElement('div');
            overlay.className = 'date-picker-overlay';
            overlay.addEventListener('click', closePopup);
            document.body.appendChild(overlay);

            // Popup
            popup = document.createElement('div');
            popup.className = 'date-picker-popup';

            // Header
            const header = document.createElement('div');
            header.className = 'date-picker-header';
            header.textContent = `${MONTH_NAMES[currentMonth]} ${currentYear}`;
            popup.appendChild(header);

            // Month slider
            const slider = document.createElement('input');
            slider.type = 'range';
            slider.className = 'date-picker-slider';
            slider.min = '0';
            slider.max = '23';
            slider.value = '12'; // center = current month
            slider.addEventListener('input', () => {
                const offset = parseInt(slider.value) - 12;
                const d = new Date(baseYear, baseMonth + offset, 1);
                currentMonth = d.getMonth();
                currentYear = d.getFullYear();
                header.textContent = `${MONTH_NAMES[currentMonth]} ${currentYear}`;
                buildGrid(grid);
            });
            popup.appendChild(slider);

            // Weekday headers
            const weekdays = document.createElement('div');
            weekdays.className = 'date-picker-weekdays';
            ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(day => {
                const span = document.createElement('span');
                span.className = 'date-picker-weekday';
                span.textContent = day;
                weekdays.appendChild(span);
            });
            popup.appendChild(weekdays);

            // Day grid
            const grid = document.createElement('div');
            grid.className = 'date-picker-grid';
            buildGrid(grid);
            popup.appendChild(grid);

            // Append popup to body (not wrapper) to avoid stacking context issues from CSS transforms
            document.body.appendChild(popup);

            // Position popup below the input using fixed coordinates
            const rect = displayInput.getBoundingClientRect();
            popup.style.position = 'fixed';
            popup.style.top = (rect.bottom + 8) + 'px';
            popup.style.left = rect.left + 'px';

            // Escape key
            popup._escHandler = (e) => { if (e.key === 'Escape') closePopup(); };
            document.addEventListener('keydown', popup._escHandler);
        }

        function closePopup() {
            if (popup) {
                document.removeEventListener('keydown', popup._escHandler);
                popup.remove();
                popup = null;
            }
            if (overlay) {
                overlay.remove();
                overlay = null;
            }
        }

        displayInput.addEventListener('click', () => {
            if (popup) {
                closePopup();
            } else {
                openPopup();
            }
        });
    }

    // Attach date picker to all date fields
    attachDatePicker(document.getElementById('engagementDateDisplay'), document.getElementById('engagementDate'));
    attachDatePicker(document.getElementById('offerExpirationDisplay'), document.getElementById('offerExpiration'));
    attachDatePicker(document.getElementById('theaterShowDateDisplay'), document.getElementById('theaterShowDate'));
    attachDatePicker(document.getElementById('theaterOnSaleDateDisplay'), document.getElementById('theaterOnSaleDate'));

    // --- Artist Autocomplete ---

    function attachAutocomplete(input, dataArray) {
        // Wrap input in a relative container
        const wrapper = document.createElement('div');
        wrapper.className = 'autocomplete-wrapper';
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        // Create dropdown list
        const list = document.createElement('div');
        list.className = 'autocomplete-list';
        wrapper.appendChild(list);

        let highlightedIndex = -1;

        function showSuggestions(query) {
            list.innerHTML = '';
            highlightedIndex = -1;
            if (!query) { list.style.display = 'none'; return; }

            const matches = dataArray.filter(name =>
                name.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 10);

            if (matches.length === 0) { list.style.display = 'none'; return; }

            matches.forEach((name, i) => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.textContent = name;
                item.addEventListener('mousedown', (e) => {
                    e.preventDefault(); // prevent input blur
                    input.value = name;
                    list.style.display = 'none';
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                });
                list.appendChild(item);
            });
            list.style.display = 'block';
        }

        function updateHighlight() {
            const items = list.querySelectorAll('.autocomplete-item');
            items.forEach((item, i) => {
                item.classList.toggle('highlighted', i === highlightedIndex);
            });
            if (highlightedIndex >= 0 && items[highlightedIndex]) {
                items[highlightedIndex].scrollIntoView({ block: 'nearest' });
            }
        }

        input.addEventListener('input', () => showSuggestions(input.value));
        input.addEventListener('focus', () => { if (input.value) showSuggestions(input.value); });
        input.addEventListener('blur', () => { list.style.display = 'none'; });

        input.addEventListener('keydown', (e) => {
            const items = list.querySelectorAll('.autocomplete-item');
            if (!items.length || list.style.display === 'none') return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                highlightedIndex = Math.min(highlightedIndex + 1, items.length - 1);
                updateHighlight();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                highlightedIndex = Math.max(highlightedIndex - 1, 0);
                updateHighlight();
            } else if (e.key === 'Enter' && highlightedIndex >= 0) {
                e.preventDefault();
                input.value = items[highlightedIndex].textContent;
                list.style.display = 'none';
                input.dispatchEvent(new Event('input', { bubbles: true }));
            } else if (e.key === 'Escape') {
                list.style.display = 'none';
            }
        });
    }

    // Attach autocomplete to all artist name fields
    attachAutocomplete(document.getElementById('talentName'), ARTISTS);
    attachAutocomplete(document.getElementById('theaterHeadliner'), ARTISTS);
    attachAutocomplete(document.getElementById('theaterSupport'), ARTISTS);

    // --- Scroll-triggered slide-in animations ---

    const formSections = document.querySelectorAll('.form-section');

    // Find the Event Details section (contains Venue City) — animations start AFTER it
    const eventDetailsSection = document.getElementById('sharedEventDetails');
    let animateAfterIndex = 0;
    formSections.forEach((section, i) => {
        if (section === eventDetailsSection) animateAfterIndex = i;
    });

    formSections.forEach((section, i) => {
        if (i <= animateAfterIndex) {
            // Sections up through Event Details (Venue City) — show immediately
            section.classList.add('visible');
        } else {
            // Sections after — alternate slide direction
            if ((i - animateAfterIndex) % 2 === 0) {
                section.classList.add('slide-in-right');
            }
        }
    });

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    // Only observe sections that should animate (after Event Details)
    formSections.forEach((section, i) => {
        if (i > animateAfterIndex) {
            sectionObserver.observe(section);
        }
    });

    // --- Formatting helpers ---

    function parseNumber(str) {
        return parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
    }

    function formatCurrency(num) {
        return '$' + num.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    }

    function formatDateLong(dateStr) {
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
        const ordinal = getOrdinal(day);
        return `${days[date.getDay()]} ${months[date.getMonth()]} ${day}${ordinal}, ${year}`;
    }

    function getOrdinal(n) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return s[(v - 20) % 10] || s[v] || s[0];
    }

    function formatDateShort(dateStr) {
        const [year, month, day] = dateStr.split('-').map(Number);
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ];
        return `${months[month - 1]} ${day}${getOrdinal(day)}, ${year}`;
    }

    function numberToWords(n) {
        const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
            'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
        if (n < 20) return ones[n];
        if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? '-' + ones[n % 10] : '');
        if (n < 1000) return ones[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' ' + numberToWords(n % 100) : '');
        return n.toString();
    }

    // --- Payment / Gross linkage ---

    const numShowsSelect = document.getElementById('numShows');

    function updateGrossAuto() {
        if (!grossManuallyEdited) {
            const payment = parseNumber(paymentInput.value);
            const shows = parseInt(numShowsSelect.value) || 1;
            const total = payment * shows;
            grossInput.value = total > 0 ? total.toLocaleString('en-US') : '';
        }
    }

    paymentInput.addEventListener('input', updateGrossAuto);
    numShowsSelect.addEventListener('change', updateGrossAuto);

    paymentInput.addEventListener('blur', () => {
        const num = parseNumber(paymentInput.value);
        if (num > 0) {
            paymentInput.value = num.toLocaleString('en-US');
        }
    });

    grossInput.addEventListener('input', () => {
        const grossVal = parseNumber(grossInput.value);
        const payment = parseNumber(paymentInput.value);
        const shows = parseInt(numShowsSelect.value) || 1;
        const expectedGross = payment * shows;
        if (grossVal !== expectedGross && grossInput.value.trim() !== '') {
            grossManuallyEdited = true;
            grossHint.textContent = 'Manually set';
            grossHint.classList.add('overridden');
        } else {
            grossManuallyEdited = false;
            grossHint.textContent = 'Auto: Payment \u00d7 Shows';
            grossHint.classList.remove('overridden');
        }
    });

    grossInput.addEventListener('blur', () => {
        const num = parseNumber(grossInput.value);
        if (num > 0) {
            grossInput.value = num.toLocaleString('en-US');
        }
    });

    // --- PDF Generation ---

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const activeOfferBtn = document.querySelector('#offerType button.active');
        const offerType = activeOfferBtn ? activeOfferBtn.dataset.value : '';
        const talentName = document.getElementById('talentName').value.trim();
        // Agent: read from "Other" text input if agency is "other" or agent is "other"
        let talentAgent;
        if (agencySelect.value === 'other' || agentSelect.value === 'other') {
            talentAgent = agentOtherInput.value.trim();
        } else {
            talentAgent = agentSelect.value ? agentSelect.options[agentSelect.selectedIndex].text : '';
        }
        const talentAgency = agencySelect.value === 'other'
            ? agencyOtherInput.value.trim()
            : (agencySelect.value ? agencySelect.options[agencySelect.selectedIndex].text : '');
        const venueName = document.getElementById('venueName').value.trim();
        const venueCity = document.getElementById('venueCity').value.trim();
        const eventContact = document.getElementById('eventContact').value.trim();
        const perfMins = parseInt(document.getElementById('performanceTime').value) || 0;
        const performanceTime = perfMins > 180
            ? (perfTimeOtherInput.value.trim() || '')
            : (perfMins > 0 ? `Minimum of ${perfMins} minute performance` : '');
        const setTimeHour = document.getElementById('setTimeHour').value;
        const setTimeMinute = document.getElementById('setTimeMinute').value;
        const setTimePeriod = document.getElementById('setTimePeriod').value;
        const proposedSetTime = `${setTimeHour}:${setTimeMinute} ${setTimePeriod}`;
        const engagementDate = document.getElementById('engagementDate').value;
        const offerExpiration = document.getElementById('offerExpiration').value;
        const numShows = parseInt(numShowsSelect.value) || 1;
        const paymentAmount = parseNumber(paymentInput.value);
        const grossAmount = grossManuallyEdited ? parseNumber(grossInput.value) : paymentAmount * numShows;
        const activeBonusBtn = bonusToggle.querySelector('button.active');
        const bonusIncluded = activeBonusBtn ? activeBonusBtn.dataset.value : 'No';
        const bonusAmount = bonusIncluded === 'Yes' ? document.getElementById('bonusAmount').value.trim() : '';
        const bonusDescription = bonusIncluded === 'Yes' ? document.getElementById('bonusDescription').value.trim() : '';
        const activeAccomBtn = accommodationsToggle.querySelector('button.active');
        const accommodationsIncluded = activeAccomBtn ? activeAccomBtn.dataset.value : 'No';
        const numKingRooms = accommodationsIncluded === 'Yes' ? (parseInt(document.getElementById('numKingRooms').value) || 0) : 0;
        const numSuites = accommodationsIncluded === 'Yes' ? (parseInt(document.getElementById('numSuites').value) || 0) : 0;
        const numOtherRooms = accommodationsIncluded === 'Yes' ? (parseInt(otherRoomsSelect.value) || 0) : 0;
        const otherRoomType = otherRoomTypeInput.value.trim() || 'Room';
        const numNights = accommodationsIncluded === 'Yes' ? (parseInt(document.getElementById('numNights').value) || 1) : 1;
        const nonCompeteIncluded = getActiveValue(nonCompeteToggle);
        const nonCompeteMiles = document.getElementById('nonCompeteMiles').value;
        const nonCompeteDaysBefore = document.getElementById('nonCompeteDaysBefore').value;
        const nonCompeteDaysAfter = document.getElementById('nonCompeteDaysAfter').value;
        const mealPerDiem = parseInt(document.getElementById('mealPerDiem').value);
        const alcoholComp = parseInt(document.getElementById('alcoholComp').value);
        const activeTravelBtn = travelToggle.querySelector('button.active');
        const travelValue = activeTravelBtn ? activeTravelBtn.dataset.value : 'Landed';
        const travel = travelValue === 'Included' && travelDetailsInput.value.trim()
            ? `Included — ${travelDetailsInput.value.trim()}`
            : travelValue;
        let transportation;
        const activeTransBtn = transportationToggle.querySelector('button.active');
        const transportValue = activeTransBtn ? activeTransBtn.dataset.value : 'Ground Provided';
        if (transportValue === 'Ground Provided') {
            const groundValue = getActiveValue(groundTypeToggle);
            if (groundValue === 'Uber Buyout') {
                const uberAmount = parseInt(getActiveValue(uberBuyoutToggle));
                transportation = `Uber Buyout — ${formatCurrency(uberAmount)}`;
            } else {
                transportation = groundValue;
            }
        } else {
            transportation = 'Not Included';
        }

        // --- Type-specific fields ---
        let ticketPrice = '', venueCapacity = '', dealStructure = '';
        let hospitalityRider = '';
        let clientName = '', privateEventType = '', guestCount = '';

        let eventDetails = '';

        if (offerType === 'Festival') {
            ticketPrice = document.getElementById('ticketPrice').value.trim();
            venueCapacity = document.getElementById('venueCapacity').value.trim();
            dealStructure = getActiveValue(document.getElementById('dealStructure'));
            eventDetails = document.getElementById('eventDetails').value.trim();
        } else if (offerType === 'Soft Ticket (Nightclub/Dayclub)') {
            hospitalityRider = hospitalityRiderSelect.value;
        } else if (offerType === 'Private Event' || offerType === 'Public Corporate Event') {
            clientName = document.getElementById('clientName').value.trim();
            privateEventType = privateEventTypeSelect.value === 'other'
                ? privateEventTypeOtherInput.value.trim()
                : (privateEventTypeSelect.value || '');
            guestCount = document.getElementById('guestCount').value.trim();
            eventDetails = document.getElementById('eventDetails').value.trim();
        } else if (offerType === 'Hard Tickets') {
            // Theater has its own data gathering — handle separately
            const onSaleTime = getTheaterTime('theaterOnSaleTime', 'theaterOnSaleOtherHour', 'theaterOnSaleOtherMinute', 'theaterOnSaleOtherPeriod');

            const theaterData = {
                offerType, talentName, talentAgent, talentAgency,
                // Show Details
                eventContact: document.getElementById('theaterEventContact').value.trim(),
                eventContactAddress: document.getElementById('theaterEventContactAddress').value.trim(),
                eventContactEmail: document.getElementById('theaterEventContactEmail').value.trim(),
                agentLocation: document.getElementById('theaterAgentLocation').value.trim(),
                agentEmail: document.getElementById('theaterAgentEmail').value.trim(),
                eventTitle: document.getElementById('theaterEventTitle').value.trim(),
                numShows: document.getElementById('theaterNumShows').value,
                showDate: document.getElementById('theaterShowDate').value,
                doorsTime: getTheaterTime('theaterDoorsTime', 'theaterDoorsOtherHour', 'theaterDoorsOtherMinute', 'theaterDoorsOtherPeriod'),
                showTime: getTheaterTime('theaterShowTime', 'theaterShowOtherHour', 'theaterShowOtherMinute', 'theaterShowOtherPeriod'),
                curfewTime: getTheaterTime('theaterCurfewTime', 'theaterCurfewOtherHour', 'theaterCurfewOtherMinute', 'theaterCurfewOtherPeriod'),
                venue: document.getElementById('theaterVenue').value.trim(),
                cityState: document.getElementById('theaterCityState').value.trim(),
                capacity: document.getElementById('theaterCapacity').value.trim(),
                ageRestriction: getActiveValue(document.getElementById('theaterAgeRestriction')),
                // Offer Details
                headliner: document.getElementById('theaterHeadliner').value.trim(),
                headlinerFee: document.getElementById('theaterHeadlinerFee').value.trim(),
                support: document.getElementById('theaterSupport').value.trim(),
                supportFee: document.getElementById('theaterSupportFee').value.trim(),
                totalTalentCost: document.getElementById('theaterTotalTalentCost').value.trim(),
                dealStructure: getActiveValue(document.getElementById('theaterDealStructure')),
                dealStructureValue: document.getElementById('theaterDealStructureValue').value.trim(),
                dealTerms: document.getElementById('theaterDealTerms').value.trim(),
                // Ticket Scaling
                ticketScaling: Array.from(ticketScalingContainer.querySelectorAll('.ticket-scaling-row')).map(row => ({
                    type: row.querySelector('.scaling-type').value.trim(),
                    grossCap: row.querySelector('.scaling-gross-cap').value.trim(),
                    comps: row.querySelector('.scaling-comps').value.trim(),
                    kills: row.querySelector('.scaling-kills').value.trim(),
                    sellable: row.querySelector('.scaling-sellable').value.trim(),
                    price: row.querySelector('.scaling-price').value.trim(),
                    notes: row.querySelector('.scaling-notes').value.trim(),
                    gross: row.querySelector('.scaling-gross').value.trim(),
                })).filter(s => s.type || s.grossCap),
                grossPotential: document.getElementById('ticketGrossPotential').value.trim(),
                taxOnTopRate: document.getElementById('theaterTaxOnTopRate').value.trim(),
                taxOnTopLabel: document.getElementById('theaterTaxOnTopLabel').value.trim(),
                fmfChargeRate: document.getElementById('theaterFmfChargeRate').value.trim(),
                fmfChargeTotal: document.getElementById('theaterFmfChargeTotal').value.trim(),
                adjustedGrossPotential: document.getElementById('theaterAdjustedGrossPotential').value.trim(),
                netGrossPotential: document.getElementById('theaterNetGrossPotential').value.trim(),
                // Expenses (with notes)
                expenses: [
                    { name: 'Advertising', rate: document.getElementById('expenseAdvertisingRate').value.trim(), total: document.getElementById('expenseAdvertisingTotal').value.trim(), notes: document.getElementById('expenseAdvertisingNotes').value.trim() },
                    { name: 'ASCAP', rate: document.getElementById('expenseAscapRate').value.trim(), total: document.getElementById('expenseAscapTotal').value.trim(), notes: document.getElementById('expenseAscapNotes').value.trim() },
                    { name: 'BMI', rate: document.getElementById('expenseBmiRate').value.trim(), total: document.getElementById('expenseBmiTotal').value.trim(), notes: document.getElementById('expenseBmiNotes').value.trim() },
                    { name: 'Catering', rate: document.getElementById('expenseCateringRate').value.trim(), total: document.getElementById('expenseCateringTotal').value.trim(), notes: document.getElementById('expenseCateringNotes').value.trim() },
                    { name: 'CC Fees', rate: document.getElementById('expenseCcFeesRate').value.trim(), total: document.getElementById('expenseCcFeesTotal').value.trim(), notes: document.getElementById('expenseCcFeesNotes').value.trim() },
                    { name: 'Event Insurance Expense', rate: document.getElementById('expenseInsuranceRate').value.trim(), total: document.getElementById('expenseInsuranceTotal').value.trim(), notes: document.getElementById('expenseInsuranceNotes').value.trim() },
                    { name: 'GMR', rate: document.getElementById('expenseGmrRate').value.trim(), total: document.getElementById('expenseGmrTotal').value.trim(), notes: document.getElementById('expenseGmrNotes').value.trim() },
                    { name: 'House Nut', rate: document.getElementById('expenseHouseNutRate').value.trim(), total: document.getElementById('expenseHouseNutTotal').value.trim(), notes: document.getElementById('expenseHouseNutNotes').value.trim() },
                    { name: 'General Security', rate: document.getElementById('expenseSecurityRate').value.trim(), total: document.getElementById('expenseSecurityTotal').value.trim(), notes: document.getElementById('expenseSecurityNotes').value.trim() },
                    { name: 'Runners & Vans', rate: document.getElementById('expenseRunnersRate').value.trim(), total: document.getElementById('expenseRunnersTotal').value.trim(), notes: document.getElementById('expenseRunnersNotes').value.trim() },
                    { name: 'SESAC', rate: document.getElementById('expenseSesacRate').value.trim(), total: document.getElementById('expenseSesacTotal').value.trim(), notes: document.getElementById('expenseSesacNotes').value.trim() },
                    { name: 'Stagehands', rate: document.getElementById('expenseStagehandsRate').value.trim(), total: document.getElementById('expenseStagehandsTotal').value.trim(), notes: document.getElementById('expenseStagehandsNotes').value.trim() },
                ].filter(e => e.rate || e.total),
                expensesTotal: document.getElementById('expensesTotalAmount').value.trim(),
                // On Sale
                onSaleDate: document.getElementById('theaterOnSaleDate').value,
                onSaleTime,
                // Merchandise
                merchSeller: document.getElementById('theaterMerchSeller').value,
                merchSplit: document.getElementById('theaterMerchSplit').value.trim(),
                cdDvdSeller: document.getElementById('theaterCdDvdSeller').value,
                cdDvdSplit: document.getElementById('theaterCdDvdSplit').value.trim(),
                // Notes
                offerNotes: document.getElementById('theaterOfferNotes').value.trim(),
                venueNotes: document.getElementById('theaterVenueNotes').value.trim(),
            };

            if (!talentName || !talentAgent || !talentAgency || !theaterData.venue || !theaterData.showDate || !theaterData.headliner) {
                alert('Please fill in all required fields.');
                return;
            }

            generatePDF(theaterData);
            return;
        }

        if (!offerType || !talentName || !talentAgent || !talentAgency || !venueName || !venueCity || !eventContact || !engagementDate || !offerExpiration || paymentAmount <= 0) {
            alert('Please fill in all required fields.');
            return;
        }

        generatePDF({
            offerType,
            talentName,
            talentAgent,
            talentAgency,
            venueName,
            venueCity,
            eventContact,
            performanceTime,
            proposedSetTime,
            engagementDate,
            offerExpiration,
            numShows,
            paymentAmount,
            grossAmount,
            bonusIncluded,
            bonusAmount,
            bonusDescription,
            accommodationsIncluded,
            numKingRooms,
            numSuites,
            numOtherRooms,
            otherRoomType,
            numNights,
            nonCompeteIncluded,
            nonCompeteMiles,
            nonCompeteDaysBefore,
            nonCompeteDaysAfter,
            mealPerDiem,
            alcoholComp,
            travel,
            transportation,
            // Type-specific
            ticketPrice,
            venueCapacity,
            dealStructure,
            hospitalityRider,
            clientName,
            privateEventType,
            guestCount,
            eventDetails,
        });
    });

    function generatePDF(data) {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'in',
            format: 'letter',
        });

        const pageWidth = 8.5;
        const marginLeft = 1;
        const marginRight = 1;
        const contentWidth = pageWidth - marginLeft - marginRight;
        const labelX = marginLeft;
        const valueX = marginLeft + 2.2;
        const maxValueWidth = contentWidth - 2.2;

        let y = 1; // start from top (no logo)

        // --- Hard Tickets: Live Nation SHOW OFFER layout (bordered) ---
        if (data.offerType === 'Hard Tickets') {
            const tMargin = 0.5;
            const tWidth = pageWidth - tMargin * 2; // 7.5"
            const tX = tMargin;
            const rowH = 0.25;
            const barH = 0.22;
            const cellPad = 0.06;
            const pageBottom = 10.5;

            function formatCurrencyDec(num) {
                return '$' + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }

            function pgBreak(needed) {
                if (y + needed > pageBottom) {
                    doc.addPage();
                    y = tMargin;
                }
            }

            // Draw a dark section header bar (single label or multi-column labels)
            function sectionBar(labels, colWidths) {
                pgBreak(barH + rowH);
                doc.setFillColor(50, 50, 50);
                doc.setDrawColor(50, 50, 50);
                doc.rect(tX, y, tWidth, barH, 'F');
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(7);
                doc.setTextColor(255, 255, 255);
                let cx = tX;
                labels.forEach((label, i) => {
                    doc.text(label, cx + cellPad, y + barH * 0.65);
                    cx += colWidths[i];
                });
                y += barH;
            }

            // Draw a row of bordered cells
            function cellRow(cells, colWidths, rh) {
                rh = rh || rowH;
                doc.setDrawColor(180, 180, 180);
                doc.setLineWidth(0.004);
                let cx = tX;
                cells.forEach((cell, i) => {
                    const w = colWidths[i];
                    doc.rect(cx, y, w, rh);
                    const txt = String(cell.text ?? '');
                    doc.setFont('helvetica', cell.bold ? 'bold' : 'normal');
                    doc.setFontSize(cell.size || 8);
                    doc.setTextColor(30, 30, 30);
                    if (cell.align === 'right') {
                        doc.text(txt, cx + w - cellPad, y + rh * 0.65, { align: 'right' });
                    } else {
                        doc.text(txt, cx + cellPad, y + rh * 0.65);
                    }
                    cx += w;
                });
                y += rh;
            }

            // Two-column label:value row
            function lvRow(label, value) {
                const lw = tWidth * 0.30;
                const vw = tWidth - lw;
                cellRow([
                    { text: label, bold: true, size: 8 },
                    { text: value || '', size: 8 },
                ], [lw, vw]);
            }

            // ============ 1. HEADER ============
            y = 0.5;
            // Left: Event Contact info
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.setTextColor(30, 30, 30);
            if (data.eventContact) doc.text(data.eventContact, tX, y);
            if (data.eventContactAddress) { y += 0.14; doc.text(data.eventContactAddress, tX, y); }
            if (data.eventContactEmail) { y += 0.14; doc.text(data.eventContactEmail, tX, y); }

            // Right: Agent info
            let rightY = 0.5;
            const rightX = pageWidth - tMargin;
            if (data.talentAgent) { doc.text(data.talentAgent, rightX, rightY, { align: 'right' }); rightY += 0.14; }
            if (data.agentLocation) { doc.text(data.agentLocation, rightX, rightY, { align: 'right' }); rightY += 0.14; }
            if (data.agentEmail) { doc.text(data.agentEmail, rightX, rightY, { align: 'right' }); rightY += 0.14; }

            y = Math.max(y, rightY) + 0.2;

            // "Show Offer" title centered
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text('Show Offer', pageWidth / 2, y, { align: 'center' });

            y += 0.35;

            // ============ 2. EVENT ============
            sectionBar(['EVENT'], [tWidth]);
            lvRow('Event', data.eventTitle || `${data.headliner} at ${data.venue}`);
            lvRow('Venue', data.venue);
            lvRow('City', data.cityState);
            lvRow('# of Shows', data.numShows);
            y += 0.1;

            // ============ 3. DATE ============
            const dateCols7 = [tWidth * 0.18, tWidth * 0.12, tWidth * 0.12, tWidth * 0.12, tWidth * 0.16, tWidth * 0.15, tWidth * 0.15];
            sectionBar(['DATE', 'SHOW TIME', 'DOOR TIME', 'CURFEW', 'AGE RESTRICTION', 'ON SALE DATE', 'ON SALE TIME'], dateCols7);
            cellRow([
                { text: data.showDate ? formatDateShort(data.showDate) : '', size: 7 },
                { text: data.showTime, size: 7 },
                { text: data.doorsTime, size: 7 },
                { text: data.curfewTime, size: 7 },
                { text: data.ageRestriction, size: 7 },
                { text: data.onSaleDate ? formatDateShort(data.onSaleDate) : '', size: 7 },
                { text: data.onSaleTime || '', size: 7 },
            ], dateCols7);
            y += 0.1;

            // ============ 4. TALENT ============
            sectionBar(['TALENT'], [tWidth]);
            lvRow('Headliner', data.headliner);
            if (data.headlinerFee) {
                const hfNum = parseNumber(data.headlinerFee);
                lvRow('Headliner Fee', hfNum > 0 ? formatCurrencyDec(hfNum) : data.headlinerFee);
            }
            if (data.support) lvRow('Support', data.support);
            if (data.supportFee) {
                const sfNum = parseNumber(data.supportFee);
                lvRow('Support Fee', sfNum > 0 ? formatCurrencyDec(sfNum) : data.supportFee);
            }
            if (data.dealStructure) {
                const dsValue = data.dealStructureValue ? `: ${data.dealStructureValue}` : '';
                lvRow('Deal Structure', `${data.dealStructure}${dsValue}`);
            }

            // Deal Terms (may wrap — use variable height)
            if (data.dealTerms) {
                const lw = tWidth * 0.30;
                const vw = tWidth - lw;
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                const dtLines = doc.splitTextToSize(data.dealTerms, vw - cellPad * 2);
                const dtRowH = Math.max(rowH, dtLines.length * 0.14 + 0.08);
                pgBreak(dtRowH);
                doc.setDrawColor(180, 180, 180);
                doc.setLineWidth(0.004);
                doc.rect(tX, y, lw, dtRowH);
                doc.rect(tX + lw, y, vw, dtRowH);
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(8);
                doc.setTextColor(30, 30, 30);
                doc.text('Deal Terms', tX + cellPad, y + 0.16);
                doc.setFont('helvetica', 'normal');
                doc.text(dtLines, tX + lw + cellPad, y + 0.16);
                y += dtRowH;
            }

            // Total Talent Cost
            if (data.totalTalentCost) {
                const ttcNum = parseNumber(data.totalTalentCost);
                lvRow('Total Talent Cost', ttcNum > 0 ? formatCurrencyDec(ttcNum) : data.totalTalentCost);
            }
            y += 0.1;

            // ============ 5. TICKET SCALING ============
            if (data.ticketScaling && data.ticketScaling.length > 0) {
                const tsCols = [1.4, 0.8, 0.7, 0.7, 0.8, 0.7, 1.4, 1.0];
                // Adjust last column to fill remaining width
                const usedW = tsCols.slice(0, -1).reduce((a, b) => a + b, 0);
                tsCols[tsCols.length - 1] = tWidth - usedW;

                sectionBar(['TYPE', 'GROSS CAP', 'COMPS', 'KILLS', 'SELLABLE', 'PRICE', 'NOTES', 'GROSS'], tsCols);

                // Data rows
                let totalGrossCap = 0, totalComps = 0, totalKills = 0, totalSellable = 0;
                data.ticketScaling.forEach(tier => {
                    pgBreak(rowH);
                    totalGrossCap += parseNumber(tier.grossCap);
                    totalComps += parseNumber(tier.comps);
                    totalKills += parseNumber(tier.kills);
                    totalSellable += parseNumber(tier.sellable);
                    cellRow([
                        { text: tier.type || '', size: 7 },
                        { text: tier.grossCap || '', size: 7, align: 'right' },
                        { text: tier.comps || '', size: 7, align: 'right' },
                        { text: tier.kills || '', size: 7, align: 'right' },
                        { text: tier.sellable || '', size: 7, align: 'right' },
                        { text: tier.price || '', size: 7, align: 'right' },
                        { text: tier.notes || '', size: 7 },
                        { text: tier.gross || '', size: 7, align: 'right' },
                    ], tsCols);
                });

                // Totals row
                pgBreak(rowH);
                cellRow([
                    { text: 'TOTALS', bold: true, size: 7 },
                    { text: totalGrossCap > 0 ? totalGrossCap.toLocaleString() : '', size: 7, align: 'right', bold: true },
                    { text: totalComps > 0 ? totalComps.toLocaleString() : '', size: 7, align: 'right', bold: true },
                    { text: totalKills > 0 ? totalKills.toLocaleString() : '', size: 7, align: 'right', bold: true },
                    { text: totalSellable > 0 ? totalSellable.toLocaleString() : '', size: 7, align: 'right', bold: true },
                    { text: '', size: 7 },
                    { text: '', size: 7 },
                    { text: data.grossPotential || '', size: 7, align: 'right', bold: true },
                ], tsCols);

                // Tax / Fee extras below the table
                y += 0.08;
                const extLabelW = tWidth * 0.55;
                const extValueW = tWidth - extLabelW;
                if (data.taxOnTopRate) {
                    pgBreak(rowH);
                    cellRow([
                        { text: `Tax on Top: ${data.taxOnTopRate}% (${data.taxOnTopLabel || 'Tax'})`, size: 7 },
                        { text: '', size: 7, align: 'right' },
                    ], [extLabelW, extValueW]);
                }
                if (data.fmfChargeRate || data.fmfChargeTotal) {
                    pgBreak(rowH);
                    cellRow([
                        { text: `FMF/Venue Charge: ${data.fmfChargeRate || ''} per ticket`, size: 7 },
                        { text: data.fmfChargeTotal ? formatCurrency(parseNumber(data.fmfChargeTotal)) : '', size: 7, align: 'right' },
                    ], [extLabelW, extValueW]);
                }
                if (data.adjustedGrossPotential) {
                    pgBreak(rowH);
                    cellRow([
                        { text: 'Adjusted Gross Potential', bold: true, size: 7 },
                        { text: formatCurrency(parseNumber(data.adjustedGrossPotential)), size: 7, align: 'right', bold: true },
                    ], [extLabelW, extValueW]);
                }
                if (data.netGrossPotential) {
                    pgBreak(rowH);
                    cellRow([
                        { text: 'Net Gross Potential', bold: true, size: 7 },
                        { text: formatCurrency(parseNumber(data.netGrossPotential)), size: 7, align: 'right', bold: true },
                    ], [extLabelW, extValueW]);
                }
                y += 0.1;
            }

            // ============ 6. EXPENSES ============
            if (data.expenses && data.expenses.length > 0) {
                const expCols = [2.2, 2.0, 1.3, tWidth - 2.2 - 2.0 - 1.3];
                sectionBar(['EXPENSE', 'RATE', 'TOTAL', 'NOTES'], expCols);

                data.expenses.forEach(exp => {
                    pgBreak(rowH);
                    cellRow([
                        { text: exp.name || '', size: 7 },
                        { text: exp.rate || '', size: 7 },
                        { text: exp.total || '', size: 7, align: 'right' },
                        { text: exp.notes || '', size: 7 },
                    ], expCols);
                });

                // Total Expenses row
                pgBreak(rowH);
                cellRow([
                    { text: 'Total Expenses', bold: true, size: 7 },
                    { text: '', size: 7 },
                    { text: data.expensesTotal || '$0', size: 7, align: 'right', bold: true },
                    { text: '', size: 7 },
                ], expCols);
                y += 0.1;
            }

            // ============ 7. MERCHANDISE ============
            sectionBar(['MERCHANDISE'], [tWidth]);
            lvRow('Merchandise', `Seller: ${data.merchSeller || 'Venue'}  |  Split: ${data.merchSplit || '80.00/20.00'}`);
            lvRow('CD/DVD', `Seller: ${data.cdDvdSeller || 'Venue'}  |  Split: ${data.cdDvdSplit || '90.00/10.00'}`);
            y += 0.1;

            // ============ 8. SUMMARY POTENTIAL ============
            const netGP = parseNumber(data.netGrossPotential || data.adjustedGrossPotential || data.grossPotential || '0');
            const totalExp = parseNumber(data.expensesTotal || '0');
            const talentCostAmt = parseNumber(data.totalTalentCost || '0');

            const variableExpenseNames = ['ASCAP', 'BMI', 'CC Fees', 'Event Insurance Expense', 'GMR', 'SESAC'];
            let totalVariable = 0;
            let totalFixed = 0;
            if (data.expenses) {
                data.expenses.forEach(exp => {
                    const amt = parseNumber(exp.total || '0');
                    if (variableExpenseNames.includes(exp.name)) {
                        totalVariable += amt;
                    } else {
                        totalFixed += amt;
                    }
                });
            }

            pgBreak(barH + rowH * 4);
            sectionBar(['SUMMARY POTENTIAL'], [tWidth]);
            lvRow('Net Gross Potential', netGP > 0 ? formatCurrencyDec(netGP) : '');
            lvRow('Total Fixed Expenses', totalFixed > 0 ? formatCurrencyDec(totalFixed) : '$0.00');
            lvRow('Total Variable Expenses', totalVariable > 0 ? formatCurrencyDec(totalVariable) : '$0.00');
            lvRow('Total Artist Related Show Expenses', talentCostAmt > 0 ? formatCurrencyDec(talentCostAmt) : '$0.00');
            y += 0.1;

            // ============ 9. EARNINGS POTENTIAL ============
            const headlinerFeeAmt = parseNumber(data.headlinerFee || '0');
            const supportFeeAmt = parseNumber(data.supportFee || '0');
            const dsValMatch = (data.dealStructureValue || '').match(/([\d.]+)/);
            const dsPct = dsValMatch ? parseFloat(dsValMatch[1]) / 100 : 0;
            const profitPool = netGP - totalExp;

            let pdfHeadlineTalent = headlinerFeeAmt;
            let pdfTotalArtist = talentCostAmt;

            if (data.dealStructure === 'Versus' && dsPct > 0) {
                const versusAmt = profitPool * dsPct;
                pdfHeadlineTalent = Math.max(headlinerFeeAmt, versusAmt);
                pdfTotalArtist = pdfHeadlineTalent + supportFeeAmt;
            } else if (data.dealStructure === 'Plus Deal' && dsPct > 0) {
                pdfHeadlineTalent = headlinerFeeAmt + (profitPool * dsPct);
                pdfTotalArtist = pdfHeadlineTalent + supportFeeAmt;
            } else if (data.dealStructure === 'Straight Percentage' && dsPct > 0) {
                pdfHeadlineTalent = profitPool * dsPct;
                pdfTotalArtist = pdfHeadlineTalent + supportFeeAmt;
            }

            const promoterEarnings = netGP - totalExp - pdfTotalArtist;

            pgBreak(barH + rowH * 3);
            sectionBar(['EARNINGS POTENTIAL'], [tWidth]);
            lvRow('Headline Talent Potential', pdfHeadlineTalent > 0 ? formatCurrencyDec(pdfHeadlineTalent) : '$0.00');
            lvRow('Total Artist Potential (Inclusive of Support)', pdfTotalArtist > 0 ? formatCurrencyDec(pdfTotalArtist) : '$0.00');
            lvRow('Promoter Earnings', promoterEarnings !== 0 ? formatCurrencyDec(promoterEarnings) : '$0.00');
            y += 0.1;

            // ============ 10. OFFER NOTES ============
            pgBreak(barH + 0.4);
            sectionBar(['OFFER NOTES'], [tWidth]);
            if (data.offerNotes) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                doc.setTextColor(30, 30, 30);
                const noteLines = doc.splitTextToSize(data.offerNotes, tWidth - cellPad * 2);
                const noteH = Math.max(0.3, noteLines.length * 0.14 + 0.1);
                pgBreak(noteH);
                doc.setDrawColor(180, 180, 180);
                doc.setLineWidth(0.004);
                doc.rect(tX, y, tWidth, noteH);
                doc.text(noteLines, tX + cellPad, y + 0.14);
                y += noteH;
            } else {
                doc.setDrawColor(180, 180, 180);
                doc.setLineWidth(0.004);
                doc.rect(tX, y, tWidth, 0.3);
                y += 0.3;
            }
            y += 0.1;

            // ============ 11. VENUE NOTES ============
            pgBreak(barH + 0.4);
            sectionBar(['VENUE NOTES'], [tWidth]);
            if (data.venueNotes) {
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8);
                doc.setTextColor(30, 30, 30);
                const vnLines = doc.splitTextToSize(data.venueNotes, tWidth - cellPad * 2);
                const vnH = Math.max(0.3, vnLines.length * 0.14 + 0.1);
                pgBreak(vnH);
                doc.setDrawColor(180, 180, 180);
                doc.setLineWidth(0.004);
                doc.rect(tX, y, tWidth, vnH);
                doc.text(vnLines, tX + cellPad, y + 0.14);
                y += vnH;
            } else {
                doc.setDrawColor(180, 180, 180);
                doc.setLineWidth(0.004);
                doc.rect(tX, y, tWidth, 0.3);
                y += 0.3;
            }

            // Save
            const safeName = data.headliner.replace(/[^a-zA-Z0-9]/g, '_');
            const safeDate = data.showDate.replace(/-/g, '');
            doc.save(`${safeName}_${safeDate}_Show_Offer.pdf`);
            return;
        }

        // --- Title (all other offer types) ---
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('TALENT ENGAGEMENT TERM SHEET', pageWidth / 2, y, { align: 'center' });
        y += 0.3;

        // --- Offer Type ---
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(80, 80, 80);
        doc.text(data.offerType, pageWidth / 2, y, { align: 'center' });
        y += 0.4;

        // --- Section: TALENT DETAILS ---
        y = drawSectionHeader(doc, 'TALENT DETAILS', marginLeft, y, contentWidth);
        y = drawField(doc, 'Talent (Artist):', data.talentName, labelX, valueX, y, maxValueWidth);
        y = drawField(doc, "Talent's Agent:", data.talentAgent, labelX, valueX, y, maxValueWidth);
        y = drawField(doc, "Agent Agency:", data.talentAgency, labelX, valueX, y, maxValueWidth);
        y += 0.25;

        // --- Section: EVENT DETAILS ---
        y = drawSectionHeader(doc, 'EVENT DETAILS', marginLeft, y, contentWidth);
        y = drawField(doc, 'Venue:', `${data.venueName} (the "Venue")`, labelX, valueX, y, maxValueWidth);
        y = drawField(doc, 'Performance Time:', data.performanceTime, labelX, valueX, y, maxValueWidth);
        y = drawField(doc, 'Proposed Set Time:', data.proposedSetTime, labelX, valueX, y, maxValueWidth);
        y = drawField(doc, 'Event Contact:', data.eventContact, labelX, valueX, y, maxValueWidth);
        y = drawField(doc, 'Engagement Date:', formatDateLong(data.engagementDate), labelX, valueX, y, maxValueWidth);
        if (data.eventDetails) y = drawField(doc, 'Event Details:', data.eventDetails, labelX, valueX, y, maxValueWidth);
        y += 0.25;

        // --- Type-specific sections ---
        if (data.offerType === 'Festival') {
            y = drawSectionHeader(doc, 'DEAL TERMS', marginLeft, y, contentWidth);
            if (data.ticketPrice) y = drawField(doc, 'Ticket Price:', '$' + data.ticketPrice, labelX, valueX, y, maxValueWidth);
            if (data.venueCapacity) y = drawField(doc, 'Venue Capacity:', data.venueCapacity, labelX, valueX, y, maxValueWidth);
            if (data.dealStructure) y = drawField(doc, 'Deal Structure:', data.dealStructure, labelX, valueX, y, maxValueWidth);
            y += 0.25;
        } else if (data.offerType === 'Private Event' || data.offerType === 'Public Corporate Event') {
            y = drawSectionHeader(doc, 'EVENT INFO', marginLeft, y, contentWidth);
            if (data.clientName) y = drawField(doc, 'Client:', data.clientName, labelX, valueX, y, maxValueWidth);
            if (data.privateEventType) y = drawField(doc, 'Event Type:', data.privateEventType, labelX, valueX, y, maxValueWidth);
            if (data.guestCount) y = drawField(doc, 'Guest Count:', data.guestCount, labelX, valueX, y, maxValueWidth);
            y += 0.25;
        }

        // --- Section: TERMS ---
        y = drawSectionHeader(doc, 'TERMS', marginLeft, y, contentWidth);

        const payFormatted = formatCurrency(data.paymentAmount);
        const grossFormatted = formatCurrency(data.grossAmount);

        y = drawField(doc, 'Offer Expiration:', formatDateShort(data.offerExpiration), labelX, valueX, y, maxValueWidth);

        // Payment with boilerplate
        const showsWord = numberToWords(data.numShows).charAt(0).toUpperCase() + numberToWords(data.numShows).slice(1);
        const showLabel = data.numShows === 1 ? 'Show' : 'Shows';
        const perfLabel = data.numShows === 1 ? 'Performance' : 'Performances';
        const paymentText = `${showsWord} (${data.numShows}) ${showLabel} at ${payFormatted} for a completed appearance at the Venue (each, a "Performance").`;
        y = drawField(doc, 'Payment:', paymentText, labelX, valueX, y, maxValueWidth);

        // Gross with boilerplate
        const grossText = `${grossFormatted} (assuming ${numberToWords(data.numShows)} (${data.numShows}) completed ${perfLabel}).`;
        y = drawField(doc, 'Gross:', grossText, labelX, valueX, y, maxValueWidth);

        // Bonus
        if (data.bonusIncluded === 'Yes' && data.bonusAmount) {
            const bonusText = data.bonusDescription
                ? `${formatCurrency(parseNumber(data.bonusAmount))} — ${data.bonusDescription}`
                : formatCurrency(parseNumber(data.bonusAmount));
            y = drawField(doc, 'Bonus:', bonusText, labelX, valueX, y, maxValueWidth);
        }

        // Accommodations
        let accomText;
        const totalRooms = data.numKingRooms + data.numSuites + data.numOtherRooms;
        if (data.accommodationsIncluded !== 'Yes' || totalRooms === 0) {
            accomText = 'None';
        } else {
            const parts = [];
            if (data.numKingRooms > 0) {
                const w = numberToWords(data.numKingRooms).charAt(0).toUpperCase() + numberToWords(data.numKingRooms).slice(1);
                parts.push(`${w} (${data.numKingRooms}) King ${data.numKingRooms === 1 ? 'Room' : 'Rooms'}`);
            }
            if (data.numSuites > 0) {
                const w = parts.length === 0
                    ? numberToWords(data.numSuites).charAt(0).toUpperCase() + numberToWords(data.numSuites).slice(1)
                    : numberToWords(data.numSuites);
                parts.push(`${w} (${data.numSuites}) ${data.numSuites === 1 ? 'Suite' : 'Suites'}`);
            }
            if (data.numOtherRooms > 0) {
                const w = parts.length === 0
                    ? numberToWords(data.numOtherRooms).charAt(0).toUpperCase() + numberToWords(data.numOtherRooms).slice(1)
                    : numberToWords(data.numOtherRooms);
                const label = data.numOtherRooms === 1 ? data.otherRoomType : data.otherRoomType + 's';
                parts.push(`${w} (${data.numOtherRooms}) ${label}`);
            }
            const nightsWord = numberToWords(data.numNights);
            const nightLabel = data.numNights === 1 ? 'night' : 'nights';
            const roomList = parts.length > 1 ? parts.slice(0, -1).join(', ') + ' and ' + parts[parts.length - 1] : parts[0];
            accomText = `${roomList} for ${nightsWord} (${data.numNights}) ${nightLabel} per Performance`;
        }
        y = drawField(doc, 'Accommodations:', accomText, labelX, valueX, y, maxValueWidth);
        // Hospitality Rider (Soft Ticket only, only when "Yes")
        if (data.offerType === 'Soft Ticket (Nightclub/Dayclub)' && data.hospitalityRider === 'Yes') {
            y = drawField(doc, 'Hospitality Rider (honored):', data.hospitalityRider, labelX, valueX, y, maxValueWidth);
        }
        if (data.offerType !== 'Festival' && data.offerType !== 'Private Event' && data.offerType !== 'Public Corporate Event') {
            const mealText = data.mealPerDiem > 0
                ? `Not to exceed ${formatCurrency(data.mealPerDiem)} tab`
                : 'N/A';
            y = drawField(doc, 'Meals / Per Diem:', mealText, labelX, valueX, y, maxValueWidth);
            const alcoholText = data.alcoholComp > 0
                ? `${formatCurrency(data.alcoholComp)} beverage tab in venue credit for Artists per event`
                : 'N/A';
            y = drawField(doc, 'Alcohol Comp:', alcoholText, labelX, valueX, y, maxValueWidth);
        }
        y = drawField(doc, 'Travel:', data.travel, labelX, valueX, y, maxValueWidth);
        y = drawField(doc, 'Transportation:', data.transportation, labelX, valueX, y, maxValueWidth);

        // Non-Compete (paragraph) — not applicable for Private/Public Corporate Events, or if set to No
        if (data.offerType !== 'Private Event' && data.offerType !== 'Public Corporate Event' && data.nonCompeteIncluded === 'Yes') {
            const milesWord = numberToWords(parseInt(data.nonCompeteMiles));
            const daysBeforeWord = numberToWords(parseInt(data.nonCompeteDaysBefore));
            const daysAfterWord = numberToWords(parseInt(data.nonCompeteDaysAfter));
            const nonCompete = `Artist shall not host or perform at any other nightclub, bar, private party, or lounge within ${milesWord} (${data.nonCompeteMiles}) miles of ${data.venueCity} during the Engagement Period or within ${daysBeforeWord} (${data.nonCompeteDaysBefore}) days before or ${daysAfterWord} (${data.nonCompeteDaysAfter}) days after such period.`;
            y = drawField(doc, 'Non-Compete:', nonCompete, labelX, valueX, y, maxValueWidth);
        }

        // --- Save ---
        const safeName = data.talentName.replace(/[^a-zA-Z0-9]/g, '_');
        const safeDate = data.engagementDate.replace(/-/g, '');
        doc.save(`${safeName}_${safeDate}_Live_Music_Performance_Term_Sheet.pdf`);
    }

    function drawSectionHeader(doc, title, x, y, width) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(40, 40, 40);
        doc.text(title, x, y);
        y += 0.06;
        doc.setDrawColor(100, 100, 100);
        doc.setLineWidth(0.01);
        doc.line(x, y, x + width, y);
        y += 0.3;
        return y;
    }

    function drawField(doc, label, value, labelX, valueX, y, maxValueWidth) {
        const lineHeight = 0.2;

        // Label
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
        doc.text(label, labelX, y);

        // Value — may wrap
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(30, 30, 30);
        const lines = doc.splitTextToSize(value, maxValueWidth);
        doc.text(lines, valueX, y);

        const totalLines = Math.max(1, lines.length);
        y += totalLines * lineHeight + 0.08;
        return y;
    }

})();
