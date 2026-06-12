
import { Briefcase, Envelope, Gear, House, OfficeBadge, Person, SquarePlus } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { LayoutSideContent } from '@gravity-ui/icons';
import Link from "next/link";
export function DashboardSidebar() {
    const navItems = [
        { icon: House,href:"/dashboard/recruiter", label: "Home" },
        { icon: Briefcase, href:"/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: SquarePlus, href:"/dashboard/recruiter/jobs/new", label: "Post A Job" },
        { icon: OfficeBadge, href:"/dashboard/recruiter/company", label: "Company Profile" },
        { icon: Envelope, href: "/dashboard/recruiter/messages", label: "Messages" },
        { icon: Person, href: "/dashboard/recruiter/profile", label: "Profile" },
        { icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings" },
    ];
    const SideBar = <nav className=" flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block"> 
                {SideBar}
            </aside>

            <Drawer>
                <Button variant="secondary" className="lg:hidden">
                    <LayoutSideContent />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {SideBar}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>

        </>
    );
}