import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import EditAgencyForm from "../Forms/EditAgencyForm";
import { X } from "lucide-react";

const EditAgencyModal = ({ closeModal, isOpen, agencyInfo }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  <div className="flex justify-between items-center pb-4">
                    <span className="font-semibold">
                      Review Info Before Edit
                    </span>
                    <div>
                      <button
                        type="button"
                        className="hover:bg-rose-50 p-2 rounded-md transition duration-500"
                        onClick={closeModal}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </Dialog.Title>
                <div>
                  <EditAgencyForm agencyInfo={agencyInfo} closeModal={closeModal} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditAgencyModal;
