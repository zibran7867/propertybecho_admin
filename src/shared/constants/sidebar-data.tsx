import { Routing } from "../../routes/routing";
import { Modules } from "../enums/modules";

export interface ISidebarData {
  id?: number;
  module: string;
  route: string;
  name: string;
  image?: string;
  childs?: ISidebarData[];
}

export const sidebarRoutes: ISidebarData[] = [
  {
    module: Modules.Dashboard,
    route: Routing.Dashboard,
    name: "Dashboard",
    image: "/images/Dashboard.svg",
  },
  {
    module: Modules.Dashboard,
    route: Routing.Area_Management,
    name: "Area Management",
    image: "/images/Dashboard.svg",
  },
  {
    module: Modules.Dashboard,
    route: Routing.Builder_Management,
    name: "Builder Management",
    image: "/images/Dashboard.svg",
  },
];

