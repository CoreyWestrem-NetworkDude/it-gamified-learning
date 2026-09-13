const activeDirectoryGame = {
    id: "active-directory",
    title: "Active Directory Domain Services",
    levels: [
        {
            level: 1,
            taskDescription: "Promote Server to a Domain Controller.",
            hintChain: [
                "Look closely at the Server Manager Navbar for the Tools menu layer.",
                "Click on the 'Tools' menu dropdown button in the top right header space.",
                "Action needed: Open the 'Tools' menu dropdown to locate administrative utility platforms."
            ],
            validateAction: (actionType, targetId) => actionType === "click" && targetId === "sm-tools-trigger"
        },
        {
            level: 2,
            taskDescription: "Launch the Management Console.",
            hintChain: [
                "The dropdown menu has expanded. Look for the core Directory management utility.",
                "Select 'Active Directory Users and Computers' from the open list.",
                "Action needed: Click 'Active Directory Users and Computers' inside the dropdown container."
            ],
            validateAction: (actionType, targetId) => actionType === "click" && targetId === "aduc-trigger"
        }
    ]
};
