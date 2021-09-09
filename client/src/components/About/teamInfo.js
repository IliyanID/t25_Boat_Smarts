import memberPic from "../../static/images/Placeholder.jpg";
import teamPic from "../../static/images/teamimage.jpg";
import IliyanDimitrov from "../../static/images/Iliyan_Dimitrov_Bio_Picture.jpg"
import calebPic from "../../static/images/CalebPic.jpg";

import andrewPic from "../../static/images/AndrewPhoto.jpg";
import andrewPic from "../../static/images/matthewPic.jpg";

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
        name: "Matthew Flight",
        bio: "Matthew is getting his undergraduate degree in Computer Science with a concentration in Networks and Security. He is interested in artificial intelligence and algorithms for security like blockchain. He also likes rock climbing and sleeping.",
        homeTown: "Wheaton, Illinois",
        imagePath: matthewPic
    },
    {
        name: "Andrew Holmes",
        bio: "Andrew is a 4th year Computer Science and Mathematics Education student at CSU. He has interests in algorithm analysis, artificial intelligence, and pedagogy. After finishing his bachelor's degree, Andrew plans on pursuing a master's degree and teaching Computer Science at a university level.",
        homeTown: "Highlands Ranch, Colorado",
        imagePath: andrewPic
    },
    {
        name: "Team Member 5",
        bio: "Bio Here",
        homeTown: "Hometown",
        imagePath: memberPic
    },
];
