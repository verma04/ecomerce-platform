import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";

import Divider from "@mui/material/Divider";

import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Drawer } from "@mui/material";
import data from "./List";
import SvgWrapper from "@/svg/SvgWrapper";
import ProfileMenu from "./Profile";
import UserSvg from "@/svg/UserSvg";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useGetUser } from "@/grapqhl/actions/auth";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;

  children: string | JSX.Element | JSX.Element[] | any;
}

export default function SidebarDrawer({ window, children }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {
    data: { getUser },
  } = useGetUser();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const router = useRouter();

  const currentRoute = usePathname();

  console.log(currentRoute);
  const { palette } = useTheme();
  const drawer = (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        background: palette.primary.light,
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        width={"100%"}
        marginBottom={"1rem"}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"4em"}
          position={"relative"}
        >
          <Box width={"4rem"} height={"4rem"} position={"relative"}>
            <Image
              src={`https://pulseplaydigital.sgp1.digitaloceanspaces.com${getUser?.sellerProfile?.logo?.url}`}
              alt="Picture of the author"
              style={{
                objectFit: "cover",
              }}
              fill
            />
          </Box>
        </Box>
        <Divider sx={{ borderColor: "rgb(90, 94, 102)", width: "100%" }} />
      </Box>
      {data.map((set, index) => (
        <Box
          key={index}
          width={"90%"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          marginBottom={"2rem"}
        >
          <Typography sx={{ fontSize: "0.8rem", color: "rgb(142, 150, 163)" }}>
            {set.category}
          </Typography>
          <List sx={{ width: "100%" }}>
            {set.list.map((t, index) => (
              <Link style={{ textDecoration: "none" }} href={t.url}>
                <ListItem
                  sx={{
                    background: currentRoute.includes(t.url)
                      ? " rgb(90, 94, 102)"
                      : "transparent",
                  }}
                  key={index}
                  disablePadding
                >
                  {currentRoute.includes(t.url) && (
                    <Box
                      sx={{
                        backgroundColor: "rgb(142, 150, 163)",
                        width: "0.25rem",
                        height: "2rem",
                        borderTopRightRadius: "0.25rem",
                        borderBottomRightRadius: "0.25rem",
                      }}
                    ></Box>
                  )}

                  <ListItemButton
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon sx={{ color: "white" }}>
                      <SvgWrapper>{t?.svg}</SvgWrapper>
                    </ListItemIcon>
                    <Typography>
                      <span style={{ fontSize: "0.9rem", color: "white" }}>
                        {t.name}
                      </span>
                    </Typography>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: 10,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: palette.secondary.light,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            {/* <MenuIcon />" */}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            sddsds
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },

          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Drawer
          variant="permanent"
          sx={{
            background: "red",
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}
