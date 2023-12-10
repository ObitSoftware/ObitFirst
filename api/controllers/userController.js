import User from '../models/userModel.js';
import bcrypt from "bcrypt"

// Crear un nuevo usuario

export const createUser = async (req, res) => { 
    
   const {userName, userPassword, userEmail, userRol} = req.body
   console.log(req.body)

   await User.findOne({userEmail})
             .then((user) => { 
               if(user) { 
                   res.json({message: "The email exist in our DataBase. Please, select other"})
               } else if (!userName || !userPassword || !userEmail) { 
                   res.json({message: "Data is missing to be able to register. Please complete all fields"})
               } else { 
                   console.log(req.body)
                   bcrypt.hash(userPassword, 10, (err, passwordHash) => { 
                       if(err) res.json({err})
                       else { 
                           const newUser = new User ( { 
                               username: userPassword,
                               password: passwordHash,                            
                               email: userEmail,
                               role: userRol
                           })
                            newUser.save()
                                   .then((user) => { 
                                       res.json({message: "Your Account has been created Succesfully. Now, we redirect you tu Login.", user})     
                                   })
                                   .catch((err) => console.log(err))               
                       }
                   })
               }
             })
}


export const login = async (req, res) => { 
  const {email, password} = req.body
  console.log(req.body)

  try {
     let checkUser = await User.findOne({email: email})
     if(!checkUser) { 
        res.json({message: "The Email is not Registered. Please, go to create your Account and try Again!"})
     } else { 
        const hashedPassword = checkUser.password;
        bcrypt.compare(password, hashedPassword)
              .then((samePassword) => { 
                   if(samePassword) { 
                    const {_id, username, password, role, email} = checkUser
                    res.json({
                        id: _id,
                        name: username,
                        password: password,
                        role: role,
                        email: email                   
                    })
                   } else { 
                    res.json({message: "You typed an incorrect password. You have 2 more tries to Login"})
                   }
              })
     }
  } catch (error) {
     res.send("The data entered is Incorrect. I cant find it")
       console.log(error)
  }
}

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario por su ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

// Actualizar un usuario existente
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const {username, password, role} = req.body
  try {
    const updatedUser = await User.findByIdAndUpdate({_id: userId }, 
      {username, password, role}, 
      {
      new: true,
      });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
