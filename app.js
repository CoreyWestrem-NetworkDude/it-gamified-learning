// Master State Engine Configuration Object
const AppState = {
    currentGameModule: "active-directory",
    currentLevelIndex: 0,
    strikeCount: 0,
    maxStrikes: 3
};

// Interface DOM Node Registries
const DOM = {
    btnLoadAd: document.getElementById("btn-load-ad"),
    btnLoadCli: document.getElementById("btn-load-cli"),
    viewActiveDirectory: document.getElementById("view-active-directory"),
    viewCommandPrompt: document.getElementById("view-command-prompt"),
    smToolsTrigger: document.getElementById("sm-tools-trigger"),
    smToolsDropdown: document.getElementById("sm-tools-dropdown"),
    aducTrigger: document.getElementById("aduc-trigger"),
    adWizardView: document.getElementById("ad-wizard-view"),
    cliInput: document.getElementById("cli-input"),
    cliOutput: document.getElementById("cli-output"),
    cliTicketDesc: document.getElementById("cli-ticket-desc"),
    streakMeter: document.getElementById("streak-meter"),
    strikeBadge: document.getElementById("strike-badge"),
    hintOverlay: document.getElementById("hint-overlay"),
    hintText: document.getElementById("hint-text"),
    celebrationScreen: document.getElementById("celebration-screen")
};

// Module Route Loader Navigation Rules
function switchWorkspaceView(targetModule) {
    AppState.currentGameModule = targetModule;
    AppState.currentLevelIndex = 0;
    AppState.strikeCount = 0;
    hideHint();

    if (targetModule === "active-directory") {
        DOM.btnLoadAd.classList.add("active");
        DOM.btnLoadCli.classList.remove("active");
        DOM.viewActiveDirectory.classList.remove("hidden");
        DOM.viewCommandPrompt.classList.add("hidden");
        loadAdLevel();
    } else {
        DOM.btnLoadAd.classList.remove("active");
        DOM.btnLoadCli.classList.add("active");
        DOM.viewActiveDirectory.classList.add("hidden");
        DOM.viewCommandPrompt.classList.remove("hidden");
        loadCliLevel();
    }
}

// Active Directory Game Subsystem Router Loop
function loadAdLevel() {
    const levelData = activeDirectoryGame.levels[AppState.currentLevelIndex];
    updateTelemetry(`AD: Level ${levelData.level}`);
    DOM.adWizardView.innerHTML = `
        <h3>Dashboard Tasks</h3>
        <p class="placeholder-text"><strong>Objective:</strong> ${levelData.taskDescription}</p>
    `;
}

// Command Prompt Game Subsystem Router Loop
function loadCliLevel() {
    const levelData = commandPromptGame.levels[AppState.currentLevelIndex];
    updateTelemetry(`CLI: Level ${levelData.level}`);
    DOM.cliTicketDesc.innerHTML = `<strong>Active Ticket:</strong> ${levelData.taskDescription}`;
}

// Telemetry and Hint Handler Mechanics
function handleActionFailure() {
    AppState.strikeCount++;
    const game = AppState.currentGameModule === "active-directory" ? activeDirectoryGame : commandPromptGame;
    const currentLevel = game.levels[AppState.currentLevelIndex];

    DOM.strikeBadge.textContent = `Strikes: ${AppState.strikeCount}/${AppState.maxStrikes}`;
    DOM.strikeBadge.className = "strike-alert";

    if (AppState.strikeCount >= AppState.maxStrikes) {
        // Display context hint from the level array index constraints safely
        const hintIndex = Math.min(AppState.strikeCount - 3, currentLevel.hintChain.length - 1);
        DOM.hintText.textContent = currentLevel.hintChain[hintIndex];
        DOM.hintOverlay.classList.remove("hidden");
    }
}

function hideHint() {
    DOM.hintOverlay.classList.add("hidden");
    DOM.strikeBadge.textContent = `Strikes: 0/${AppState.maxStrikes}`;
    DOM.strikeBadge.className = "strike-clear";
}

