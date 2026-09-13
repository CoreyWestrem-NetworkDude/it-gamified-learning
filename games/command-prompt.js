const commandPromptGame = {
    id: "command-prompt",
    title: "Command Prompt (cmd.exe)",
    levels: [
        {
            level: 1,
            taskDescription: "Active Ticket: Triage current IP configuration to find the local loopback setup adapter interface properties.",
            hintChain: [
                "You need to list the networking configurations of the local server adapter panels.",
                "The classic command line tool used to view Windows IP configurations is 'ipconfig'.",
                "Action needed: Type 'ipconfig' and press enter in the active prompt console bar environment."
            ],
            validateAction: (actionType, commandInput) => actionType === "command" && commandInput.trim().toLowerCase() === "ipconfig"
        }
    ]
};
