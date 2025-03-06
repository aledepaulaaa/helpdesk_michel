import { useAuthContext } from "@/src/context/AuthContext"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import useRememberAndForgotPass from "@/src/hooks/forgotpassword/useRememberAndForgotPass"
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material"

export default function FormPassword() {
    const { user, setUser } = useAuthContext()
    const { showPass, handleClickShowPassword } = useRememberAndForgotPass()

    return (
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="outlined-password-label">Senha</InputLabel>
            <OutlinedInput
                id="outlined-password-label"
                fullWidth
                placeholder="Senha"
                label="Senha"
                type={showPass ? "text" : "password"}
                value={user.password || ""}
                onChange={(event) => setUser({ ...user, password: event.target.value })}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPass ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}