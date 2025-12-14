import User from "../db/model/User.js";

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log("Error getting users", error.message);
		res.status(500).json({ message: "Internal server error", error: error.message });
    }
}


export const updateProfile = async (req, res) => {
    try {
        const { name, email, password, profilePic, role } = req.body
        
        const user = await User.findOne({ email }).exec()
        
        if (!user) return res.status(404).json({ message: 'User not found!' })
            
        user.name = name
        user.role = role,
        user.password = password,
        user.profilePic = profilePic
        
        const updatedUser = await user.save()
        res.json(updatedUser)
    } catch (error) {
        console.log(`Error refreshing authentication ${error.message}`)
        res.status(500).json({ message: 'Internal Server Error!', error: error.message })
    }
}