function updateTelemetry(text) {
    DOM.streakMeter.textContent = `🎯 ${text}`;
}

// Victory Condition Execution Sequence Loop
function triggerLevelSuccess(game) {
    hideHint();
    AppState.strikeCount = 0;
    DOM.celebrationScreen.classList.remove("hidden");

    setTimeout(() => {
        DOM.celebrationScreen.classList.add("hidden");
        AppState.currentLevelIndex++;

        if (AppState.currentLevelIndex < game.levels.length) {
            if (AppState.currentGameModule === "active-directory") loadAdLevel();
            else loadCliLevel();
        } else {
            DOM.adWizardView.innerHTML = `<h3>🎉 Simulation Complete!</h3><p>You have mastered this technical deployment track.</p>`;
            updateTelemetry("Track Complete!");
        }
    }, 1800);
}

// Input Listener Event Bindings Setup Layout
DOM.btnLoadAd.addEventListener("click", () => switchWorkspaceView("active-directory"));
DOM.btnLoadCli.addEventListener("click", () => switchWorkspaceView("command-prompt"));

DOM.smToolsTrigger.addEventListener("click", () => {
    DOM.smToolsDropdown.classList.toggle("hidden");
    if (AppState.currentGameModule === "active-directory") {
        if (activeDirectoryGame.levels[AppState.currentLevelIndex].validateAction("click", "sm-tools-trigger")) {
            triggerLevelSuccess(activeDirectoryGame);
        } else {
            handleActionFailure();
        }
    }
});

DOM.aducTrigger.addEventListener("click", () => {
    DOM.smToolsDropdown.classList.add("hidden");
    if (AppState.currentGameModule === "active-directory") {
        if (activeDirectoryGame.levels[AppState.currentLevelIndex].validateAction("click", "aduc-trigger")) {
            // Transform interface workspace view area to mimic authentic opened ADUC panel
            DOM.adWizardView.innerHTML = `
                <div style="background: white; border: 1px solid #ccc; padding: 10px; height: 80%;">
                    <strong>Active Directory Users and Computers</strong>
                    <hr>
                    <div style="display:flex; gap:20px; margin-top:10px;">
                        <div style="border-right:1px solid #eee; width:30%;">📁 corp.local</div>
                        <div>👉 [Domain Controllers]<br>👉 [Users]</div>
                    </div>
                </div>
            `;
            triggerLevelSuccess(activeDirectoryGame);
        } else {
            handleActionFailure();
        }
    }
});

DOM.cliInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const inputCmd = DOM.cliInput.value;
        DOM.cliInput.value = "";

        // Render mock system terminal echo returns lines onto desktop panel wrapper
        const lineEcho = document.createElement("p");
        lineEcho.textContent = `C:\\Users\\Administrator>${inputCmd}`;
        DOM.cliOutput.appendChild(lineEcho);

        if (AppState.currentGameModule === "command-prompt") {
            const levelData = commandPromptGame.levels[AppState.currentLevelIndex];
            if (levelData.validateAction("command", inputCmd)) {
                const responseLine = document.createElement("p");
                responseLine.style.color = "#2ecc71";
                responseLine.textContent = "\nEthernet adapter vEthernet (External):\n   Connection-specific DNS Suffix . : corp.local\n   IPv4 Address. . . . . . . . . . . : 10.0.0.15\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 10.0.0.1\n";
                DOM.cliOutput.appendChild(responseLine);
                triggerLevelSuccess(commandPromptGame);
            } else {
                const faultLine = document.createElement("p");
                faultLine.style.color = "#e74c3c";
                faultLine.textContent = `'${inputCmd}' is recognized as a functional operational parameter but fails the specific ticket troubleshooting requirements loop profile tracking constraints.`;
                DOM.cliOutput.appendChild(faultLine);
                handleActionFailure();
            }
        }
    }
});

// Initialize Framework Ingress Pipeline Routing Environment Setup
switchWorkspaceView("active-directory");
