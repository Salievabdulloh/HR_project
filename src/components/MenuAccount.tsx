'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Logout from './Logout';
import { User, User2, UserCircle2, UserIcon } from 'lucide-react';
import Link from 'next/link';
// import { useGetStore } from '@/store/store';
import Image from 'next/image';
import { useGetStore } from '../store/store';
import useDarkSide from '../shared/config/useDarkSide';
import { useTheme } from 'next-themes';

export default function MenuAccount() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    }

    const { getRegister, user } = useGetStore()

    const getToken = localStorage.getItem('access_token')

    const { theme, setTheme } = useTheme()

    const handleClose = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false)
    }

    function handleListKeyDown(event: any) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false && anchorRef.current) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open])

    React.useEffect(() => { getRegister() }, [])

    // if (!getUser) {
    //     window.location.reload()
    //     alert("The image doesnt show")
    //     return
    // }

    return (
        <Stack direction="row" spacing={2}>
            <div className='z-10'>
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <UserCircle2 size={30} color={`${theme == "dark" ? "white" : "black"}`} />
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        {/* <MenuItem onClick={handleClose}>
                                            <p className='font-semibold'>
                                                {user?.username}
                                            </p>
                                        </MenuItem> */}
                                        <Link href="/profile">
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        </Link>
                                        <MenuItem onClick={handleClose}>
                                            <Logout />
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
}