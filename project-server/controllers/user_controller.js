const UserDB = require("../dal/user_dal");
const FamilyDB = require("../dal/family_dal")

// class UserController{// }
//create user
exports.createNewUser = async (req, res) => {
  // const userToInsert = req.body;
  const id = req.body.identity;
  const fName = req.body.firstName;
  const perId = req.body.permission;
  const user = await UserDB.getUserById(req.params.id);
  const _familyId = user.dataValues['familyId'];
  const userToInsert = { identity: id, firstName: fName, familyId: _familyId, familyHead: 0, permissionId: perId };
  if (!userToInsert)
    return res.status(400).json({ message: 'not entried data' });
  const newUser = await UserDB.createNewUser(userToInsert);
  if (newUser)
    res.status(201).json({ message: 'created user' });
  // res.send(userToInsert)
  // res.send(newUser)
  else
    res.status(400).json({ message: 'error' });
};

//create family head
exports.createUserHead = async (req, res, _familyId) => {
  // const id = req.body.identity;
  // const fName = req.body.firstName;
  const id = req.body.Id;
  const fName = req.body.Name;
  const userToInsert = { identity: id, firstName: fName, familyId: _familyId, familyHead: 1, permissionId: 2 };
  if (!userToInsert)
    return res.status(400).json({ message: 'not entried data' });
  try {
    const newUser = await UserDB.createNewUser(userToInsert);

    if (newUser) {
      // res.status(201).json({message:'created user'});
      console.log("newUser: " + newUser);
      res.send(newUser);
      // return newUser;
    }
    else
      res.status(400).json({ message: 'error' });
  }
  catch {
    await FamilyDB.deleteFamily(_familyId);
    res.status(400).json({ message: 'identity exist' });
  }
};

//getById
// exports.getUserById = async (req, res) => {
//   const id = req.params.id;
//   if (!id)
//     return res.status(400).json({ message: 'not entried id' });
//   const thisUser = await UserDB.getUserById(id);
//   if (thisUser)
//     res.send(thisUser);
//   else
//     res.status(400).json({ message: 'error' });
// };
exports.getUserById = async (req, res) => {
    const id = req.params.id;
    if (!id)
      return res.status(400).json({ message: 'not entried id' });
    const thisUser = await UserDB.getUserWithFamilyName(id);
    if (thisUser)
    {
      const { family, ...rest } = thisUser.dataValues
      res.send({ ...rest, familyName: family.dataValues.familyName });
    }
    else
      res.status(400).json({ message: 'error' });
  };

//login
exports.login = async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).json({ message: 'not entried id' });
  const password = req.query.password;
  if (!password)
    return res.status(400).json({ message: 'not entried password' });
  const userWithFamily = await UserDB.login(id);
  if (userWithFamily) {
    const flag = userWithFamily.dataValues['family'].dataValues['password'] == password;
    console.log({ userWithFamily });

    const { family, ...rest } = userWithFamily.dataValues

    if (flag) {
      // res.send({ ...rest, familyName: family.dataValues.familyName })

      res.send({ ...rest});

      // const thisUser = await UserDB.getUserById(id);
      // // console.log('thisUser',thisUser);
      // // thisUser.dataValues['user']['familyName']=userWithFamily.dataValues['family'].dataValues['familyName'];
      // console.log('thisUser', thisUser);
      // // res.send(thisUser);
      // res.send(userWithFamily);
    }
    else
      res.status(400).json({ message: 'error password' });
  }
  else
    res.status(400).json({ message: 'error id' });
};

//get all users
exports.getUsers = async (req, res) => {
  const users = await UserDB.getUsers();
  if (users)
    res.send(users);
  else
    res.status(400).json({ message: 'error' });
};

//get family users
exports.getUsersByFamily = async (req, res, _familyId) => {
  const familyId = _familyId;
  const users = await UserDB.getUsersByFamily(familyId);
  if (users)
    res.send(users);
  else
    res.status(400).json({ message: 'error' });
};


exports.getPermitByIdUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId)
    return res.status(400).json({ message: 'not entried data' });
  const newPermit_user = await Permit_userDB.getPermitByIdUser(userId);
  if (newPermit_user)
    res.send(newPermit_user)
  else
    res.status(400).json({ message: 'error' });
};

//get permit_users_table by family
exports.getUsersPermission = async (req, res) => {
  const user = await UserDB.getUserById(req.params.id);
  const _familyId = user.dataValues['familyId'];
  // if(!_familyId)
  //     res.status(400).json({message:'not recieve familyId'});
  const permit_users = await UserDB.getUsersPermission(_familyId);
  console.log(permit_users);
  var permit_users_table = [];
  console.log(permit_users);
  permit_users.forEach(e => {
    var id = e.dataValues['identity'];
    var fName = e.dataValues['firstName'];
    var pName = e.dataValues['permission'].dataValues['permissionName'];
    // console.log("eeeeee"+e.dataValues['user'].dataValues['permit_levels'])
    permit_users_table.push({ identity: id, firstName: fName, permission: pName });
    // permit_users_table.push({firstName:fName,identity:id,permitId:e.dataValues['permitId']});
  });
  if (permit_users_table)
    res.send(permit_users_table);
  else
    res.status(400).json({ message: 'error' });
};

//update
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).json({ message: 'not entried id' });
  const body = req.body;
  console.log({body});
  if (!body)
    return res.status(400).json({ message: 'not entried body' });
  const flagUser = await UserDB.updateUserById(body, id);
  console.log({flagUser});
  if (flagUser == 1)
    // res.send(flagUser);
    res.status(201).json({ message: 'successfully update user' });
  else
    res.status(400).json({ message: 'error' });
};

//delete
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  if (!id)
    return res.status(400).json({ message: 'not entried id' });
  const flagDeleteUser = await UserDB.deleteUser(id);
  if (flagDeleteUser)
    res.status(200).json({ message: "Deleted successfully" });
  else
    res.status(400).json({ message: 'error' });
};