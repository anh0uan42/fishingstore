import User from '../db/model/User.js'
import jwt from 'jsonwebtoken'

const generateTokens = (userEmail) => {
    const accessToken = jwt.sign({ userEmail }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '10m'
    })

    const refreshToken = jwt.sign({ userEmail }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    })

    return { accessToken, refreshToken }
}

const setCookies = (res, refreshToken) => {

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    })
}

export const signUp = async (req, res) => {
    const { name, email, password } = req.body
    console.log('req')
    try {
        const duplicate = await User.findOne({ email })

        if (duplicate) return res.status(400).json({ message: 'User already exists!'})
        const user = await User.create({ name, email, password })
        
        const { accessToken, refreshToken } = generateTokens(user.email)

        setCookies(res, refreshToken)
        console.log('res\n', accessToken)
        res.status(201).json({
            // _id: user._id,
            // name: user.name,
            // email: user.email,
            // role: user.role,
            accessToken: accessToken
        })
    } catch (error) {
        console.log(`Error creating user ${error.message}`)
        res.status(500).json({ message: 'Internal Server Error!', error: error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log('Receive request')
        const user = await User.findOne({ email })

        if (!user) return res.status(404).json({ message: 'User not found!' })

        if (user && (await user.comparePassword(password))) {
            const { accessToken, refreshToken } = generateTokens(user.email)
            setCookies(res, refreshToken)

            res.status(200).json({
                // _id: user._id,
                // name: user.name,
                // email: user.email,
                // role: user.role,
                accessToken: accessToken
            })
            console.log('back end sent the response')
        } else {
            res.status(400).json({ message: 'Invalid email or password!' })
        }
    } catch (error) {
        console.log(`Error logging in ${error.message}`)
        res.status(500).json({ message: 'Internal Server Error!', error: error.message })
    }
}

export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) return res.sendStatus(204)
        res.clearCookie('accessToken')
        res.clearCookie('refreshToken')
        res.json({ message: 'Logged out!'})
    } catch (error) {
        console.log(`Error logging out ${error.message}`)
        res.status(500).json({ message: 'Internal Server Error!', error: error.message })
    }
}

export const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) return res.status(401).json({ message: 'Unauthorized' })

        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
            async (err, decoded) => {
                if (err) return res.status(403).json({ message: 'Forbidden'})

                const user = await User.findOne({ email: decoded.userEmail }).exec()

                if (!user) return res.status(401).json({ message: 'Unauthorized'})
                
                const { accessToken, newRefreshToken } = generateTokens(user.email)
                setCookies(res, newRefreshToken)
                res.json({
                    // _id: user._id,
                    // name: user.name,
                    // email: user.email,
                    // role: user.role,
                    accessToken: accessToken
                })
            }
        )
    } catch (error) {
        console.log(`Error refreshing authentication ${error.message}`)
        res.status(500).json({ message: 'Internal Server Error!', error: error.message })
    }
}

