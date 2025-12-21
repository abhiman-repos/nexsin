"use client";

import * as React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link"; // ✅ ADD
import ProfilePage from "@/components/ProfilePage";

const defaultAvatar = "";

function DefaultUserIcon({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="rounded-full bg-gray-700 border-2 border-gray-600 shadow-md"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M2 20c0-3.333 5.333-6 10-6s10 2.667 10 6v2H2v-2z" />
    </svg>
  );
}

function UserAvatar({ src, size = 40 }: { src?: string; size?: number }) {
  if (!src || src === defaultAvatar) {
    return (
      <span
        className="flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: "#374151",
          border: "2px solid #4b5563",
        }}
      >
        <DefaultUserIcon size={size} />
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt="avatar"
      width={size}
      height={size}
      className="rounded-full object-cover border-2 border-gray-600"
    />
  );
}

export default function UploadAvatars() {
  const [open, setOpen] = React.useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      {/* AVATAR BUTTON */}
      <ButtonBase
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        sx={{ borderRadius: "50%", width: 48, height: 48 }}
      >
        <UserAvatar size={40} />
      </ButtonBase>

      {/* MENU */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <>
              {/* BACKDROP */}
              <motion.div
                className="fixed inset-0 bg-black/50 z-[9998]"
                onClick={closeMenu}
              />

              {/* MENU PANEL */}
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                className="fixed top-0 left-0 w-full
                bg-[#0D1117] text-white z-[9999]
                rounded-b-2xl border-b border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-4 border-b border-gray-800">
                  <h2 className="text-lg font-semibold">User Menu</h2>
                  <button onClick={closeMenu}>✕</button>
                </div>

                <ul className="py-4 text-center">
                  <li
                    className="py-3 hover:bg-gray-800 cursor-pointer"
                    onClick={() => {
                      closeMenu();
                      setIsProfileModalOpen(true);
                    }}
                  >
                    Profile
                  </li>

                  <li className="py-3 hover:bg-gray-800 cursor-pointer">
                    Update
                  </li>

                  {/* ✅ CONTACT PAGE (FINAL FIX) */}
                  <li className="py-3 hover:bg-gray-800 cursor-pointer">
                    <Link href="/contactus" onClick={closeMenu}>                 
                      Contact Us
                    </Link>

                  </li>

                  <li className="py-3 hover:bg-gray-800 cursor-pointer">
                    History
                  </li>

                  <li className="py-3 hover:bg-gray-800 cursor-pointer">
                    Order Status
                  </li>

                  <li
                    className="py-3 hover:bg-red-600 cursor-pointer text-red-400"
                    onClick={() => {
                      closeMenu();
                      alert("Logged out");
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* PROFILE MODAL */}
      {isProfileModalOpen &&
        createPortal(
          <ProfilePage
            onClose={() => setIsProfileModalOpen(false)}
            avatarSrc={defaultAvatar}
            setAvatarSrc={() => { }}
          />,
          document.body
        )}
    </>
  );
}
