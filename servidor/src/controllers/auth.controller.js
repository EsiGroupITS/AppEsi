const { User, sequelize } = require("./../models/user.model")
const bcrypt = require('bcrypt')
const { jwt_generator } = require('./../helper/jwt')

//Funcion para que un usuario sea registrado
const register = async (req, res) => {

    await User.sync() //! Si la tabla no se creo, la crea

    const transaction = await sequelize.transaction() //! Manejo de transacciones para consultas

    //Traemos los datos del body
    const { email, pass, birthdate } = req.body;

    try {

        //? Encriptamos la contraseña
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(pass.toString(), salt) // toString() sino pasa error

        //! findOrCreate busca un registro, si no lo encuentra lo crea, caso contrario, devuelve
        //! un valor booleano
        const [user, created] = await User.findOrCreate({ 
            where: { email }, 
            defaults: { 
                email: email, 
                pass: passwordHash, 
                birthdate: birthdate 
            }, 
            transaction: transaction
        })
        
        if(!created){ //! Si ya está creado:
            res.status(400).json({ // Tira error
                ok: false,
                msg: 'El usuario ya existe'
            })

        await transaction.commit() // Si todo OK, commitea los cambios

        // TODO: Ver si necesitamos esta parte (¿el usuario se registra solo o crean la cuenta?)
        /* else {
            console.log('2')
            if (age < 8) {
                console.log('3')
                res.status(401).json({
                    ok: false,
                    msg: 'Porfavor pide a un adulto mayor que cree una cuenta por ti'
                })
            }
            else {
                console.log('4')
                const insertDate = await connection.query('INSERT INTO users SET ?', [user])
                console.log(result)
                if (!insertDate) {
                    console.log('5')
                    res.status(404).json({
                        ok: false,
                        msg: 'Error al crear el usuario'
                    })
                }
                else {
                    console.log('6')
                    res.status(202).json({
                        ok: true,
                        msg: 'Usuario creado con exito'
                    })
                }
            }*/
        }
    } 
    catch(e) {
        res.status(500).json({
            ok: false,
            e,
            msg: 'Error en el servidor'
        })
        await transaction.rollback()
        return
    }
}

const login = async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await User.findOne(
            { attributes: [ 'id_user', 'email', 'pass' ]},
            { where: { email } }
        )
        if(!user){
            res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }
        const hashPass = user.getDataValue('pass')
        console.log(hashPass);

        const validatePass = bcrypt.compareSync(pass.toString(), hashPass)
        console.log(validatePass);

        if(!validatePass) {
            res.status(404).json({
                ok: false,
                msg: 'Contraseña incorrecta!'
            })
        }

        console.log(user.getDataValue('id_user'));

        const token = await jwt_generator(user.getDataValue('id_user'))
        console.log(token);
        res.status(200).json({
            ok: true,
            token,
            msg: 'Usuario logeado'
        })
    }
    catch (e) {
        res.status(400).json({
            ok: false,
            msg: 'Error en el servidor'
        })
    }
}

//! TESTING!!
const getAll = async(req, res) => {
    try {
        const users = await User.findAll()
        const json = JSON.stringify(users)
        res.status(200).json({
            json,
            users
        })
    }
    catch(e){
        res.status(400).json({
            ok:false,
            e,
            msg: 'Acá está el error'
        })
    }
}


module.exports = {
    register,
    login,
    getAll
}