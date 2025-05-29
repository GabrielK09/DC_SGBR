import * as fs from 'fs';

export function checkAuthUser(req, res, next)
{
    console.log('Req:', req)
    console.log('Res:', res)
    
    const userToken = req.headers['user-token'];

    fs.appendFile('log/logs.log', `Começo da va`, function (err) {
        if(err) throw err;

    });

    if(!userToken)
    {
        
        return res.status(401).json({
            success: false,
            message: 'Usuário não autenticado'

        })
    }

    req.user = userToken;
    next();
    
}