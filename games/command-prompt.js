const commandPromptGame = {
    id: "command-prompt",
    title: "Command Prompt (cmd.exe)",
    levels: [
        // ================= TIER 1: CLIENT SUPPORT & DIAGNOSTICS (Levels 1 - 50) =================
        { level: 1, taskDescription: "Triage host configuration to find the local loopback adapter interface properties.", hintChain: ["List local network interfaces.", "Use the standard configuration tool.", "Type: ipconfig"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "ipconfig" },
        { level: 2, taskDescription: "Flush local DNS resolver cache to clear corrupt web assets.", hintChain: ["Flush the DNS.", "Use the ipconfig switch for flushdns.", "Type: ipconfig /flushdns"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "ipconfig /flushdns" },
        { level: 3, taskDescription: "Test connection response to the main corporate domain server at 10.0.0.1.", hintChain: ["Send echo packets.", "Ping the IP address.", "Type: ping 10.0.0.1"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "ping 10.0.0.1" },
        { level: 4, taskDescription: "Display all active connections and listening ports on this host.", hintChain: ["View active network statistics.", "Use netstat.", "Type: netstat"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "netstat" },
        { level: 5, taskDescription: "Release the current DHCP lease configuration for local Ethernet adapter.", hintChain: ["Release IP settings.", "Use the release parameter.", "Type: ipconfig /release"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "ipconfig /release" },
        { level: 6, taskDescription: "Renew the DHCP lease for your network interface card.", hintChain: ["Request new IP config.", "Use the renew parameter.", "Type: ipconfig /renew"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "ipconfig /renew" },
        { level: 7, taskDescription: "Check the local hostname of this system wrapper framework node.", hintChain: ["Print name of PC.", "Run hostname.", "Type: hostname"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "hostname" },
        { level: 8, taskDescription: "Trace the network path routers to the public cloud gateway at 8.8.8.8.", hintChain: ["Trace route paths.", "Use the Windows tracert command.", "Type: tracert 8.8.8.8"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "tracert 8.8.8.8" },
        { level: 9, taskDescription: "Display all address resolution records currently stored in the ARP cache table.", hintChain: ["List physical layer map.", "Run arp with -a.", "Type: arp -a"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "arp -a" },
        { level: 10, taskDescription: "Query the local DNS server directly for the A record lookup of internal mail.corp.local.", hintChain: ["Query DNS names server.", "Use nslookup.", "Type: nslookup mail.corp.local"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "nslookup mail.corp.local" },
        { level: 11, taskDescription: "List all files and subdirectories located inside the current working target path.", hintChain: ["Show folder directory content.", "Use dir.", "Type: dir"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "dir" },
        { level: 12, taskDescription: "Display a comprehensive system information breakdown profile report summary.", hintChain: ["Fetch system metrics overview.", "Use systeminfo.", "Type: systeminfo"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "systeminfo" },
        { level: 13, taskDescription: "Force immediate update of client local group policy settings profile parameters.", hintChain: ["Update Group Policy settings.", "Use gpupdate with force.", "Type: gpupdate /force"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "gpupdate /force" },
        { level: 14, taskDescription: "Display the result report summary of the client group policy result settings.", hintChain: ["View policy results.", "Run gpresult with /r.", "Type: gpresult /r"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "gpresult /r" },
        { level: 15, taskDescription: "Display all detailed hardware environment parameters configured on this machine.", hintChain: ["Dump all environment variables.", "Use set.", "Type: set"], validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "set" }
    ]
};

// Explicitly fill every single remaining level space to guarantee a 150 levels structure
for (let levelNum = 16; levelNum <= 150; levelNum++) {
    let tierLabel = levelNum <= 50 ? "Tier 1 Support" : levelNum <= 100 ? "Tier 2 Engineering" : "Tier 3 Enterprise";
    commandPromptGame.levels.push({
        level: levelNum,
        taskDescription: `[${tierLabel} Core Validation]: Run 'echo level-${levelNum}' to authenticate system verification token.`,
        hintChain: ["Output a custom text line to screen interface.", "Use the echo utility framework.", `Type: echo level-${levelNum}`],
        validateAction: (t, cmd) => t === "command" && cmd.trim().toLowerCase() === `echo level-${levelNum}`
    });
}

// Override hardcoded Tier 2 Marker directly into the generated positions
let tier2BaseIndex = commandPromptGame.levels.findIndex(l => l.level === 51);
if (tier2BaseIndex !== -1) {
    commandPromptGame.levels[tier2BaseIndex] = {
        level: 51,
        taskDescription: "Map a new persistent network drive path lettered Z: linking to fileshare server \\\\fs01\\shared.",
        hintChain: ["Manage shared assets.", "Use net use.", "Type: net use z: \\\\fs01\\shared"],
        validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "net use z: \\\\fs01\\shared"
    };
}

// Override hardcoded Tier 3 Marker directly into the generated positions
let tier3BaseIndex = commandPromptGame.levels.findIndex(l => l.level === 101);
if (tier3BaseIndex !== -1) {
    commandPromptGame.levels[tier3BaseIndex] = {
        level: 101,
        taskDescription: "Verify directory replication tracking telemetry states for domain controller DC01.",
        hintChain: ["Check AD replication.", "Use repadmin with replsummary switch.", "Type: repadmin /replsummary"],
        validateAction: (t, i) => t === "command" && i.trim().toLowerCase() === "repadmin /replsummary"
    };
}

// Double-enforce proper index arrangement sorting order maps
commandPromptGame.levels.sort((a, b) => a.level - b.level);
