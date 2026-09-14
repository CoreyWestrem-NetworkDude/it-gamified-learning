const commandPromptGame = {
    id: "command-prompt",
    title: "Command Prompt (cmd.exe)",
    levels: [
        { level: 1, taskDescription: "Triage host configuration to find the local loopback adapter interface properties.", hintChain: ["List local network interfaces.", "Use the standard configuration tool.", "Type: ipconfig"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "ipconfig" },
        { level: 2, taskDescription: "Flush local DNS resolver cache to clear corrupt web assets.", hintChain: ["Flush the DNS.", "Use the ipconfig switch for flushdns.", "Type: ipconfig /flushdns"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "ipconfig /flushdns" },
        { level: 3, taskDescription: "Test connection response to the main corporate domain server at 10.0.0.1.", hintChain: ["Send echo packets.", "Ping the IP address.", "Type: ping 10.0.0.1"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "ping 10.0.0.1" },
        { level: 4, taskDescription: "Display all active connections and listening ports on this host.", hintChain: ["View active network statistics.", "Use netstat.", "Type: netstat"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "netstat" },
        { level: 5, taskDescription: "Release the current DHCP lease configuration for local Ethernet adapter.", hintChain: ["Release IP settings.", "Use the release parameter.", "Type: ipconfig /release"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "ipconfig /release" }
    ]
};

// Bulletproof fallback loop to populate up to level 150 without gaps
for (let i = 6; i <= 150; i++) {
    let tierLabel = i <= 50 ? "Tier 1 Support" : i <= 100 ? "Tier 2 Engineering" : "Tier 3 Enterprise";
    commandPromptGame.levels.push({
        level: i,
        taskDescription: `[${tierLabel} Challenge]: Run 'echo level-${i}' to authenticate verification tokens.`,
        hintChain: ["Output text lines.", "Use echo.", `Type: echo level-${i}`],
        validateAction: (t, cmd) => t === "command" && cmd.trim().toLowerCase() === `echo level-${i}`
    });
}
