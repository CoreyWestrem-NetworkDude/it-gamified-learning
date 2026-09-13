// Master State Engine Configuration Object with Local Cache Checks
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

// 💾 LOCAL CACHE SYSTEM MECHANICS (Save and Load Functions)
function saveProgressToCache() {
    const cachePayload = {
        module: AppState.currentGameModule,
        levelIndex: AppState.currentLevelIndex
    };
    localStorage.setItem("it_simulator_progress", JSON.stringify(cachePayload));
}

function loadProgressFromCache() {
    const cachedData = localStorage.getItem("it_simulator_progress");
    if (cachedData) {
        try {
            const parsed = JSON.parse(cachedData);
            AppState.currentGameModule = parsed.module || "active-directory";
            AppState.currentLevelIndex = parsed.levelIndex || 0;
            console.log(`[STATE LOADED]: Restored save state at ${AppState.currentGameModule} - Index ${AppState.currentLevelIndex}`);
        } catch (e) {
            console.error("Failed to recover historical telemetry profile state logs.", e);
        }
    }
}

// Module Route Loader Navigation Rules
function switchWorkspaceView(targetModule, initializationMode = false) {
    AppState.currentGameModule = targetModule;
    if (!initializationMode) {
        AppState.currentLevelIndex = 0;
    }
    AppState.strikeCount = 0;
    hideHint();
    saveProgressToCache();

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
    if (AppState.currentLevelIndex >= activeDirectoryGame.levels.length) {
        AppState.currentLevelIndex = activeDirectoryGame.levels.length - 1;
    }
    const levelData = activeDirectoryGame.levels[AppState.currentLevelIndex];
    updateTelemetry(`AD: Level ${levelData.level}`);
    DOM.adWizardView.innerHTML = `
        <h3>Dashboard Tasks</h3>
        <p class="placeholder-text"><strong>Objective:</strong> ${levelData.taskDescription}</p>
    `;
}

// Command Prompt Game Subsystem Router Loop
function loadCliLevel() {
    if (AppState.currentLevelIndex >= commandPromptGame.levels.length) {
        AppState.currentLevelIndex = commandPromptGame.levels.length - 1;
    }
    const levelData = commandPromptGame.levels[AppState.currentLevelIndex];
    updateTelemetry(`CLI: Level ${levelData.level}`);
    DOM.cliTicketDesc.innerHTML = `<strong>Active Ticket:</strong> [Level ${levelData.level}/150] ${levelData.taskDescription}`;
}

// Telemetry and Hint Handler Mechanics
function handleActionFailure() {
    AppState.strikeCount++;
    const game = AppState.currentGameModule === "active-directory" ? activeDirectoryGame : commandPromptGame;
    const currentLevel = game.levels[AppState.currentLevelIndex];

    DOM.strikeBadge.textContent = `Strikes: ${AppState.strikeCount}/${AppState.maxStrikes}`;
    DOM.strikeBadge.className = "strike-alert";

    if (AppState.strikeCount >= AppState.maxStrikes) {
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
    
    const completedLevelNum = game.levels[AppState.currentLevelIndex].level;
    let promoText = "🎉 SUCCESS! LEVEL ACHIEVED 🎉";

    if (game.id === "command-prompt") {
        if (completedLevelNum === 50) {
            promoText = `👨‍💻 PROMOTED: Tier 2 Desktop Infrastructure Specialist!<br><span style="font-size:16px; font-weight:normal;">+25% Virtual Salary Bump | Active Domain Tooling Clearances Granted</span>`;
        } else if (completedLevelNum === 100) {
            promoText = `🛡️ PROMOTED: Tier 3 Enterprise Systems Architect!<br><span style="font-size:16px; font-weight:normal;">Root Domain Write Permissions Enabled | Core Server Failover Control Keys Handed Over</span>`;
        } else if (completedLevelNum === 150) {
            promoText = `👑 ENTERPRISE MASTERED: Chief Technology Officer (CTO)!<br><span style="font-size:16px; font-weight:normal;">Full Simulation Syllabus Complete. Total Architecture Dominance Achieved.</span>`;
        }
    }

    DOM.celebrationScreen.innerHTML = promoText;
    DOM.celebrationScreen.classList.remove("hidden");

    setTimeout(() => {
        DOM.celebrationScreen.classList.add("hidden");
        
        // 🧼 WIPE WINDOW CLEAN: Erase terminal scroll history right before loading the next level ticket
        if (game.id === "command-prompt") {
            DOM.cliOutput.innerHTML = `
                <p>Microsoft Windows [Version 10.0.22631.3527]</p>
                <p>(c) Microsoft Corporation. All rights reserved.</p>
                <br>
            `;
        }

        AppState.currentLevelIndex++;
        saveProgressToCache();

        if (AppState.currentLevelIndex < game.levels.length) {
            if (AppState.currentGameModule === "active-directory") loadAdLevel();
            else loadCliLevel();
        } else {
            if (AppState.currentGameModule === "command-prompt") {
                DOM.cliOutput.innerHTML += `<p style="color:#2ecc71; font-weight:bold;">\n[COMPLETED]: Configuration space validation cleared. Total IT Mastery achieved!</p>`;
            } else {
                DOM.adWizardView.innerHTML = `<h3>🎉 Simulation Complete!</h3><p>You have mastered this technical deployment track.</p>`;
            }
            updateTelemetry("Track Complete!");
        }
    }, completedLevelNum === 50 || completedLevelNum === 100 || completedLevelNum === 150 ? 4500 : 1500);
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

        const lineEcho = document.createElement("p");
        lineEcho.textContent = `C:\\Users\\Administrator>${inputCmd}`;
        DOM.cliOutput.appendChild(lineEcho);

        if (AppState.currentGameModule === "command-prompt") {
            const levelData = commandPromptGame.levels[AppState.currentLevelIndex];
            if (levelData.validateAction("command", inputCmd)) {
                const responseLine = document.createElement("p");
                responseLine.style.color = "#2ecc71";
                responseLine.textContent = `[OK]: Command authorized. Configuration snapshot validation loop passed.`;
                DOM.cliOutput.appendChild(responseLine);
                triggerLevelSuccess(commandPromptGame);
            } else {
                const faultLine = document.createElement("p");
                faultLine.style.color = "#e74c3c";
                faultLine.textContent = `'${inputCmd}' is an unhandled instruction parameter. Ticket criteria validation failed.`;
                DOM.cliOutput.appendChild(faultLine);
                handleActionFailure();
            }
            DOM.cliOutput.scrollTop = DOM.cliOutput.scrollHeight;
        }
    }
});

// Initialize and Boot the Engine
loadProgressFromCache();
switchWorkspaceView(AppState.currentGameModule, true);
