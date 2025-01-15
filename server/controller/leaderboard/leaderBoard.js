import userModel from "../../models/userModel.js"

export const getLeaderBoard=async(req,res)=>{
    try {
        console.log("fdgbhfd   ")
        const users = await userModel.find({}, { name: 1, correctAnswer: 1, _id: 0 }).sort({ correctAnswer: -1 });

        console.log(users)

        res.status(200).json({users})
    } catch (error) {
        console.log(error)
        res.status(404)
    }

}