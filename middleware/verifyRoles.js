const ROLES_LIST = require('../config/roles_list')


const verifiedRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!req.roles) return res.status(401)
        const rolesArray = allowedRoles
        // console.log(rolesArray)
        // console.log(req.roles)

        const result = rolesArray.includes(req.roles.Student || req.roles.Teacher);
        // console.log(result)
        if (!result) return res.status(401)
        next()
    }
}

module.exports = verifiedRoles