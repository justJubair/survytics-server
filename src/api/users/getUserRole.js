const Users = require("../../models/Users")
const getUserRole = async (req, res) => {
    let query = {}
    if(req?.query?.email){
      query = {email: req?.query.email}
    }
  
    const user = await Users.findOne(query);
    const role = user?.role;
    res.send(role);
  }

  module.exports = getUserRole