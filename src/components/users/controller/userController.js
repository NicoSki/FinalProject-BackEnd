
class User{
    async addUser(req,res){
        try {
            let user = req.body
            res.json({user});
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new User();