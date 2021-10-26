import memberPic from "../../static/images/Placeholder.jpg";
import teamPic from "../../static/images/teamimage.jpg";
import IliyanDimitrov from "../../static/images/Iliyan_Dimitrov_Bio_Picture.jpg";
import calebPic from "../../static/images/CalebPic.jpg";
import derekPic from "../../static/images/derekTeamPic.jpg";
import andrewPic from "../../static/images/AndrewPhoto.jpg";
import jakePic from "../../static/images/JakePhoto.jpg";

export const teamData =
    {
        teamName: "Boat Smarts",
        missionStatement: "Boat Smarts' mission is to create a complete product and learn to work as a team. We will use the development tools provided to us to ensure quality and stability. We will adhere to the SCRUM procedure to promote effective collaboration and communication.",
        imagePath: teamPic,
    };

export const memberData = [
    {
        name: "Caleb Cluett",
        bio: "Caleb is going for a degree in Computer Science with a concentration in Networking and Security. Caleb has other interests which includes Rock Climbing, Woodworking, and Reptiles",
        homeTown: "Fort Collins, Colorado",
        imagePath: calebPic
    },
    {
        name: "Iliyan Dimitrov",
        bio: "Iliyan is a third-year Computer Science student with a focus in AI and Machine Learning at CSU. His interests consist of web, game, and AI development. After graduating, Iliyan would like to be a software developer within one of the big four FANG companies.",
        homeTown: "Parker, Colorado",
        imagePath: IliyanDimitrov
    },
    {
        name: "Jake Ritz",
        bio: "Jake is a third year student studying CS and Math at CSU. His interests consist of video game and software development. In his free time, he works on his personal video game that will soon be releasing to Steam. He also enjoys skiing and working on his Jeep.",
        homeTown: "Littleton, CO",
        imagePath: jakePic
    },
    {
        name: "Andrew Holmes",
        bio: "Andrew is a 4th year Computer Science and Mathematics Education student at CSU. He has interests in algorithm analysis, artificial intelligence, and pedagogy. After finishing his bachelor's degree, Andrew plans on pursuing a master's degree and teaching Computer Science at a university level.",
        homeTown: "Highlands Ranch, Colorado",
        imagePath: andrewPic
    },
    {
        name: "Derek McCracken",
        bio: "Derek is in his final year of the second bachelor’s program in Computer Science at CSU. His interests include front-end design and Human Computer Interaction. After graduating, Derek would like to work as a front-end engineer for a big tech company.",
        homeTown: "Austin, Texas",
        imagePath: derekPic
    },
];
