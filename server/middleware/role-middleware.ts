const ApiErrorModule = require('../exceptions/api-error')
const tokenService = require('../service/token-service')

module.exports = function (roles: Array<string>) {
    return function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }

        try {
            const authorizationHeader = req.headers.authorization
            if (!authorizationHeader) {
                return next(ApiErrorModule.UnauthorizedError())
            }

            const accessToken = authorizationHeader.split(' ')[1]
            if (!accessToken) {
                return next(ApiErrorModule.UnauthorizedError())
            }

            const { roles: userRoles } = tokenService.validateAccessToken(accessToken)
            
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return next(ApiErrorModule.RestrictedAccessError())
            }

            const userData = tokenService.validateAccessToken(accessToken)
            if (!userData) {
                return next(ApiErrorModule.UnauthorizedError())
            }
            req.user = userData
            next()
        } catch (err) {
            return next(ApiErrorModule.UnauthorizedError())
        }
    }
}
