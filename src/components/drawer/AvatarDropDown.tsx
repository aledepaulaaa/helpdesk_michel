import * as React from "react"
import { Box } from "@mui/material"
import Typography from "@mui/material/Typography"
import Popover from "@mui/material/Popover"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import { useAuthContext } from "@/src/context/AuthContext"

export default function AvatarDropDown() {
    const { handleLogout } = useAuthContext()

    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <Box mt={1}>
                    <img
                        src="/img/3.png"
                        alt="Avatar"
                        width={45}
                        height={45}
                        style={{ borderRadius: "50%" }}
                        {...bindTrigger(popupState)}
                    />
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Typography
                            textAlign="center"
                            onClick={handleLogout}
                            sx={{
                                p: 2,
                                width: 100,
                                cursor: "pointer"
                            }}
                        >
                            Sair
                        </Typography>
                    </Popover>
                </Box>
            )}
        </PopupState>
    )
}
