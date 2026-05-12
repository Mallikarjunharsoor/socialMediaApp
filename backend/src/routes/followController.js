const followModel = require('../models/model.follow');
const model = require('../models/model.database');
const { identifyUser } = require('../middelwares/identify.middleware');

async function followController(req, res) {
    const followeename = req.params.username;
    const followername = req.user.username;
    const action = req.body.status;

    const alreadyFollowed = await followModel.findOne({
        follower: followername,
        followee: followeename
    })
    if(alreadyFollowed){
        return res.status(400).json({
            message: `You already follow ${followeename}`
        })
    }
    if(followeename === followername){
        return res.status(400).json({
            message: "you cannot follow yourself"
        })
    }

    const follow = followModel.create({
        follower: followername,
        followee: followeename,
        status: action
    })
    return res.status(200).json({message: `you are now following ${followeename}`, follow: follow});

}

async function followRequestController(req, res){
        const followerName = req.params.username;
        const followeeName = req.user.username;
        const action = req.body.status;

        const alreadyFollowed = await followModel.findOne({
            follower: followerName,
            followee: followeeName
        })
        if(alreadyFollowed.status !== 'pending'){
            return res.status(400).json({
                message: `you have already ${alreadyFollowed.status} the follow request from ${followerName}`
            })
        }
        alreadyFollowed.status = action;
        await alreadyFollowed.save();
        return res.status(200).json({message: `you have ${action} the follow request from ${followerName}`});
        
}

async function unfollowController(req, res) {
    const followeename = req.params.username;
    const followername = req.user.username;

    const alreadyFollowed = await followModel.findOne({
        follower: followername,
        followee: followeename
    })
    if(!alreadyFollowed){
        return res.status(400).json({message: `you do not follow ${followeename}`});
    }
    const findUser = await model.findOne({
        username: followeename
    })
    if(!findUser){
       return res.status(404).json({message: 'user not found'})
    }

    const unfollow = await followModel.findOneAndDelete({
        follower: followername,
        followee: followeename
    })
    res.status(200).json({message: `you have unfollowed ${followeename}`});
}

module.exports = { followController, unfollowController, followRequestController };