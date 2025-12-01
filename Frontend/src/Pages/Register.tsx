import { useEffect, useState } from "react"
import { registerUser } from "../api/loginapi"

export function Register () {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        confirm: ""
    });
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setisSubmitting] = useState(false);

    const validateUsername = (value: string) => {
        if (!value) return "Username is required";
        if (value !== value.toLowerCase()) return "Username should be all lowercase"
        return "";
        }
    const validatePassword = (value: string) => {
        if (!value) return "Password is required"
        if (value.length < 6) return "Password Must Contain atleast 6 Characters"
        if (!/\d/.test(value)) return "Password Must contain atleast One number"
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "Password Must atleast contain a special Character"
        return ""
    }
    const validateConfirm = (pwd, conf) => {
        if (!conf) return "Please retype password";
        if (pwd !== conf) return "Password do not match"
        return "";
    };

    const onUsernameChange = (e) => {
        const v = e.target.value;
        setUsername(v)
        setErrors((prev) => ({...prev, username:validateUsername(v)}));
        setServerError("");
    }
    const onPasswordChange = (e) => {
        const v = e.target.value;
        setPassword(v)
        setErrors((prev) => ({...prev, password: validatePassword(v), confirm: validateConfirm(v, confirm)}))
        setServerError("");
    }
    const onConfirmChange = (e) => {
        const v = e.target.value
        setConfirm(v);
        setErrors((prev) => ({...prev, confirm: validateConfirm(password, v)}))
        setServerError("");
    }

    const isFormValid = 
    !errors.username &&
    !errors.password &&
    !errors.confirm &&
    username &&
    password &&
    confirm;

    const handleRegister = async () => {
        const uerror = validateUsername(username)
        const perror = validatePassword(password)
        const cerror = validateConfirm(password, confirm)
        setErrors({username: uerror, password: perror, confirm: cerror})
        setServerError("");
        if (uerror || perror || cerror) return;

        setisSubmitting(true);
        try{
            await registerUser({username, password});
            alert("New User Added")
            setUsername("");
            setPassword("");
            setConfirm("");
            setErrors({username: "", password: "", confirm: ""});

        } catch (err) {
            console.log(err)
        } finally {setisSubmitting(false);}
    }
    return(
        <>
        <h2>Register Page</h2>
        <label>
        <h4>Username</h4>
        <input 
        type="text" 
        placeholder="Username"
        value={username} 
        onChange={onUsernameChange}/>
        </label>
        {errors.username && <div style={{ color: "red" }}>{errors.username}</div>}

        <label>
        <h4>Password</h4>
        <input 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={onPasswordChange}/>
        </label>
        {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}

        <label>
        <h4>Retype Password</h4>
        <input type="password" 
        placeholder="Retype Password"
        value={confirm} 
        onChange={onConfirmChange}/>
        </label>

        {errors.confirm && <div style={{ color: "red" }}>{errors.confirm}</div>}
        {serverError && <div style={{ color: "red", marginTop: 8 }}>{serverError}</div>}
        <br></br>
        <button
        onClick={handleRegister}
        disabled={!isFormValid || isSubmitting}
        style={{ marginTop: 12 }}>
            {isSubmitting ? "Registering..." : "Register"}</button>
       
        </>
    )
}