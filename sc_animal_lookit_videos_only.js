function generateProtocol(child, pastSessions) {
    const options = ["selffirst", "otherfirst"];
    const condition = options[Math.floor(Math.random() * options.length)];
    console.log("Condition:", condition);

    child.study = child.study || {};
    child.study.conditions = child.study.conditions || {};
    child.study.conditions.assignment = condition;

    const frames = {
        "welcome": {
            "kind": "exp-lookit-text",
            "blocks": [{
                    "title": "Welcome!"
                },
                {
                    "text": "Thank you for your interest in our study, \"What kind of animal are you?\"."
                },
                {
                    "text": "Here's a quick summary of what's about to happen:"
                },
                {
                    "text": "1. Webcam Setup and Video Consent: First, we'll be checking that your webcam is working. Then you and your child will give your consent to participate in this research."
                },
                {
                    "text": "2. Study Overview and Important Message for Parents: Here, you can read a little more about what your child will be doing in this study, along with some other important details about the game."
                },
                {
                    "text": "3. Start the Study: When you click the \"Start the game!\" button, the study will begin! This study will take about 15 minutes in total."
                },
                {
                    "text": "Thank you so much for helping us with our science! We hope you and your child have fun."
                }
            ],
            "showPreviousButton": false
        },
        "video-config": {
            "kind": "exp-video-config"
        },
        "video-consent": {
            "kind": "exp-lookit-video-consent",
            "template": "consent_005",
            "PIName": "Hyowon Gweon",
            "institution": "Stanford University",
            "PIContact": "Hyowon Gweon at hyo@stanford.edu",
            "purpose": "Can children be surprised by what appear to be the outcomes of their own actions? This study will help us find out whether children can reason about themselves as causal agents in a way complex enough to include surprise.",
            "procedures": "Your child will be shown pictures of different kinds of cards and asked to select certain ones. We are interested in your child's reaction to the results of their selections. We will ask you (the parent) to let your child make their own decisions. We also ask that you refrain from influencing your response by expressing an emotional reaction of your own.",
            "risk_statement": "There are no expected risks if you participate in the study.",
            "voluntary_participation": "Participation in this study is entirely optional, and you are free to exit at any time.",
            "payment": "After you finish the study, we will email you a $5 ______ gift card within approximately three days. To be eligible for the gift card your child must be in the age range for this study, you need to submit a valid consent statement, and we need to see that there is a child with you. But we will send a gift card even if you do not finish the whole study or we are not able to use your child's data! There are no other direct benefits to you or your child from participating, but we hope you will enjoy the experience.",
            "datause": "We are primarily interested in your child's emotional and verbal responses to the results of the card game. A research assistant will watch your video to assess the amount of surprise your child displays.",
            "include_databrary": true,
            "gdpr": false,
            "research_rights_statement": "You are not waiving any legal claims, rights or remedies because of your participation in this research study.  If you feel you have been treated unfairly, or you have questions regarding your rights as a research subject, you may contact the [IRB NAME], [INSTITUTION], [ADDRESS/CONTACT]"
        },
        "positioning": {
            "kind": "exp-video-config-quality",
            "title": "Positioning",
            "introText": "It's time to get your child & check yourself out!",
            "showRecordMenu": false,
            "requireTestVideo": false,
            "completedItemText": "Got it!",
            "instructionBlocks": [{
                    "text": "You and your child can sit in any position.",
                    "title": "Get comfortable"
                },
                {
                    "text": "Go ahead and get settled and use the webcam preview to make sure your child’s whole face and torso are in view.",
                    "title": "Take a few moments"
                },
                {
                    "text": "Press the \"Next\" button down below if you and your child are in position and ready to go.",
                    "title": "When you're ready"
                }
            ],
            "nextButtonText": "My child and I are in position and ready to start!",
            "showPreviousButton": true,
            "requireItemConfirmation": true,
            "recordingInstructionText": ""
        },
        "start-recording": {
            "kind": "exp-lookit-start-recording",
            "imageAnimation": "spin",
            "displayFullscreen": true
        },
        "stop-recording": {
            "kind": "exp-lookit-stop-recording",
            "imageAnimation": "spin",
            "displayFullscreen": true
        }
    };

    const trials_self = {
        "kind": "group",
        "commonFrameProperties": {
            "baseDir": "https://raw.githubusercontent.com/pzhu222/sc_animal_lookit_public/main/",
            "videoTypes": ["webm", "mp4"],
            "doRecording": false,
            "autoProceed": false,
            "canMakeChoiceBeforeAudioFinished": false,
            "showReplayButton": false,
            "showPreviousButton": false,
        },
        "frameList": [{
                "id": "welcome",
                "kind": "exp-lookit-video",
                "videoTypes": ["webm", "mp4"],
                "video": {
                    "source": "welcome_SCAnimal",
                    "width": 100
                },
                "parentTextBlock": {
                    "text": "Please help your child attend back to the video if they miss anything, and avoid influencing your child's response. As the videos are large, they may take a moment to load."
                }
            },
            {
                "kind": "exp-lookit-images-audio",
                "id": "parentinstructions",
                "images": [{
                    "id": "parentinstruction",
                    "src": "parentinstruction_SCAnimal.png",
                    "position": "fill"
                }],
                "audio": "parentinstruction_SCAnimal",
                "parentTextBlock": {
                    "text": "Text will appear below here, inside of a green box, with a prompt for you to say to your child.",
                    "css": {"backgroundColor": "green",
                        "color": "white"
                    }
                }
            },
            {
                "id": "mousecheck1",
                "kind": "exp-lookit-video",
                "videoTypes": ["webm", "mp4"],
                "video": {
                    "source": "mousecheck_part2_SCAnimal",
                    "width": 100
                },
                "parentTextBlock": {
                    "text": "Please help your child attend back to the video if they miss anything, and avoid influencing your child's response. As the videos are large, they may take a moment to load."
                }
            },
                        {
                "id": "mousecheck2",
                "kind": "exp-lookit-video",
                "autoProceed": true,
                "videoTypes": ["webm", "mp4"],
                "video": {
                    "source": "mousecheck_part1_SCAnimal_short",
                    "width": 100
                },
                "parentTextBlock": {
                    "text": "Please help your child attend back to the video if they miss anything, and avoid influencing your child's response. As the videos are large, they may take a moment to load."
                }
            },
            {
                "id": "mousecheck-question",
                "kind": "exp-lookit-images-audio",
                "audio": "useyourmouse",
                "audioTypes": ["mp3", "ogg"],
                "choiceRequired": true,
                "images": [
                    {
                        "id": "mousecheckquestion",
                        "src": "mousecheck_finalquestion.png",
                        "position": "fill",
                                                "nonChoiceOption": true
                    },
                    {
                        "id": "animalgame",
                        "src": "transparent.png",
                        "height": 50,
                        "left": 15,
                        "top": 10
                    },
                    {
                        "id": "artgame",
                        "src": "transparent.png",
                        "height": 50,
                        "left": 61,
                        "top": 10
                    }
                ]
            },
                        {
                "id": "miccheck-question",
                "kind": "exp-lookit-video",
                "autoProceed": false,
                "videoTypes": ["webm", "mp4"],
                "video": {
                    "source": "miccheck_SCAnimal",
                    "width": 100
                },
                "parentTextBlock": {
                    "text": "Please help your child attend back to the video if they miss anything, and avoid influencing your child's response. As the videos are large, they may take a moment to load."
                }
            }
        ]
    };

    const trials_other = {
        "kind": "group",
        "commonFrameProperties": {
            "baseDir": "https://raw.githubusercontent.com/pzhu222/sc_animal_lookit_public/main/",
            "videoTypes": ["webm", "mp4"],
            "doRecording": false,
            "autoProceed": false,
            "canMakeChoiceBeforeAudioFinished": false,
            "showReplayButton": false,
            "showPreviousButton": false
        },
        "frameList": [{
                "id": "welcome",
                "kind": "exp-lookit-video",
                "videoTypes": ["webm", "mp4"],
                "video": {
                    "source": "welcome_SCAnimal",
                    "width": 100
                },
                "parentTextBlock": {
                    "text": "Please help your child attend back to the video if they miss anything, and avoid influencing your child's response. As the videos are large, they may take a moment to load."
                }
            },
            {
                "id": "parentinstructions",
                "kind": "exp-lookit-images-audio",
                "images": [{
                    "id": "parentinstruction",
                    "src": "parentinstruction_SCAnimal.png",
                    "position": "fill"
                }],
                "audio": "parentinstruction_SCAnimal",
                "parentTextBlock": {
                    "text": "Text will appear below here, inside of a green box, with a prompt for you to say to your child.",
                    "css": {"backgroundColor": "green",
                        "color": "white"
                    }
            },
            {
                "id": "mousecheck1",
                "kind": "exp-lookit-video",
                "autoProceed": false,
                "videoTypes": ["webm", "mp4"],
                "video": {
                    "source": "mousecheck_part2_SCAnimal",
                    "width": 100
                },
                "parentTextBlock": {
                    "text": "Please help your child attend back to the video if they miss anything, and avoid influencing your child's response. As the videos are large, they may take a moment to load."
                }
            },
            {
                "id": "mousecheck2",
                "kind": "exp-lookit-video",
                "autoProceed": true,
                "videoTypes": ["webm", "mp4"],
                "video": {
                    "source": "mousecheck_part1_SCAnimal_short",
                    "width": 100
                },
                "parentTextBlock": {
                    "text": "Please help your child attend back to the video if they miss anything, and avoid influencing your child's response. As the videos are large, they may take a moment to load."
                }
            },
            {
                "id": "mousecheck-question",
                "kind": "exp-lookit-images-audio",
                "audio": "useyourmouse",
                "audioTypes": ["mp3", "ogg"],
                "choiceRequired": true,
                "images": [
                    {
                        "id": "mousecheckquestion",
                        "src": "mousecheck_finalquestion.png",
                        "position": "fill",
                        "nonChoiceOption": true
                    },
                    {
                        "id": "animalgame",
                        "src": "transparent.png",
                        "height": 50,
                        "left": 15,
                        "top": 10
                    },
                    {
                        "id": "artgame",
                        "src": "transparent.png",
                        "height": 50,
                        "left": 61,
                        "top": 10
                    }
                ]
            },
            {
                "id": "miccheck-question",
                "kind": "exp-lookit-video",
                "autoProceed": false,
                "videoTypes": ["webm", "mp4"],
                "video": {
                    "source": "miccheck_SCAnimal",
                    "width": 100
                },
                "parentTextBlock": {
                    "text": "Please help your child attend back to the video if they miss anything, and avoid influencing your child's response. As the videos are large, they may take a moment to load."
                }
            }
        ]
    };

    frames.trials = condition === "selffirst" ? trials_self : trials_other;

    const sequence = [
        "trials",
        "welcome",
        "video-config",
        "video-consent",
        "positioning",
        "start-recording",
        "stop-recording"
    ];

    return {
        frames,
        sequence
    };
}