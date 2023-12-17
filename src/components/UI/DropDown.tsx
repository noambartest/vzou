import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";


const iconsColor = "text-lime-500";

interface DropDownProps {
  title: string;
  items: string[];
  onClick: (name: string) => void;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function DropDown(props: DropDownProps) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              open ? iconsColor : "text-gray-500",
              `group inline-flex items-center rounded-md text-base font-medium hover:${iconsColor} focus:outline-none focus:ring-3 focus:${iconsColor} focus:ring-offset-2`,
            )}
          >
            <span>{props.title}</span>
            <ChevronDownIcon
              className={classNames(
                open ? iconsColor : "text-gray-400",
                `ml-2 h-5 w-5 group-hover:${iconsColor}`,
              )}
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 -ml-4 mt-3 w-screen max-w-md transform px-2 sm:px-0 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div
                  className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8"
                  id="dropdown-options"
                >
                  {props.items.map((item) => (
                    <Popover.Button
                      onClick={() => {
                        props.onClick(item);
                      }}
                      key={item}
                      className="-m-3 flex items-start rounded-lg p-3 hover:bg-gray-50"
                    >
                      <div className="ml-4">
                        <p className="text-base font-medium text-gray-900">{item}</p>
                      </div>
                    </Popover.Button>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default DropDown;
