import User from "../models/userModel.js"

const getMyFollowers = async (req , res) => {

    const user = await User.findById(req.user.id).populate('followers')

    if(!user){
        res.status(404)
        throw new Error("User Not found")
    }

    res.status(200).json(user.followers)
}


const getMyFollowings = async (req , res) => {
    const user = await User.findById(req.user.id).populate('followings')

    if(!user){
        res.status(404)
        throw new Error("User Not found")
    }

    res.status(200).json(user.followings)
}


const profileController = {getMyFollowers , getMyFollowings}


export default profileController