import { Popover } from "@headlessui/react";

import NavBarElements from "./NavBar/NavBarElements";
import NavBarElementsLeft from "./NavBar/NavBarElementsLeft";
import NavBarElemetsMobile from "./NavBar/NavBarElementsMobile";
import NavBarElementsRight from "./NavBar/NavBarElementsRight";
import NavBarMobileMenuIcon from "./NavBar/NavBarMobileMenuIcon";


function HeaderContent() {
  return (
    <Popover className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <NavBarElementsLeft />
          {/* when the screen is smaller it will create menu button , 3 stripes */}
          <NavBarMobileMenuIcon />
          <NavBarElements />
          <NavBarElementsRight />
        </div>
      </div>

      <NavBarElemetsMobile />
    </Popover>
  );
}

export default HeaderContent;
