import * as fs from 'fs';

export function checkAuthUser(req, res, next)
{
    try {
        fs.appendFile('log/logs.log', `Começo da validação do token dentro do try: \n`, function (err) {
            if(err) throw err;
        });

        const userToken = req.headers['user-token'];
    
        if(!userToken)
        {
            
            return res.status(401).json({
                success: false,
                message: 'Usuário não autenticado'
    
            })
        }

        req.user = userToken;
        
    } catch (error) {
        fs.appendFile('log/logs_error.log', `Erro na validação: ${error} \n`, function (err) {
            if(err) throw err;
        });
        
    } finally {
        fs.appendFile('log/logs.log', `Fim da validação do token\n`, function (err) {
            if(err) throw err;
        });
        next();
    }
    
}