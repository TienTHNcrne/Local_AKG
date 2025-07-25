import { CreateUserService, FindUserService } from "../services/userService.js";
const Register = async (req, res) => {
    console.log("check req.body", req.body);
    const { name, email, password } = req.body;
    const data = await CreateUserService(name, email, password);
    console.log(data);
    return res.status(200).json(data);
};
const Login = async (req, res) => {
    const { email, password } = req.body;
    const result = await FindUserService(email, password);
    return res.status(result.status).json({ result });
};
export { Register, Login };
